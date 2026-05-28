export interface UserDashboard {
  id: number;
  name: string;
  email: string;
  plan: 'SOLO' | 'SMALL' | 'FULL';
  subscriptionStatus: 'ACTIVE' | 'CANCELED';
  subscriptionPaidUntil: string; // ISO date string
  usedMachines: number;
  maxMachines: number;
  machinesTotal: number;
  lastMachineRegistered: string;
  isPlanEligiblePremiumContact: boolean;
}