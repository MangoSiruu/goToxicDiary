import React from 'react';
import { getIconPath } from '../../../utils/Icons/getIconPath';
import { BASE_URL } from '../../../api/instance';

function Icon({ input }) {
  const iconPath = BASE_URL + getIconPath(input);
  return <img src={iconPath} alt={input} />;
}

export default Icon;
