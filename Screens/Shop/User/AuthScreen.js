import React, { useEffect, useState } from 'react';
// import { AsyncStorage } from 'react-native';
import {
  ActivityIndicator,
  Alert,
  Button,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { Color } from '../../../Constant/Color';
import Input from '../../../Component/Input';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Authentication,
  LoginHandler,
  SignHandler,
} from '../../../Store/Actions/Auth';
import { useDispatch } from 'react-redux';
const AuthScreen = props => {
  const Dispatch = useDispatch();
  const [Toggle, setToggle] = useState(false);
  const [Error, setError] = useState(null);
  const [Loading, setLoading] = useState(false);
  // const [MainLoading, setMainLoading] = useState(false);
  const [Auth, setAuth] = useState({
    'E-Mail': '',
    Password: '',
  });
  // const AsyncStorage = useAsyncStorage();

  const Signup = async (email, password) => {
    setLoading(true);
    try {
      if (Toggle) await Dispatch(SignHandler(email, password));
      else await Dispatch(LoginHandler(email, password));
      return props.navigation.replace('ShopNavigator');
    } catch (err) {
      setError(err);
      Alert.alert('Error', err.message, [
        {
          text: 'Ok',
          style: 'cancel',
        },
      ]);
      setLoading(false);
    }
  };

  const InputHandler = (text, id) => {
    // console.log(id);
    setAuth(prev => {
      return {
        ...prev,
        [id]: text,
      };
    });
  };
  // if (MainLoading) {
  //   return (
  //     <View
  //       style={{
  //         flex: 1,
  //         justifyContent: 'center',
  //         alignItems: 'center',
  //       }}
  //     >
  //       <ActivityIndicator color={Color.accent} size={'large'} />
  //     </View>
  //   );
  //   // </ActivityIndicator>;
  // }

  return (
    <LinearGradient style={Styles.screen} colors={['#ffedff', '#ffe3ff']}>
      <KeyboardAvoidingView
        style={{
          padding: 15,
        }}
      >
        <ScrollView style={Styles.ScrollView}>
          <Input
            label="E-Mail"
            valid={true}
            InputHandler={InputHandler}
            text={Auth['E-Mail']}
            autoCapitalize="none"
            style={{
              marginBottom: 0,
              // padding: 0,
            }}
          />
          {/* <TextInput autoCapitalize='' /> */}
          <Input
            label="Password"
            valid={true}
            InputHandler={InputHandler}
            text={Auth.Password}
            autoCapitalize="none"
          />
          <View style={Styles.Button}>
            {Loading ? (
              <ActivityIndicator color={Color.accent} size={'large'} />
            ) : (
              <Button
                title={Toggle ? 'SignUp' : 'Login'}
                onPress={() => {
                  Signup(Auth['E-Mail'], Auth.Password);
                }}
                color={Color.primary}
              />
            )}
          </View>
          <View style={Styles.Button}>
            <Button
              title={`Go to ${Toggle ? 'Login' : 'SignUp'}`}
              onPress={() => {
                setToggle(!Toggle);
              }}
              color={Color.accent}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const Styles = StyleSheet.create({
  screen: {
    justifyContent: 'center',
    flex: 1,
    padding: 5,
    backgroundColor: '#22c1c3',
  },
  ScrollView: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  Button: {
    padding: 10,
  },
});

export default AuthScreen;
