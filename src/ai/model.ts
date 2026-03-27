import * as tf from '@tensorflow/tfjs';
import { REHAB_LABELS, type RehabStage } from './labels';
import type { PatientInput, PredictionResult } from '../types/patient';

let model: tf.LayersModel | null = null;

const scaler = {
  rom: 180,
  pain: 10,
  strength: 10,
  asymmetry: 100,
  daysSinceInjury: 365,
};

const normalizeInput = (input: PatientInput): number[] => {
  return [
    input.rom / scaler.rom,
    input.pain / scaler.pain,
    input.strength / scaler.strength,
    input.asymmetry / scaler.asymmetry,
    input.daysSinceInjury / scaler.daysSinceInjury,
  ];
};

const softmax = (logits: number[]): number[] => {
  const maxLogit = Math.max(...logits);
  const exps = logits.map((value) => Math.exp(value - maxLogit));
  const sum = exps.reduce((acc, current) => acc + current, 0);
  return exps.map((value) => value / sum);
};

const heuristicLogits = (input: PatientInput): number[] => {
  const painScore = 10 - input.pain;
  const functionScore = input.rom * 0.35 + input.strength * 6 + (100 - input.asymmetry) * 0.25;
  const timeScore = Math.min(input.daysSinceInjury, 180);

  return [
    input.pain * 1.1 + (100 - input.rom) * 0.03 - timeScore * 0.02,
    15 + painScore * 1.2 + functionScore * 0.02 + timeScore * 0.03,
    10 + painScore * 1.4 + functionScore * 0.03 + timeScore * 0.05,
    8 + painScore * 1.5 + functionScore * 0.035 + timeScore * 0.06,
  ];
};

const estimateDaysToReturn = (input: PatientInput): number => {
  const readinessGap =
    (180 - input.rom) * 0.45 +
    input.pain * 3.2 +
    (10 - input.strength) * 2.7 +
    input.asymmetry * 0.35;

  const clamped = Math.max(7, Math.min(120, Math.round(readinessGap)));
  return clamped;
};

const bootstrapModel = async (): Promise<tf.LayersModel> => {
  const sequential = tf.sequential({
    layers: [
      tf.layers.dense({ inputShape: [5], units: 12, activation: 'relu' }),
      tf.layers.dense({ units: 8, activation: 'relu' }),
      tf.layers.dense({ units: REHAB_LABELS.length, activation: 'softmax' }),
    ],
  });

  sequential.compile({
    optimizer: tf.train.adam(0.01),
    loss: 'categoricalCrossentropy',
    metrics: ['accuracy'],
  });

  const syntheticSamples: number[][] = [];
  const syntheticTargets: number[][] = [];

  for (let i = 0; i < 250; i += 1) {
    const sample: PatientInput = {
      patientName: 'sample',
      rom: 40 + Math.random() * 140,
      pain: Math.random() * 10,
      strength: 2 + Math.random() * 8,
      asymmetry: Math.random() * 60,
      daysSinceInjury: Math.random() * 220,
    };

    const probs = softmax(heuristicLogits(sample));
    syntheticSamples.push(normalizeInput(sample));
    syntheticTargets.push(probs);
  }

  const xs = tf.tensor2d(syntheticSamples);
  const ys = tf.tensor2d(syntheticTargets);

  await sequential.fit(xs, ys, {
    epochs: 30,
    batchSize: 16,
    verbose: 0,
  });

  xs.dispose();
  ys.dispose();

  return sequential;
};

export const loadModel = async (): Promise<tf.LayersModel> => {
  if (!model) {
    model = await bootstrapModel();
  }

  return model;
};

export const predictRehabStage = async (input: PatientInput): Promise<PredictionResult> => {
  const loadedModel = await loadModel();
  const inputTensor = tf.tensor2d([normalizeInput(input)]);
  const outputTensor = loadedModel.predict(inputTensor) as tf.Tensor;
  const probabilities = Array.from(await outputTensor.data()) as number[];

  inputTensor.dispose();
  outputTensor.dispose();

  const maxIndex = probabilities.reduce((bestIndex, currentValue, currentIndex, values) => {
    return currentValue > values[bestIndex] ? currentIndex : bestIndex;
  }, 0);

  const stage = REHAB_LABELS[maxIndex] as RehabStage;

  return {
    stage,
    confidence: probabilities[maxIndex] * 100,
    probabilities,
    estimatedDaysToReturn: stage === 'Powrót do sportu' ? estimateDaysToReturn(input) : undefined,
  };
};
