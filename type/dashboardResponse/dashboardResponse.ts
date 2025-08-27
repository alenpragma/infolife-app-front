export type DashboardStatsResponse = {
  statusCode: number;
  message: string;
  payload: payload;
};

export type payload = {
  token: string;
  ACTIVATION_USDT: number;
  TOKEN_PRICE: number;

  minimumDeposit: number;
  minimumWithdraw: number;

  minimumBuyToken: number;
  withdrawCharge: number;

  PROFIT_MAP: {
    [key: string]: number; // "1", "2", ... key গুলো স্ট্রিং হিসেবে, ভ্যালু নাম্বার
  };
  stakingDetails: {
    durationDays: number;
    apy: number;
    minimum: number;
    maximum: number;
  };
  totalPurchase: number;
  referralEarnings: number;
};

export type activeResponse = {
  data: {
    message: string;
    statusCode: number;
  };
  status: number;
};

export interface ReferralStatItem {
  level: number;
  total: number;
  active: number;
  inactive: number;
  totalSales: number;
}

export interface IReferralStatsPayload {
  totalEarnings: number;
  totalReferrals: number;
  levelOneCommission: number;
  credit: number;
  stats: ReferralStatItem[];
}

export interface ReferralStatsResponse {
  statusCode: number;
  message: string;
  payload: IReferralStatsPayload;
}
