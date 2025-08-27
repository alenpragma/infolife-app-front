export interface StakingResponse {
    statusCode: number;
    message: string;
    payload: {
      stakings: Staking[];
    };
  }
  
  export interface Staking {
    id: number;
    amount: string;
    durationDays: number;
    receivedDays: number;
    apy: string;
    status: string;
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
    dailyReward: number;
  }
  