export interface UserDashboard {
  id: number;
  name: string;
  email: string;
  plan: 'SOLO' | 'SMALL' | 'FULL';
  licenseStatus: 'ACTIVE' | 'CANCELED';
  usedMachines: number;
  maxMachines: number;
  machinesTotal: number;
  lastMachineRegistered: string;
  isPlanEligiblePremiumContact: boolean;
}