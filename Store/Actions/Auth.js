export const Signup = 'SIGNUP';
export const Logins = 'LOGIN';
export const Authenticate = 'Authenticate';
export const LogoutAuth = 'LogoutAuth';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const Authentication = (userId, Token, expiry) => {
  if (!userId && !Token) throw new Error('Something went wrong');
  return {
    type: Authenticate,
    payload: {
      userId,
      token: Token,
      expiry,
    },
  };
};

export const Logout = () => {
  return async dispatch => {
    await AsyncStorage.clear();
    return await dispatch({
      type: LogoutAuth,
    });
  };
};

export const SignHandler = (email, password) => {
  //   console.log(email, password);
  return async dispatch => {
    // const AsyncStorage = useAsyncStorage();
    const Auth = await fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA8qCzC7JYdTmlqdvqe2VUz7ecidKcQo2s',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      }
    );

    if (!Auth.ok) {
      const error = await Auth.json();
      console.log(error, 'Eroor');
      throw new Error(error.error.message);
    }
    const data = await Auth.json();
    let expiry = new Date(new Date().getTime() + +data.expiresIn * 1000);
    const set = await AsyncStorage.setItem(
      '@userId',
      JSON.stringify({
        userId: data.localId,
        Token: data.idToken,
        expiry: +expiry.getTime(),
      })
    );

    console.log(set);
    // console.log(data, 'Auth');
    return await dispatch({
      type: Authenticate,
      payload: {
        token: data.idToken,
        userId: data.localId,
      },
    });
  };
};

export const LoginHandler = (email, password) => {
  return async dispatch => {
    // const AsyncStorage = useAsyncStorage();
    const Login = await fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA8qCzC7JYdTmlqdvqe2VUz7ecidKcQo2s',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      }
    );
    if (!Login.ok) {
      const error = await Login.json();
      console.log(error, 'Eroor');
      throw new Error(error.error.message);
    }
    const Data = await Login.json();
    console.log(Data);
    let expiry = new Date(
      new Date().getTime() + parseInt(+Data.expiresIn * 1000)
    );
    const set = await AsyncStorage.setItem(
      '@userId',
      JSON.stringify({
        userId: Data.localId,
        Token: Data.idToken,
        expiry: +expiry.getTime(),
      })
    );

    return await dispatch({
      type: Authenticate,
      payload: {
        token: Data.idToken,
        userId: Data.localId,
      },
    });
  };
};
