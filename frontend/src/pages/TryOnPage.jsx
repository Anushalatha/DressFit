import { useMemo, useState } from 'react';
import VirtualTryOnViewer from '../components/VirtualTryOn/VirtualTryOnViewer.jsx';
import MeasurementForm from '../components/VirtualTryOn/MeasurementForm.jsx';
import ClothingSelector from '../components/VirtualTryOn/ClothingSelector.jsx';
import { AVAILABLE_GARMENTS } from '../utils/clothingUtils.js';
import { getRecommendedSizes } from '../services/recommendationService.js';

export default function TryOnPage() {
  const [measurements, setMeasurements] = useState({
    height: 170,
    bust: 90,
    waist: 70,
    hips: 95
  });

  const [selectedGarmentId, setSelectedGarmentId] = useState(
    AVAILABLE_GARMENTS[0]?.id ?? 'tshirt01'
  );

  const sizeRecommendation = useMemo(
    () => getRecommendedSizes(measurements),
    [measurements]
  );

  return (
    <div className="tryon-root">
      <header className="tryon-header">
        <h1>AI Fashion Futures - Virtual Try On</h1>
        <p>Adjust your measurements, pick a garment, and preview the fit.</p>
      </header>

      <main className="tryon-main">
        <section className="tryon-left">
          <MeasurementForm measurements={measurements} onChange={setMeasurements} />
          <ClothingSelector
            garments={AVAILABLE_GARMENTS}
            value={selectedGarmentId}
            onChange={setSelectedGarmentId}
          />
          <div className="tryon-panel">
            <h2 className="tryon-panel-title">Recommended size (mock)</h2>
            <p style={{ margin: 0, fontSize: '0.85rem' }}>
              Top: <strong>{sizeRecommendation.topSize}</strong> &nbsp;· Bottom:{' '}
              <strong>{sizeRecommendation.bottomSize}</strong>
            </p>
            <p style={{ margin: '0.4rem 0 0', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              {sizeRecommendation.notes}
            </p>
          </div>
        </section>

        <section className="tryon-right">
          <VirtualTryOnViewer
            measurements={measurements}
            selectedGarmentId={selectedGarmentId}
          />
        </section>
      </main>
    </div>
  );
}

