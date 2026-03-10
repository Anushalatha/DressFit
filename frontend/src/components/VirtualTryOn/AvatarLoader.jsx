import { useMemo } from 'react';
import { useGLTF } from '@react-three/drei';
import { Box3, Vector3 } from 'three';
import { computeBodyScale } from '../../utils/bodyScaling.js';

const AVATAR_PATH = '/models/body/female_base.glb';

export default function AvatarLoader({ measurements }) {
  const { scene } = useGLTF(AVATAR_PATH);

  const centeredScene = useMemo(() => {
    const cloned = scene.clone();
    const box = new Box3().setFromObject(cloned);
    const center = new Vector3();
    box.getCenter(center);
    cloned.position.sub(center);
    return cloned;
  }, [scene]);

  const scale = computeBodyScale(measurements);

  return (
    <group scale={[scale.x, scale.y, scale.z]}>
      <primitive object={centeredScene} />
    </group>
  );
}

useGLTF.preload(AVATAR_PATH);


