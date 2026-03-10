export function getRecommendedSizes(measurements) {
  const { bust, waist, hips } = measurements;

  const topSize = sizeFromBust(bust);
  const bottomSize = sizeFromHipsWaist(hips, waist);

  return {
    topSize,
    bottomSize,
    notes:
      'Mock size recommendation based on simple thresholds; final sizing will use backend fit models.'
  };
}

function sizeFromBust(bust) {
  if (!bust) return 'M';
  if (bust < 84) return 'S';
  if (bust < 96) return 'M';
  if (bust < 108) return 'L';
  return 'XL';
}

function sizeFromHipsWaist(hips, waist) {
  const value = (Number(hips || 0) + Number(waist || 0)) / 2 || 0;
  if (!value) return 'M';
  if (value < 86) return 'S';
  if (value < 98) return 'M';
  if (value < 110) return 'L';
  return 'XL';
}


