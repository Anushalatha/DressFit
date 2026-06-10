// Backend Services for Resale Authentication

export interface KycResponse {
  status: 'verified' | 'pending' | 'rejected';
  trustScore: number;
}

export interface VerifyItemResponse {
  verificationId: string;
  status: 'processing';
}

export interface VerificationStatusResponse {
  status: 'completed' | 'processing' | 'failed';
  confidenceScore: number;
  fraudDetected: boolean;
  fabricWearPercent: number;
  damageDetected: boolean;
  suggestedPrice: number;
}

export interface ListingResponse {
  txHash: string;
  status: 'listed';
}

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const resaleAuthBackend = {
  verifySellerKyc: async (sellerId: string, walletAddress: string): Promise<KycResponse> => {
    await delay(1500);
    return {
      status: 'verified',
      trustScore: Math.floor(Math.random() * 10) + 90, // 90-100
    };
  },

  verifyItem: async (itemId: string, qrScannedHash: string): Promise<VerifyItemResponse> => {
    await delay(1000);
    return {
      verificationId: `v_id_${Date.now()}`,
      status: 'processing'
    };
  },

  checkItemVerificationStatus: async (verificationId: string): Promise<VerificationStatusResponse> => {
    await delay(2500);
    return {
      status: 'completed',
      confidenceScore: +(Math.random() * 0.05 + 0.94).toFixed(3), // 0.940 - 0.990
      fraudDetected: false,
      fabricWearPercent: Math.floor(Math.random() * 20),
      damageDetected: false,
      suggestedPrice: Math.floor(Math.random() * 300) + 150,
    };
  },

  listItemOnBlockchain: async (itemId: string, verificationId: string, price: number): Promise<ListingResponse> => {
    await delay(2000);
    return {
      txHash: `0x${Math.random().toString(16).slice(2, 12)}...${Math.random().toString(16).slice(2, 6)}`,
      status: 'listed'
    };
  }
};
