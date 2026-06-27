export interface Client {
  id: string;
  name: string;
  status: 'Active' | 'Review' | 'Inactive';
  tier: 'Premier' | 'Standard';
  accountManager: string;
  balance: number;
  lastContact: string;
  balanceHistory: number[];
}

export interface AuthUser {
  username: string;
  token: string;
  displayName: string;
}

export interface NotificationPreference {
  id: string;
  label: string;
  enabled: boolean;
  category: 'email' | 'sms' | 'inApp';
}
