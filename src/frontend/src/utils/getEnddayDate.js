/* 종료 날짜 가져오기 */
const getEnddayDate = (start, duration) => {
    
    const startDate = new Date(start);
    let endDate = new Date(start);
    if (duration === '1주') {
    endDate.setDate(startDate.getDate() + 7);
    } else if (duration === '2주') {
    endDate.setDate(startDate.getDate() + 14);
    } else if (duration === '1달') {
    endDate.setMonth(startDate.getMonth() + 1);
    }
    return endDate.toISOString().split('T')[0];

};
  
export default getEnddayDate;
  