const iconPaths = {
  술: 'src/assets/icons/png/beer.png',
  카페인: 'src/assets/icons/png/coffee.png',
  액상과당: 'src/assets/icons/png/cola.png',
  인스턴트: 'src/assets/icons/png/instant.png',
  야식: 'src/assets/icons/png/pizza.png',
  기타: 'src/assets/icons/png/spoon.png',
  매운음식: 'src/assets/icons/png/pepper.png',
};

export const getIconPath = (name) => {
  return iconPaths[name];
};
