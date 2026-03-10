import { Canvas } from '@react-three/fiber';
import { Environment, Bounds } from '@react-three/drei';
import ClothingLoader from './ClothingLoader';

interface MiniGarmentViewerProps {
  modelPath: string;
  textureUrl: string;
}

export default function MiniGarmentViewer({ modelPath, textureUrl }: MiniGarmentViewerProps) {
  return (
    <div className="w-full h-full pointer-events-none">
      <Canvas camera={{ position: [0, 0, 3], fov: 45 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 10, 5]} intensity={0.9} />
        <Environment preset="studio" />
        <Bounds fit clip observe margin={1.2}>
          <group rotation={[0, -Math.PI / 8, 0]}>
             <ClothingLoader 
               measurements={{ height: 170, bust: 90, waist: 75, hips: 95 }}
               modelPath={modelPath} 
               textureUrl={textureUrl}
             />
          </group>
        </Bounds>
      </Canvas>
    </div>
  );
}
