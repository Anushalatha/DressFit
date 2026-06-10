export const AVAILABLE_GARMENTS = [
  {
    id: 'tshirt01',
    label: 'T-Shirt',
    modelPath: '/models/garments/tshirt01.glb',
    offsetY: -0.02,
    offsetZ: 0.02,
    scaleMult: { x: 1.18, y: 1.05, z: 1.22 },
    thumbnailPath: '/images/garments/tshirt01.png'
  },
  {
    id: 'dress01',
    label: 'Dress 1',
    modelPath: '/models/garments/dress01.glb',
    offsetY: 0.1,
    offsetZ: 0.03, 
    scaleMult: { x: 0.95, y: 1.0, z: 1.02 },
    thumbnailPath: '/images/garments/dress01.png'
  },
  {
    id: 'dress02',
    label: 'Dress 2',
    modelPath: '/models/garments/dress02.glb',
    offsetY: 0.09,
    offsetZ: 0.03,
    scaleMult: { x: 0.96, y: 1.02, z: 1.03 },
    thumbnailPath: '/images/garments/dress02.png'
  },
  {
    id: 'dress03',
    label: 'Dress 3',
    modelPath: '/models/garments/dress03.glb',
    offsetY: 0.06,
    offsetZ: 0.03,
    scaleMult: { x: 0.95, y: 1.01, z: 1.02 },
    thumbnailPath: '/images/garments/dress03.png'
  }
];

export function getClothingModelPath(garmentId: string) {
  const garment = AVAILABLE_GARMENTS.find((g) => g.id === garmentId);
  return garment ? garment.modelPath : AVAILABLE_GARMENTS[0].modelPath;
}

export function getClothingConfig(garmentId: string) {
  const fallback = AVAILABLE_GARMENTS[0];
  const garment = AVAILABLE_GARMENTS.find((g) => g.id === garmentId) ?? fallback;
  return {
    modelPath: garment.modelPath,
    offsetY: garment.offsetY,
    offsetZ: garment.offsetZ,
    scaleMult: garment.scaleMult
  };
}


