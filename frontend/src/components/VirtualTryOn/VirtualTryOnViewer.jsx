import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { MOUSE } from 'three';
import AvatarLoader from './AvatarLoader.jsx';
import ClothingLoader from './ClothingLoader.jsx';
import { getClothingConfig } from '../../utils/clothingUtils.js';

export default function VirtualTryOnViewer({ measurements, selectedGarmentId }) {
  const garmentConfig = getClothingConfig(selectedGarmentId);

  return (
    <div className="tryon-viewer">
      <Canvas camera={{ position: [0, 1.6, 3], fov: 45 }}>
        <color attach="background" args={['#101018']} />
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 10, 5]} intensity={0.9} />
        <Environment preset="studio" />

        <group>
          <AvatarLoader measurements={measurements} />
          <ClothingLoader
            measurements={measurements}
            modelPath={garmentConfig.modelPath}
            offsetY={garmentConfig.offsetY}
          />
        </group>

        <OrbitControls
          enablePan={false}
          enableZoom
          enableRotate
          target={[0, 0.9, 0]}
          mouseButtons={{
            LEFT: MOUSE.ROTATE,
            RIGHT: MOUSE.PAN,
            MIDDLE: MOUSE.DOLLY
          }}
        />
      </Canvas>

      <p className="tryon-viewer-hint">
        Models are loaded from <code>public/models/body</code> and{' '}
        <code>public/models/garments</code>. Add your <code>.glb</code> files there to see them
        here.
      </p>
    </div>
  );
}


