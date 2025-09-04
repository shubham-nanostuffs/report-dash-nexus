export interface AnalyticsData {
  id: number;
  state: string;
  district: string;
  amisp: string;
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