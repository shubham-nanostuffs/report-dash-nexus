export interface AnalyticsData {
  // Basic Info
  sno: number;
  state: string;
  district: string;
  amisp: string;

  // Consumer & Message Flow
  no_of_consumers: number;
  messages_attempted: number;
  messages_delivered: number;
  messages_read: number;
  consumers_clicked_form: number;
  consumers_submitted_response: number;

  // Facing Meter Issue
  issue_faced: number;
  higher_meter_reading: number;
  amount_charged: number;
  installation_not_proper: number;
  mobile_app_not_working: number;

  // App Installation
  not_installed: number;
  not_interested: number;
  not_aware: number;

  // Features Available
  recharge_bill_option: number;
  real_time_consumption: number;
  consumption_analysis: number;

  // Ease of Understanding Bill
  easy_to_understand: number;
  too_complex: number;
  not_in_local_language: number;
  insufficient_information: number;
  other_issues: number;

  // Bill Payment & App Usability
  bill_payment_easy: number;
  mobile_app_easy_to_use: number;

  // Overall Experience
  excellent: number;
  good: number;
  average: number;
  bad: number;
}

export interface DistrictFeedbackData {
  State: string;
  District: string;
  no_of_consumers: number;
  issue_faced: number;
  higher_meter_reading: number;
  app_installed: number;
  feature_available: number;
  Bill_is_easy_to_understand: number;
  Mobile_app_easy_to_use: number;
  Overall_Experience_Excellent: number;
  Overall_Experience_Good: number;
  Overall_Experience_Bad: number;
  Overall_Experience_Average: number;
}

export interface FilterOptions {
  states: string[];
  districts: string[];
  amisps: string[];
}

export interface ColumnVisibility {
  [key: string]: boolean;
}
