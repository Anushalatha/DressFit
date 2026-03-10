const BASE_HEIGHT = 170;
const BASE_BUST = 88;
const BASE_HIP = 95;

export function computeBodyScale(measurements) {
  if (!measurements) {
    return { x: 1, y: 1, z: 1 };
  }

  const { height, bust, hip, hips } = measurements;

  const heightScale = height ? height / BASE_HEIGHT : 1;
  const bustScale = bust ? bust / BASE_BUST : 1;
  const hipValue = typeof hip === 'number' ? hip : hips;
  const hipScale = hipValue ? hipValue / BASE_HIP : 1;

  return {
    x: bustScale || 1,
    y: heightScale || 1,
    z: hipScale || 1
  };
}

