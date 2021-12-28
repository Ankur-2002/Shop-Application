import { Provider, useSelector } from 'react-redux';
import { useRef } from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
// import { View, Text } from 'react-native';
import { ProductReducer } from './Store/Reducer/Production';
import React, { useState } from 'react';
import * as Font from 'expo-font';

import thunk from 'redux-thunk';
import AppLoading from 'expo-app-loading';
// import Shopnavigation from './Navigations/Shopnavigation';
import { CartReducer } from './Store/Reducer/Cart';
// import { View, Text } from 'react-native';
import { OrderReducer } from './Store/Reducer/Order';
import { AuthReducer } from './Store/Reducer/Auth';
import NavigationContainer from './Screens/NavigationContainer';
const Fonts = Font.loadAsync({
  'open-sans-bold': require('./assets/fonts/Open-Sans-Bold.ttf'),
  'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
});
const RootRuducor = combineReducers({
  Product: ProductReducer,
  Order: OrderReducer,
  Cart: CartReducer,
  Auth: AuthReducer,
});
const store = createStore(RootRuducor, applyMiddleware(thunk));
export default function App() {
  const [Font, setFont] = useState(true);

  if (Font) {
    return (
      <AppLoading
        startAsync={Fonts}
        onFinish={() => {
          setFont(false);
        }}
        onError={console.warn}
      />
    );
  } else {
    return (
      <Provider store={store}>
        <NavigationContainer />
      </Provider>
    );
  }
}
