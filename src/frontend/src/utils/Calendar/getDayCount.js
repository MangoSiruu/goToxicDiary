import { getTodayDate } from './getTodayDate';

export default function getDayCount(endDate) {
  const today = new Date(getTodayDate());
  const end = new Date(endDate);

  const timeDifference = end - today;
  const dayDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

  return dayDifference;
}
