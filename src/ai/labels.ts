export const rehabStages = ["Ostra", "Odbudowa", "Funkcjonalna", "Powrót do sportu"] as const;

export type RehabStage = typeof rehabStages[number];

export const REHAB_LABELS = rehabStages;