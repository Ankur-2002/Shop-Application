import { Logins, Signup, Authenticate, LogoutAuth } from '../Actions/Auth';
const initial_state = {
  token: null,
  userId: null,
};

export const AuthReducer = (state = initial_state, action) => {
  switch (action.type) {
    case Authenticate:
      return {
        token: action.payload.token,
        userId: action.payload.userId,
      };
    case LogoutAuth:
      return initial_state;
    default:
      return state;
  }
};
