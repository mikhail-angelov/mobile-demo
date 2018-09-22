import {
  AUTH_USER,
  DEAUTH_USER,
  AUTH_ERROR,
  SIGN_UP_ERROR
} from "../constants/actions";

export const initialState = {
  name: "",
  authError: "",
  signUpError: "",
  authenticated: false
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_USER: {
      const username = action.payload;
      return {
        ...state,
        authenticated: true,
        authError: "",
        username
      };
    }
    case AUTH_ERROR: {
      return {
        ...state,
        authenticated: false,
        authError: action.payload
      };
    }
    case DEAUTH_USER: {
      return {
        ...state,
        bootstrapped: true,
        authenticated: false,
        error: action.payload
      };
    }
    case SIGN_UP_ERROR: {
      return {
        ...state,
        authenticated: false,
        signUpError: action.payload
      };
    }
    default:
      return state;
  }
};

export default auth;
