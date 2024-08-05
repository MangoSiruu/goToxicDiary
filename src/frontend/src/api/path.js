export const endpoint = {
  AUTH: '/api/auth',
  USER: '/api/user',
  CALENDAR: '/api/calendar',
  REPORT: '/api/report',
  CHALLENGE: '/api/challenge',
};

export const getDynamicPoint = {
  CALENDAR_BY_DATE: (date) => `${endpoint.CALENDAR}/${date}`,
  CHALLENGE_BY_ID: (id) => `${endpoint.CHALLENGE}/${id}`,
};
