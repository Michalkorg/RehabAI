import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { REHAB_LABELS } from '../ai/labels';
import type { PredictionResult } from '../types/patient';
import ConfidenceBar from './ConfidenceBar';

interface PredictionResultProps {
  result: PredictionResult;
  patientName: string;
}

const colors = ['#ef4444', '#f97316', '#3b82f6', '#10b981'];

export default function PredictionResult({ result, patientName }: PredictionResultProps) {
  const chartData = REHAB_LABELS.map((label, index) => ({
    stage: label,
    probability: Number((result.probabilities[index] * 100).toFixed(2)),
  }));

  return (
    <section className="card result-card">
      <h2>Wynik AI</h2>
      <p>
        Pacjent: <strong>{patientName}</strong>
      </p>
      <p>
        Etap rehabilitacji: <strong>{result.stage}</strong>
      </p>
      {result.stage === 'Powrót do sportu' && result.estimatedDaysToReturn ? (
        <p className="return-days">
          Szacowany czas do pełnego powrotu: <strong>{result.estimatedDaysToReturn} dni</strong>
        </p>
      ) : null}
      <ConfidenceBar confidence={result.confidence} />

      <div className="chart-box">
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="stage" />
            <YAxis domain={[0, 100]} unit="%" />
            <Tooltip formatter={(value) => `${Number(value).toFixed(2)}%`} />
            <Bar dataKey="probability" radius={[8, 8, 0, 0]}>
              {chartData.map((entry) => (
                <Cell key={entry.stage} fill={colors[REHAB_LABELS.indexOf(entry.stage)]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
