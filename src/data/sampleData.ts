import { AnalyticsData } from "../types/analytics";

export const generateSampleData = (): AnalyticsData[] => {
  const states = [
    "Maharashtra",
    "Delhi",
    "Karnataka",
    "Tamil Nadu",
    "Gujarat",
    "Uttar Pradesh",
    "West Bengal",
    "Telangana",
    "Andhra Pradesh",
    "Kerala",
  ];

  const districts = [
    "Mumbai",
    "Pune",
    "Nagpur",
    "Thane",
    "Nashik",
    "Aurangabad",
    "Solapur",
    "Kolhapur",
    "Amravati",
    "Latur",
  ];

  const amisps = [
    "AMISP001",
    "AMISP002",
    "AMISP003",
    "AMISP004",
    "AMISP005",
    "AMISP006",
    "AMISP007",
    "AMISP008",
    "AMISP009",
    "AMISP010",
  ];

  return Array.from({ length: 50 }, (_, index) => {
    const sno = index + 1;
    const state = states[Math.floor(Math.random() * states.length)];
    const district = districts[Math.floor(Math.random() * districts.length)];
    const amisp = amisps[Math.floor(Math.random() * amisps.length)];

    // Basic consumer and message flow data
    const no_of_consumers = Math.floor(Math.random() * 50000) + 10000;
    const messages_attempted = Math.floor(
      no_of_consumers * (0.85 + Math.random() * 0.15)
    );
    const messages_delivered = Math.floor(
      messages_attempted * (0.75 + Math.random() * 0.2)
    );
    const messages_read = Math.floor(
      messages_delivered * (0.6 + Math.random() * 0.3)
    );
    const consumers_clicked_form = Math.floor(
      messages_read * (0.4 + Math.random() * 0.4)
    );
    const consumers_submitted_response = Math.floor(
      consumers_clicked_form * (0.7 + Math.random() * 0.25)
    );

    // Meter issue data
    const issue_faced = Math.floor(
      consumers_submitted_response * (0.2 + Math.random() * 0.3)
    );
    const higher_meter_reading = Math.floor(
      issue_faced * (0.3 + Math.random() * 0.4)
    );
    const amount_charged = Math.floor(
      issue_faced * (0.2 + Math.random() * 0.3)
    );
    const installation_not_proper = Math.floor(
      issue_faced * (0.15 + Math.random() * 0.25)
    );
    const mobile_app_not_working = Math.floor(
      issue_faced * (0.1 + Math.random() * 0.2)
    );

    // App installation data
    const not_installed = Math.floor(
      consumers_submitted_response * (0.3 + Math.random() * 0.4)
    );
    const not_interested = Math.floor(
      not_installed * (0.4 + Math.random() * 0.4)
    );
    const not_aware = Math.floor(not_installed * (0.2 + Math.random() * 0.3));

    // Features available data (based on installed users)
    const installed_users = consumers_submitted_response - not_installed;
    const recharge_bill_option = Math.floor(
      installed_users * (0.6 + Math.random() * 0.3)
    );
    const real_time_consumption = Math.floor(
      installed_users * (0.5 + Math.random() * 0.4)
    );
    const consumption_analysis = Math.floor(
      installed_users * (0.4 + Math.random() * 0.4)
    );

    // Ease of understanding bill data
    const easy_to_understand = Math.floor(
      consumers_submitted_response * (0.5 + Math.random() * 0.3)
    );
    const not_understanding = consumers_submitted_response - easy_to_understand;
    const too_complex = Math.floor(
      not_understanding * (0.3 + Math.random() * 0.4)
    );
    const not_in_local_language = Math.floor(
      not_understanding * (0.2 + Math.random() * 0.3)
    );
    const insufficient_information = Math.floor(
      not_understanding * (0.15 + Math.random() * 0.25)
    );
    const other_issues = Math.floor(
      not_understanding * (0.1 + Math.random() * 0.2)
    );

    // Bill payment and app usability
    const bill_payment_easy = Math.floor(
      consumers_submitted_response * (0.6 + Math.random() * 0.3)
    );
    const mobile_app_easy_to_use = Math.floor(
      consumers_submitted_response * (0.55 + Math.random() * 0.35)
    );

    // Overall experience
    const excellent = Math.floor(
      consumers_submitted_response * (0.25 + Math.random() * 0.3)
    );
    const good = Math.floor(
      consumers_submitted_response * (0.3 + Math.random() * 0.3)
    );
    const average = Math.floor(
      consumers_submitted_response * (0.2 + Math.random() * 0.25)
    );
    const bad = Math.floor(
      consumers_submitted_response * (0.05 + Math.random() * 0.15)
    );

    return {
      sno,
      state,
      district,
      amisp,
      no_of_consumers,
      messages_attempted,
      messages_delivered,
      messages_read,
      consumers_clicked_form,
      consumers_submitted_response,
      issue_faced,
      higher_meter_reading,
      amount_charged,
      installation_not_proper,
      mobile_app_not_working,
      not_installed,
      not_interested,
      not_aware,
      recharge_bill_option,
      real_time_consumption,
      consumption_analysis,
      easy_to_understand,
      too_complex,
      not_in_local_language,
      insufficient_information,
      other_issues,
      bill_payment_easy,
      mobile_app_easy_to_use,
      excellent,
      good,
      average,
      bad,
    };
  });
};

export const reportData = {
  report1: generateSampleData(),
  report2: generateSampleData(),
  report3: generateSampleData(),
  report4: generateSampleData(),
};

export const filterOptions = {
  states: [
    "Maharashtra",
    "Delhi",
    "Karnataka",
    "Tamil Nadu",
    "Gujarat",
    "Uttar Pradesh",
    "West Bengal",
    "Telangana",
    "Andhra Pradesh",
    "Kerala",
  ],
  districts: [
    "Mumbai",
    "Pune",
    "Nagpur",
    "Thane",
    "Nashik",
    "Aurangabad",
    "Solapur",
    "Kolhapur",
    "Amravati",
    "Latur",
  ],
  amisps: [
    "AMISP001",
    "AMISP002",
    "AMISP003",
    "AMISP004",
    "AMISP005",
    "AMISP006",
    "AMISP007",
    "AMISP008",
    "AMISP009",
    "AMISP010",
  ],
};
