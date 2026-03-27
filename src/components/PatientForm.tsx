import { useState, type ChangeEvent, type FormEvent } from 'react';
import type { PatientInput } from '../types/patient';

interface PatientFormProps {
  onSubmit: (data: PatientInput) => Promise<void>;
  loading: boolean;
}

const initialState: PatientInput = {
  patientName: '',
  rom: 90,
  pain: 5,
  strength: 5,
  asymmetry: 20,
  daysSinceInjury: 14,
};

export default function PatientForm({ onSubmit, loading }: PatientFormProps) {
  const [formData, setFormData] = useState<PatientInput>(initialState);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData((prev: PatientInput) => {
      if (name === 'patientName') {
        return { ...prev, patientName: value };
      }

      return { ...prev, [name]: Number(value) };
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="card form-grid">
      <h2>Dane pacjenta</h2>

      <label>
        Imię pacjenta
        <input
          type="text"
          name="patientName"
          value={formData.patientName}
          onChange={handleChange}
          placeholder="np. Jan Kowalski"
          required
        />
        <small className="input-help">Podaj imię i nazwisko lub identyfikator pacjenta, aby łatwo odszukać predykcję w historii.</small>
      </label>

      <label>
        Zakres ruchu (ROM)
        <input type="number" min={0} max={180} step={1} name="rom" value={formData.rom} onChange={handleChange} />
        <small className="input-help">Zakres ruchu stawu w stopniach (0–180). Wyższa wartość zwykle oznacza lepszą mobilność.</small>
      </label>

      <label>
        Ból (VAS 0–10)
        <input type="number" min={0} max={10} step={0.1} name="pain" value={formData.pain} onChange={handleChange} />
        <small className="input-help">Subiektywna skala bólu: 0 = brak bólu, 10 = ból nie do zniesienia.</small>
      </label>

      <label>
        Siła mięśni (0–10)
        <input
          type="number"
          min={0}
          max={10}
          step={0.1}
          name="strength"
          value={formData.strength}
          onChange={handleChange}
        />
        <small className="input-help">Ocena siły mięśniowej: 0 = brak aktywacji, 10 = pełna siła funkcjonalna.</small>
      </label>

      <label>
        Asymetria lewa/prawa (%)
        <input
          type="number"
          min={0}
          max={100}
          step={0.1}
          name="asymmetry"
          value={formData.asymmetry}
          onChange={handleChange}
        />
        <small className="input-help">Różnica obciążenia/ruchu między stronami ciała. 0% oznacza pełną symetrię.</small>
      </label>

      <label>
        Dni od urazu
        <input
          type="number"
          min={0}
          max={365}
          step={1}
          name="daysSinceInjury"
          value={formData.daysSinceInjury}
          onChange={handleChange}
        />
        <small className="input-help">Liczba dni od wystąpienia urazu. Pomaga oszacować etap procesu gojenia.</small>
      </label>

      <button type="submit" disabled={loading}>
        {loading ? 'Przetwarzanie...' : 'Uruchom predykcję i zapisz'}
      </button>
    </form>
  );
}
