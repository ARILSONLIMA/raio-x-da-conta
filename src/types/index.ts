export interface User {
  id: string;
  name: string;
  email: string;
  password_hash: string;
  waterGoal: number | null;
  energyGoal: number | null;
  createdAt: string;
}

export interface Invoice {
  id: string;
  userId: string;
  type: 'WATER' | 'ENERGY';
  month: number;
  year: number;
  consumption: number;
  cost: number;
  createdAt: string;
  updatedAt: string;
}
