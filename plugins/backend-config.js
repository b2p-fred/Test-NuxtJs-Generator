export default function ({$config}) {
  export const backendConfig = {
    apiUrl: process.env.API_URL,

    // -----
    // Machine API
    // -----
    // PreProd
    // apiUser: null,
    // apiUser: "fmohier",
    apiUser: "api_create_patient",
    // apiToken: "$2y$15$YwyQnvuth7AdFCl5CoovwOU0n4ta7oImmrGSqAco.6eRFZ.EH6NIO",
    apiToken: "$2y$15$/ncJgS/t1JHjLkdFTBPDmeegkZrDTcxPnlLgdSWcivTWJ87lpbM.S",

    // Local - test fixtures
    // apiUser: "api_create_data",
    // apiToken: "$2y$15$/ncJgS/t1JHjLkdFTBPDmeegkZrDTcxPnlLgdSWcivTWJ87lpbM.S",

    // User service
    loginEndpoint: "/patient_login_check",
    refreshEndpoint: "/token/refresh",
    profileEndpoint: "/me/user_info",

    logoutEndpoint: "/me/logout",
    touEndpoint: "/me/accept_conditions",

    // API service
    apiInfoEndpoint: "/api/info",

    // Patients list
    patientsEndpoint: "/patients",

    // Patients health events service
    phesEndpoint: "/patient_health_events",

    // Other services
    freeActivitiesEndpoint: "/free_activities",
    activitiesEndpoint: "/activities",
    activityValuesEndpoint: "/activity_values",
    valuesEndpoint: "/values",

    // Send information
    activityAnswersEndpoint: "/activity_answers",
    // Get former answers
    valueAnswersEndpoint: "/value_answers",

    // Messages
    dailyMessagesEndpoint: "/daily_message",

    // Media information
    mediaEndpoint: "/media/get",
    mediaAddEndpoint: "/media/add",

    // Allowed users roles
    allowedRoles: ["ROLE_USER"]
  };

  if (backendConfig.apiUrl === undefined) {
    console.warn(
      "No URI defined for the API! Set the environment variable VUE_APP_API_ROOT"
    );
  }
}
