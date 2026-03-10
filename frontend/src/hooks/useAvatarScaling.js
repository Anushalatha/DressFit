import { useMemo } from 'react';
import { computeBodyScale } from '../utils/bodyScaling.js';

export default function useAvatarScaling(measurements) {
  return useMemo(() => computeBodyScale(measurements), [measurements]);
}

