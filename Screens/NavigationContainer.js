import React, { useEffect } from 'react';
import { useRef } from 'react';
import { NavigationActions } from 'react-navigation';
import { useSelector } from 'react-redux';
import Shopnavigation from '../Navigations/Shopnavigation';
import { createNavigationContainerRef } from '@react-navigation/native';
const NavigationContainer = () => {
  const shop = createNavigationContainerRef();
  const store = useSelector(state => state.Auth.userId);
  // new
  useEffect(() => {
    if (!store)
      if (shop.isReady()) {
        shop.resetRoot({
          index: 0,
          routes: [{ name: 'Authentication' }],
        });
      }
  }, [store]);
  return <Shopnavigation refs={shop} />;
};

export default NavigationContainer;
