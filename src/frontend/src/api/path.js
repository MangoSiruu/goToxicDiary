export const endpoint = {
  AUTH: '/api/auth',
  USER: '/api/user',
  CALENDAR: '/api/calendar',
  REPORT: '/api/report',
};

export const getDynamicPoint = {
  CALENDAR_BY_DATE: (date) => `${endpoint.CALENDAR_BY_DATE}/${date}`,
};
