import React from 'react';
import { HeaderButton } from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons';
const HeaderButtons = props => {
  // <Ionicons name="chec" />;
  return <HeaderButton IconComponent={Ionicons} iconSize={20} {...props} />;
};

export default HeaderButtons;
