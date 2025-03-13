export type Miner = {
  id: number;
  name: string;
  license: string;
  licenseId: number;
  ownerId: number;
  totalPing: number;
  lastPing: string;
  reward: number;
  rewardClaimed: number;
  hashRate: number;
  device: string;
  agent: string;
  memory: number;
  cpuCores: number;
  createdAt: string; // ISO Date string
  updatedAt: string; // ISO Date string
};
