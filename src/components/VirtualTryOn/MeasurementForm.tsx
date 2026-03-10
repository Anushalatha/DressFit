export default function MeasurementForm({ measurements, onChange }) {
  const handleChange = (field) => (event) => {
    const value = Number(event.target.value) || 0;
    onChange({
      ...measurements,
      [field]: value
    });
  };

  return (
    <div className="tryon-panel">
      <h2 className="tryon-panel-title">Body measurements</h2>
      <div className="tryon-form-grid">
        <label className="tryon-field">
          <span>Height (cm)</span>
          <input
            type="number"
            value={measurements.height}
            onChange={handleChange('height')}
            min={130}
            max={220}
          />
        </label>
        <label className="tryon-field">
          <span>Bust (cm)</span>
          <input
            type="number"
            value={measurements.bust}
            onChange={handleChange('bust')}
            min={70}
            max={130}
          />
        </label>
        <label className="tryon-field">
          <span>Waist (cm)</span>
          <input
            type="number"
            value={measurements.waist}
            onChange={handleChange('waist')}
            min={50}
            max={120}
          />
        </label>
        <label className="tryon-field">
          <span>Hip (cm)</span>
          <input
            type="number"
            value={measurements.hips}
            onChange={handleChange('hips')}
            min={70}
            max={140}
          />
        </label>
      </div>
    </div>
  );
}

