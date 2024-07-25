export const endpoint = {
  AUTH: '/auth',
  USER: '/user',
  CALENDAR: '/calendar',
  REPORT: '/report',
};

export const getDynamicPoint = {
  CALENDAR_BY_DATE: (date) => `${endpoint.CALENDAR_BY_DATE}/${date}`,
};
