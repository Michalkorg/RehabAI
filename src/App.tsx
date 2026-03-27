import { useEffect, useMemo, useState } from 'react';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import { getActiveDoctor, loginDoctor, logoutDoctor, registerDoctor } from './services/storage';
import type { DoctorAccount } from './types/auth';

export default function App() {
  const [doctor, setDoctor] = useState<DoctorAccount | null>(null);

  useEffect(() => {
    const activeDoctor = getActiveDoctor();
    if (activeDoctor) {
      setDoctor(activeDoctor);
    }
  }, []);

  const page = useMemo(() => {
    if (!doctor) {
      return <Login onLogin={setDoctor} onRegister={registerDoctor} onSignIn={loginDoctor} />;
    }

    return (
      <Dashboard
        doctor={doctor}
        onLogout={() => {
          logoutDoctor();
          setDoctor(null);
        }}
      />
    );
  }, [doctor]);

  return page;
}
