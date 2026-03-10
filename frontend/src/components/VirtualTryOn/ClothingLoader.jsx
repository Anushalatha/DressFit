import { useMemo } from 'react';
import { useGLTF } from '@react-three/drei';
import { Box3, Vector3 } from 'three';
import { computeBodyScale } from '../../utils/bodyScaling.js';

export default function ClothingLoader({ measurements, modelPath, offsetY = 0 }) {
  const path = modelPath ?? '/models/garments/tshirt01.glb';
  const { scene } = useGLTF(path);

  const centeredScene = useMemo(() => {
    const cloned = scene.clone();
    const box = new Box3().setFromObject(cloned);
    const center = new Vector3();
    box.getCenter(center);
    // Center garment at origin like avatar; we then apply a small Y offset.
    cloned.position.sub(center);
    return cloned;
  }, [scene]);

  const bodyScale = computeBodyScale(measurements);
  const clothingScale = {
    x: bodyScale.x * 1.05,
    y: bodyScale.y,
    z: bodyScale.z * 1.05
  };

  // Small downward offset so garments sit slightly over the torso.
  const worldY = offsetY - 0.05;

  return (
    <group position={[0, worldY, 0]} scale={[clothingScale.x, clothingScale.y, clothingScale.z]}>
      <primitive object={centeredScene} />
    </group>
  );
}






