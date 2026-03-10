export function getSustainabilityScore(garmentId) {
  const scores = {
    tshirt01: 7.5,
    dress01: 8.2,
    dress02: 6.9
  };

  return {
    garmentId,
    score: scores[garmentId] ?? 7.0,
    label: 'Mock sustainability score (0–10 scale).'
  };
}

