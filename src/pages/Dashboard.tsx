import { useEffect, useState } from 'react';
import { predictRehabStage } from '../ai/model';
import PatientForm from '../components/PatientForm';
import PredictionResult from '../components/PredictionResult';
import { getPredictionsByDoctor, savePrediction } from '../services/storage';
import type { DoctorAccount } from '../types/auth';
import type { PatientInput, PredictionResult as PredictionResultType } from '../types/patient';
import type { SavedPrediction } from '../types/prediction';

interface DashboardProps {
  doctor: DoctorAccount;
  onLogout: () => void;
}

export default function Dashboard({ doctor, onLogout }: DashboardProps) {
  const [result, setResult] = useState<PredictionResultType | null>(null);
  const [patientName, setPatientName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<SavedPrediction[]>([]);

  useEffect(() => {
    setHistory(getPredictionsByDoctor(doctor.id));
  }, [doctor.id]);

  const handlePredict = async (data: PatientInput) => {
    setLoading(true);
    setError(null);

    try {
      const prediction = await predictRehabStage(data);
      setPatientName(data.patientName);
      setResult(prediction);

      savePrediction({
        doctorId: doctor.id,
        patientName: data.patientName,
        input: data,
        result: prediction,
      });

      setHistory(getPredictionsByDoctor(doctor.id));
    } catch {
      setError('Nie udało się obliczyć predykcji. Spróbuj ponownie.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="dashboard-layout">
      <header className="topbar card">
        <div>
          <h1>Panel RehabAI</h1>
          <p>
            Witaj, {doctor.fullName}. Zalogowano jako <strong>{doctor.login}</strong>.
          </p>
        </div>
        <button onClick={onLogout} className="secondary-btn" type="button">
          Wyloguj
        </button>
      </header>

      <PatientForm onSubmit={handlePredict} loading={loading} />

      {error ? <p className="error-message">{error}</p> : null}
      {result ? (
        <PredictionResult result={result} patientName={patientName} />
      ) : (
        <p className="hint">Wynik pojawi się po uruchomieniu predykcji.</p>
      )}

      <section className="card history-card">
        <h2>Historia predykcji lekarza</h2>
        {history.length === 0 ? (
          <p className="hint">Brak zapisanych predykcji dla tego konta.</p>
        ) : (
          <ul className="history-list">
            {history.map((entry) => (
              <li key={entry.id} className="history-item">
                <div>
                  <strong>{entry.patientName}</strong>
                  <p>{new Date(entry.createdAt).toLocaleString('pl-PL')}</p>
                </div>
                <div>
                  <p>
                    Etap: <strong>{entry.result.stage}</strong>
                  </p>
                  <p>Pewność: {entry.result.confidence.toFixed(1)}%</p>
                  {entry.result.stage === 'Powrót do sportu' && entry.result.estimatedDaysToReturn ? (
                    <p>Powrót do sportu za ok. {entry.result.estimatedDaysToReturn} dni</p>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
