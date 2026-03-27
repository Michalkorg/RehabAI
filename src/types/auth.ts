export interface DoctorAccount {
  id: string;
  fullName: string;
  login: string;
  password: string;
  createdAt: string;
}

export interface AuthPayload {
  login: string;
  password: string;
}

export interface RegisterPayload extends AuthPayload {
  fullName: string;
}
