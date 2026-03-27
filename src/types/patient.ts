export interface PatientInput {
  patientName: string;
  rom: number;
  pain: number;
  strength: number;
  asymmetry: number;
  daysSinceInjury: number;
}

export interface PredictionResult {
  stage: string;
  confidence: number;
  probabilities: number[];
  estimatedDaysToReturn?: number;
}
