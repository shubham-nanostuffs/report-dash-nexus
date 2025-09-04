import { AnalyticsData, FilterOptions } from "@/types/analytics";

const states = ["Maharashtra", "Karnataka", "Tamil Nadu", "Gujarat", "Rajasthan", "Punjab", "Haryana", "Uttar Pradesh"];
const districts = ["Mumbai", "Pune", "Bangalore", "Chennai", "Ahmedabad", "Jaipur", "Ludhiana", "Agra", "Nashik", "Mysore"];
const amisps = ["AMISP-001", "AMISP-002", "AMISP-003", "AMISP-004", "AMISP-005", "AMISP-006", "AMISP-007", "AMISP-008"];
const categories = ["Agriculture", "Healthcare", "Education", "Infrastructure", "Technology"];
const statuses: Array<"Active" | "Inactive" | "Pending"> = ["Active", "Inactive", "Pending"];

const generateSampleData = (count: number, reportType: string): AnalyticsData[] => {
  return Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    state: states[Math.floor(Math.random() * states.length)],
    district: districts[Math.floor(Math.random() * districts.length)],
    amisp: amisps[Math.floor(Math.random() * amisps.length)],
    revenue: Math.floor(Math.random() * 1000000) + 100000,
    users: Math.floor(Math.random() * 10000) + 1000,
    growth: Math.floor(Math.random() * 200) - 50, // -50 to 150
    status: statuses[Math.floor(Math.random() * statuses.length)],
    date: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0],
    category: categories[Math.floor(Math.random() * categories.length)],
    performance: Math.floor(Math.random() * 100) + 1,
  }));
};

export const reportData = {
  report1: generateSampleData(150, "Report 1"),
  report2: generateSampleData(120, "Report 2"),
  report3: generateSampleData(180, "Report 3"),
  report4: generateSampleData(200, "Report 4"),
};

export const filterOptions: FilterOptions = {
  states,
  districts,
  amisps,
};