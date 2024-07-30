import React from 'react';
import { getIconPath } from '../../../utils/Icons/getIconPath';


const Icon = ({ input }) => {
  const iconPath = getIconPath(input);
  return <img src={iconPath} alt={input} />;
};

export default Icon;
