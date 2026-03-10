// Mock AI Agent Services

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export interface TryOnResult {
  fitConfidence: number;
  sizeRecommendation: string;
  adjustments: string[];
  processingTime: number;
}

export interface EthicalRankingResult {
  sustainabilityScore: number;
  carbonFootprint: number;
  ethicalLabor: boolean;
  circularRating: number;
  explanation: string;
}

export interface ResaleAuthResult {
  authenticityScore: number;
  fabricWearPercent: number;
  damageDetected: boolean;
  suggestedPrice: number;
  blockchainHash: string;
}

export interface TailoringResult {
  adjustments: { area: string; adjustment: string }[];
  confidence: number;
}

export const tryOnAgent = async (): Promise<TryOnResult> => {
  await delay(2000);
  return {
    fitConfidence: Math.floor(Math.random() * 15) + 85,
    sizeRecommendation: "M - Perfect Fit",
    adjustments: ["Sleeve length: -0.5cm", "Shoulder width: optimal", "Waist: snug fit"],
    processingTime: 1.8,
  };
};

export const ethicalRankingAgent = async (): Promise<EthicalRankingResult> => {
  await delay(1500);
  return {
    sustainabilityScore: Math.floor(Math.random() * 20) + 75,
    carbonFootprint: +(Math.random() * 5 + 1).toFixed(1),
    ethicalLabor: true,
    circularRating: Math.floor(Math.random() * 20) + 70,
    explanation: "Score calculated using AI Ethical Ranking Agent analyzing supply chain data, material sourcing, and labor conditions.",
  };
};

export const resaleAgent = async (): Promise<ResaleAuthResult> => {
  await delay(2500);
  return {
    authenticityScore: Math.floor(Math.random() * 10) + 88,
    fabricWearPercent: Math.floor(Math.random() * 25) + 5,
    damageDetected: Math.random() > 0.7,
    suggestedPrice: Math.floor(Math.random() * 500) + 200,
    blockchainHash: `0x${Math.random().toString(16).slice(2, 10)}...${Math.random().toString(16).slice(2, 6)}`,
  };
};

export const tailoringAgent = async (): Promise<TailoringResult> => {
  await delay(1800);
  return {
    adjustments: [
      { area: "Shoulders", adjustment: "Reduce by 0.5cm" },
      { area: "Chest", adjustment: "Optimal fit" },
      { area: "Waist", adjustment: "Take in 1cm" },
      { area: "Sleeve Length", adjustment: "Extend by 0.3cm" },
    ],
    confidence: Math.floor(Math.random() * 10) + 88,
  };
};
