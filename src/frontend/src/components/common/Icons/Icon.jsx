import React from 'react';
import { getIconPath } from '../../../utils/Icons/getIconPath';

function Icon({ input }) {
  return <img src={getIconPath(input)} alt={input} />;
}

export default Icon;
