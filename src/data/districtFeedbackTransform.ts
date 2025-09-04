import { AnalyticsData, DistrictFeedbackData } from "@/types/analytics";
import { districtFeedbackData } from "./districtFeedback";

export function transformDistrictFeedbackData(): AnalyticsData[] {
  return districtFeedbackData.map(
    (item: DistrictFeedbackData, index: number) => {
      // Calculate derived values based on the available data
      const consumersSubmittedResponse = Math.floor(item.no_of_consumers * 0.8); // Assume 80% response rate
      const notInstalled = consumersSubmittedResponse - item.app_installed;

      return {
        sno: index + 1,
        state: item.State,
        district: item.District,
        amisp: "N/A", // Not available in district feedback data
        no_of_consumers: item.no_of_consumers,
        messages_attempted: Math.floor(item.no_of_consumers * 0.9), // Assume 90% attempted
        messages_delivered: Math.floor(item.no_of_consumers * 0.85), // Assume 85% delivered
        messages_read: Math.floor(item.no_of_consumers * 0.75), // Assume 75% read
        consumers_clicked_form: Math.floor(item.no_of_consumers * 0.6), // Assume 60% clicked
        consumers_submitted_response: consumersSubmittedResponse,
        issue_faced: item.issue_faced,
        higher_meter_reading: item.higher_meter_reading,
        amount_charged: Math.floor(item.issue_faced * 0.3), // Assume 30% of issues are amount related
        installation_not_proper: Math.floor(item.issue_faced * 0.2), // Assume 20% are installation issues
        mobile_app_not_working: Math.floor(item.issue_faced * 0.1), // Assume 10% are app issues
        not_installed: notInstalled,
        not_interested: Math.floor(notInstalled * 0.4), // Assume 40% of not installed are not interested
        not_aware: Math.floor(notInstalled * 0.3), // Assume 30% are not aware
        recharge_bill_option: Math.floor(item.feature_available * 0.4), // Assume 40% of features are recharge/bill
        real_time_consumption: Math.floor(item.feature_available * 0.35), // Assume 35% are real-time consumption
        consumption_analysis: Math.floor(item.feature_available * 0.25), // Assume 25% are consumption analysis
        easy_to_understand: item.Bill_is_easy_to_understand,
        too_complex: Math.floor(
          (consumersSubmittedResponse - item.Bill_is_easy_to_understand) * 0.3
        ),
        not_in_local_language: Math.floor(
          (consumersSubmittedResponse - item.Bill_is_easy_to_understand) * 0.25
        ),
        insufficient_information: Math.floor(
          (consumersSubmittedResponse - item.Bill_is_easy_to_understand) * 0.25
        ),
        other_issues: Math.floor(
          (consumersSubmittedResponse - item.Bill_is_easy_to_understand) * 0.2
        ),
        bill_payment_easy: item.Bill_is_easy_to_understand, // Use same value as easy to understand
        mobile_app_easy_to_use: item.Mobile_app_easy_to_use,
        excellent: item.Overall_Experience_Excellent,
        good: item.Overall_Experience_Good,
        average: item.Overall_Experience_Average,
        bad: item.Overall_Experience_Bad,
      };
    }
  );
}

export function getDistrictFeedbackFilterOptions() {
  const states = [
    ...new Set(districtFeedbackData.map((item) => item.State)),
  ] as string[];
  const districts = [
    ...new Set(districtFeedbackData.map((item) => item.District)),
  ] as string[];
  const amisps = ["N/A"]; // Since AMISP is not available in district feedback data

  return {
    states,
    districts,
    amisps,
  };
}
