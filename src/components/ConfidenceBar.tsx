interface ConfidenceBarProps {
  confidence: number;
}

const confidenceColor = (confidence: number): string => {
  if (confidence >= 75) return '#10b981';
  if (confidence >= 50) return '#f59e0b';
  return '#ef4444';
};

export default function ConfidenceBar({ confidence }: ConfidenceBarProps) {
  return (
    <div className="confidence-wrapper">
      <div className="confidence-header">
        <span>Pewność predykcji</span>
        <strong>{confidence.toFixed(1)}%</strong>
      </div>
      <div className="confidence-track" aria-label="Poziom pewności modelu">
        <div
          className="confidence-fill"
          style={{ width: `${Math.min(confidence, 100)}%`, backgroundColor: confidenceColor(confidence) }}
        />
      </div>
    </div>
  );
}
