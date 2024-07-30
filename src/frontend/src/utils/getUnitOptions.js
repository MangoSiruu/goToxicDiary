export const getUnitOption = (category) => {
  switch (category) {
    case '🍺 술':
      return '병';
    case '🍔 인스턴트':
      return '회';
    case '🌶️ 매운 음식':
      return '회';
    case '☕ 카페인':
      return '잔';
    case '🍕야식':
      return '회';
    case '🥤액상과당':
      return '캔';
    case '🍴기타':
      return '회';
    default:
      return '회';
  }
};
