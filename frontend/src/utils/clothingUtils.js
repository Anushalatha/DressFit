export const AVAILABLE_GARMENTS = [
  {
    id: 'tshirt01',
    label: 'T-Shirt',
    modelPath: '/models/garments/tshirt01.glb',
    offsetY: 0.0,
    thumbnailPath: '/images/garments/tshirt01.png'
  },
  {
    id: 'dress01',
    label: 'Dress 1',
    modelPath: '/models/garments/dress01.glb',
    offsetY: 0.1,
    thumbnailPath: '/images/garments/dress01.png'
  },
  {
    id: 'dress02',
    label: 'Dress 2',
    modelPath: '/models/garments/dress02.glb',
    offsetY: 0.1,
    thumbnailPath: '/images/garments/dress02.png'
  },
  {
    id: 'dress03',
    label: 'Dress 3',
    modelPath: '/models/garments/dress03.glb',
    offsetY: 0.1,
    thumbnailPath: '/images/garments/dress03.png'
  }
];

export function getClothingModelPath(garmentId) {
  const garment = AVAILABLE_GARMENTS.find((g) => g.id === garmentId);
  return garment ? garment.modelPath : AVAILABLE_GARMENTS[0].modelPath;
}

export function getClothingConfig(garmentId) {
  const fallback = AVAILABLE_GARMENTS[0];
  const garment = AVAILABLE_GARMENTS.find((g) => g.id === garmentId) ?? fallback;
  return {
    modelPath: garment.modelPath,
    offsetY: garment.offsetY
  };
}


