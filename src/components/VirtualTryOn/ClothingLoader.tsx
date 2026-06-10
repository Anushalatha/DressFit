import { useMemo, useEffect, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import { Box3, Vector3, TextureLoader, MeshStandardMaterial, DoubleSide, SRGBColorSpace } from 'three';
import { computeBodyScale } from '../../utils/bodyScaling';

interface ClothingProps {
  measurements: any;
  modelPath: string;
  offsetY?: number;
  offsetZ?: number;
  scaleMult?: { x: number, y: number, z: number };
  textureUrl?: string;
}

export default function ClothingLoader({ measurements, modelPath, offsetY = 0, offsetZ = 0, scaleMult = { x: 1.05, y: 1.0, z: 1.05 }, textureUrl }: ClothingProps) {
  const path = modelPath ?? '/models/garments/tshirt01.glb';
  const { scene } = useGLTF(path);

  const centeredScene = useMemo(() => {
    const cloned = scene.clone();
    const box = new Box3().setFromObject(cloned);
    const center = new Vector3();
    box.getCenter(center);
    // Center garment at origin like avatar; we then apply manual Z offset to fix geometric flaring
    cloned.position.sub(center);
    return cloned;
  }, [scene]);

  // Dynamically apply texture mapping to make the 3D model look like the 2D selection!
  useEffect(() => {
    if (!textureUrl) return;
    const loader = new TextureLoader();
    loader.setCrossOrigin('anonymous');
    loader.load(textureUrl, (texture) => {
      texture.colorSpace = SRGBColorSpace;
      texture.flipY = false; // GLTF standard
      centeredScene.traverse((child: any) => {
        if (child.isMesh) {
          child.material = new MeshStandardMaterial({
            map: texture,
            roughness: 0.8,
            metalness: 0.1,
            side: DoubleSide,
          });
        }
      });
    });
  }, [textureUrl, centeredScene]);

  const bodyScale = computeBodyScale(measurements);
  const clothingScale = {
    x: bodyScale.x * scaleMult.x,
    y: bodyScale.y * scaleMult.y,
    z: bodyScale.z * scaleMult.z
  };

  const worldY = offsetY;

  return (
    <group position={[0, worldY, offsetZ]} scale={[clothingScale.x, clothingScale.y, clothingScale.z]}>
      <primitive object={centeredScene} />
    </group>
  );
}






