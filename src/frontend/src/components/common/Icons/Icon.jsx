import React from 'react';
import { getIconPath } from '../../../utils/Icons/getIconPath';

function Icon({ input }) {
  const iconPath = process.env.PUBLIC_URL + getIconPath(input);
  return <img src={iconPath} alt={input} />;
}

export default Icon;
