export interface AnalyticsData {
  id: number;
  state: string;
  district: string;
  amisp: string;
  consumers: number;
  messagesAttempted: number;
  messagesDelivered: number;
  messagesRead: number;
  consumersClicked: number;
  consumersSubmitted: number;
  higherMeterReading: number;
  amountCharged: number;
  installationNotProper: number;
  mobileAppNotWorking: number;
  revenue: number;
  users: number;
  growth: number;
  status: "Active" | "Inactive" | "Pending";
  date: string;
  category: string;
  performance: number;
}

export interface FilterOptions {
  states: string[];
  districts: string[];
  amisps: string[];
}

export interface ColumnVisibility {
  [key: string]: boolean;
}