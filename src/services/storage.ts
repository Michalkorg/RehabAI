import type { DoctorAccount, RegisterPayload } from '../types/auth';
import type { SavedPrediction } from '../types/prediction';

const DOCTORS_KEY = 'rehabai_doctors';
const ACTIVE_DOCTOR_KEY = 'rehabai_active_doctor';
const PREDICTIONS_KEY = 'rehabai_predictions';

const readJSON = <T>(key: string, fallback: T): T => {
  const raw = localStorage.getItem(key);
  if (!raw) return fallback;

  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
};

const writeJSON = <T>(key: string, value: T) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const createId = (): string => {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

export const getDoctors = (): DoctorAccount[] => {
  return readJSON<DoctorAccount[]>(DOCTORS_KEY, []);
};

export const registerDoctor = (payload: RegisterPayload): { success: boolean; message: string; doctor?: DoctorAccount } => {
  const doctors = getDoctors();

  const loginTaken = doctors.some((doctor) => doctor.login.toLowerCase() === payload.login.toLowerCase());
  if (loginTaken) {
    return { success: false, message: 'Podany login jest już zajęty.' };
  }

  const doctor: DoctorAccount = {
    id: createId(),
    fullName: payload.fullName,
    login: payload.login,
    password: payload.password,
    createdAt: new Date().toISOString(),
  };

  writeJSON(DOCTORS_KEY, [...doctors, doctor]);
  writeJSON(ACTIVE_DOCTOR_KEY, doctor.id);

  return { success: true, message: 'Konto utworzone.', doctor };
};

export const loginDoctor = (login: string, password: string): { success: boolean; message: string; doctor?: DoctorAccount } => {
  const doctors = getDoctors();
  const doctor = doctors.find((item) => item.login === login && item.password === password);

  if (!doctor) {
    return { success: false, message: 'Nieprawidłowy login lub hasło.' };
  }

  writeJSON(ACTIVE_DOCTOR_KEY, doctor.id);
  return { success: true, message: 'Zalogowano.', doctor };
};

export const getActiveDoctor = (): DoctorAccount | null => {
  const activeId = localStorage.getItem(ACTIVE_DOCTOR_KEY);
  if (!activeId) return null;

  return getDoctors().find((doctor) => doctor.id === activeId) ?? null;
};

export const logoutDoctor = () => {
  localStorage.removeItem(ACTIVE_DOCTOR_KEY);
};

export const savePrediction = (entry: Omit<SavedPrediction, 'id' | 'createdAt'>): SavedPrediction => {
  const predictions = readJSON<SavedPrediction[]>(PREDICTIONS_KEY, []);

  const saved: SavedPrediction = {
    ...entry,
    id: createId(),
    createdAt: new Date().toISOString(),
  };

  writeJSON(PREDICTIONS_KEY, [...predictions, saved]);
  return saved;
};

export const getPredictionsByDoctor = (doctorId: string): SavedPrediction[] => {
  const predictions = readJSON<SavedPrediction[]>(PREDICTIONS_KEY, []);

  return predictions
    .filter((item) => item.doctorId === doctorId)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
};
