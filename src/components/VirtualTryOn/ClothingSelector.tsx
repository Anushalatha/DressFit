export default function ClothingSelector({ garments, value, onChange }) {
  return (
    <div className="tryon-panel">
      <h2 className="tryon-panel-title">Select garment</h2>
      <div className="tryon-garment-grid">
        {garments.map((garment) => {
          const isActive = value === garment.id;
          return (
            <button
              key={garment.id}
              type="button"
              className={
                'tryon-garment-card ' + (isActive ? 'tryon-garment-card-active' : '')
              }
              onClick={() => onChange(garment.id)}
            >
              <div className="tryon-garment-thumb">
                <img
                  src={garment.thumbnailPath}
                  alt={garment.label}
                  onError={(e) => {
                    e.currentTarget.style.visibility = 'hidden';
                  }}
                />
              </div>
              <span className="tryon-garment-label">{garment.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}


