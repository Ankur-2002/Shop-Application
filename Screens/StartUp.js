import React, { useEffect } from 'react';
import { StyleSheet, ActivityIndicator, View } from 'react-native';
import Async from '@react-native-async-storage/async-storage';
import { Authentication } from '../Store/Actions/Auth';
import { useDispatch } from 'react-redux';
export const StartUp = props => {
  const Dispatch = useDispatch();
  const Login = async () => {
    // setMainLoading(true);
    try {
      const details = await Async.getItem('@userId');
      if (details) {
        let { userId, Token, expiry } = JSON.parse(details);
        console.log({
          userId,
          Token,
          expiry,
        });
        // console.log(userId);
        if (!Token || !userId + expiry < new Date().getTime())
          return props.navigation.replace('Auth');
        //   throw new Error('Something went wrong');
        await Dispatch(Authentication(userId, Token));
        return props.navigation.replace('ShopNavigator');
      }
      return props.navigation.replace('Auth');
    } catch (error) {
      props.navigation.replace('Auth');
    }
  };
  useEffect(() => {
    Login();
  }, []);
  return (
    <View style={Styles.screen}>
      <ActivityIndicator size={'large'} color={'red'} />
    </View>
  );
};

const Styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
