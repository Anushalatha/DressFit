import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Bounds } from '@react-three/drei';
import { MOUSE } from 'three';
import AvatarLoader from './AvatarLoader';
import ClothingLoader from './ClothingLoader';
import { getClothingConfig } from '../../utils/clothingUtils';

export default function VirtualTryOnViewer({ measurements, selectedGarmentId, productImage }) {
  const garmentConfig = getClothingConfig(selectedGarmentId);

  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas camera={{ position: [0, 1.2, 3.5], fov: 45 }} style={{ touchAction: "none" }}>
        <color attach="background" args={['#101018']} />
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 10, 5]} intensity={0.9} />
        <Environment preset="studio" />

        <Bounds fit clip observe margin={1.1}>
          <group>
            <AvatarLoader measurements={measurements} />
            <ClothingLoader
              measurements={measurements}
              modelPath={garmentConfig.modelPath}
              offsetY={garmentConfig.offsetY}
              offsetZ={garmentConfig.offsetZ}
              scaleMult={garmentConfig.scaleMult}
              textureUrl={productImage}
            />
          </group>
        </Bounds>

        <OrbitControls
          makeDefault
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


    </div>
  );
}


