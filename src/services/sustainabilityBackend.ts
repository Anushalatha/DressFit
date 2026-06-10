export interface SustainabilityDashboardStats {
  totalCarbonSaved: number;
  itemsInWardrobe: number;
  averageScore: number;
  badges: string[];
  impactData: { month: string; userFootprint: number; industryAvg: number }[];
}

export interface LifecycleEvent {
  itemId: string;
  eventType: 'PURCHASING' | 'RESALE' | 'DONATION' | 'RECYCLING';
  location: string;
  timestamp: string;
}

// Mocking backend interactions for sustainability APIs
export const sustainabilityBackend = {
  getUserDashboard: async (userId: string): Promise<SustainabilityDashboardStats> => {
    return new Promise(resolve => setTimeout(() => {
      resolve({
         totalCarbonSaved: 124.5,
         itemsInWardrobe: 12,
         averageScore: 84,
         badges: ["Eco Pioneer", "Circular Economist"],
         impactData: [
            { month: 'Jan', userFootprint: 45, industryAvg: 60 },
            { month: 'Feb', userFootprint: 38, industryAvg: 62 },
            { month: 'Mar', userFootprint: 26, industryAvg: 60 },
            { month: 'Apr', userFootprint: 22, industryAvg: 58 },
            { month: 'May', userFootprint: 10, industryAvg: 65 },
         ]
      })
    }, 800));
  },
  
  logLifecycleEvent: async (event: LifecycleEvent): Promise<{ success: boolean; hash: string }> => {
     return new Promise(resolve => setTimeout(() => {
        resolve({
           success: true,
           hash: `0x${Math.random().toString(16).slice(2, 60)}`
        })
     }, 1000));
  }
}
