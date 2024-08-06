const iconPaths = {
  술: '/svg/beer.svg',
  카페인: '/svg/coffee.svg',
  액상과당: '/svg/cola.svg',
  인스턴트: '/svg/instant.svg',
  야식: '/svg/pizza.svg',
  기타: '/svg/spoon.svg',
  매운음식: '/svg/pepper.svg',
  로고: '/svg/mango_logo.svg',
  성공망고: '/svg/mango_success.svg',
  실패망고: '/svg/mango_fail.svg',
};

export const getIconPath = (name) => {
  return iconPaths[name] || '/svg/default.svg';
};
