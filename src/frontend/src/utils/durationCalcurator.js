/* eslint-disable no-shadow */
/* 일수 계산기 */
const durationCalculator = (startDate, endDate) => {
  const calculateDuration = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const differenceInTime = endDate.getTime() - startDate.getTime();
    const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24)); // 일수로 변환

    return differenceInDays;
  };
  return calculateDuration(startDate, endDate).toString();
};

export default durationCalculator;
