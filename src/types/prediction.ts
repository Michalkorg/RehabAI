import type { PatientInput, PredictionResult } from './patient';

export interface SavedPrediction {
  id: string;
  doctorId: string;
  patientName: string;
  input: PatientInput;
  result: PredictionResult;
  createdAt: string;
}
