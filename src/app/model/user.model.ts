import { Card } from "./card.model";

export interface User {
  id?: number
  name: string;
  email: string;
  plan: string;
  token: string;
  usedMachines?: number
  card?: Card
  subscriptionPaidUntil?: Date
  subscriptionStatus: string
}