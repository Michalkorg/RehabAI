export const REHAB_LABELS = ['Ostra', 'Odbudowa', 'Funkcjonalna', 'Powrót do sportu'] as const;

export type RehabStage = (typeof REHAB_LABELS)[number];
