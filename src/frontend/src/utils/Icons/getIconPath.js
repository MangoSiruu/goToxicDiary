const iconPaths = {
  술: 'src/assets/icons/svg/beer.svg',
  카페인: 'src/assets/icons/svg/coffee.svg',
  액상과당: 'src/assets/icons/svg/cola.svg',
  인스턴트: 'src/assets/icons/svg/instant.svg',
  야식: 'src/assets/icons/svg/pizza.svg',
  기타: 'src/assets/icons/svg/spoon.svg',
  매운음식: 'src/assets/icons/svg/pepper.svg',
  로고: 'src/assets/icons/svg/mango_logo.svg',
};

export const getIconPath = (name) => {
  return iconPaths[name] || 'src/assets/icons/svg/default.svg';
};
