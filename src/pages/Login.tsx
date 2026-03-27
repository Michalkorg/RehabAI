import { useState, type ChangeEvent, type FormEvent } from 'react';
import type { DoctorAccount } from '../types/auth';

interface LoginProps {
  onLogin: (doctor: DoctorAccount) => void;
  onRegister: (payload: { fullName: string; login: string; password: string }) => { success: boolean; message: string; doctor?: DoctorAccount };
  onSignIn: (login: string, password: string) => { success: boolean; message: string; doctor?: DoctorAccount };
}

export default function Login({ onLogin, onRegister, onSignIn }: LoginProps) {
  const [mode, setMode] = useState<'login' | 'register'>('register');
  const [fullName, setFullName] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (mode === 'register') {
      const result = onRegister({ fullName: fullName.trim(), login: login.trim(), password });
      if (!result.success || !result.doctor) {
        setError(result.message);
        return;
      }

      onLogin(result.doctor);
      return;
    }

    const result = onSignIn(login.trim(), password);
    if (!result.success || !result.doctor) {
      setError(result.message);
      return;
    }

    onLogin(result.doctor);
  };

  return (
    <main className="screen-center">
      <section className="card login-card">
        <h1>RehabAI</h1>
        <p>Panel lekarza / fizjoterapeuty</p>

        <div className="auth-switch">
          <button className={mode === 'register' ? 'active-tab' : ''} onClick={() => setMode('register')} type="button">
            Rejestracja
          </button>
          <button className={mode === 'login' ? 'active-tab' : ''} onClick={() => setMode('login')} type="button">
            Logowanie
          </button>
        </div>

        <form onSubmit={handleSubmit} className="form-grid">
          {mode === 'register' ? (
            <label>
              Imię i nazwisko lekarza
              <input
                type="text"
                value={fullName}
                onChange={(event: ChangeEvent<HTMLInputElement>) => setFullName(event.target.value)}
                required={mode === 'register'}
              />
            </label>
          ) : null}

          <label>
            Login
            <input type="text" value={login} onChange={(event: ChangeEvent<HTMLInputElement>) => setLogin(event.target.value)} required />
          </label>

          <label>
            Hasło
            <input type="password" value={password} onChange={(event: ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)} required />
          </label>

          {error ? <p className="error-message">{error}</p> : null}

          <button type="submit">{mode === 'register' ? 'Utwórz konto' : 'Zaloguj się'}</button>
        </form>
      </section>
    </main>
  );
}
