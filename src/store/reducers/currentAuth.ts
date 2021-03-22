import {
  RESET_PASSW,
  SIGN_IN,
  SIGN_OUT,
  SIGN_UP,
} from '@store/actions/constans.d';
import { AuthActions, AuthState } from 'type/types';

const initialState = {
  login: false,
  user: null as any,
};

const currentAuth = (state: AuthState = initialState, action: AuthActions) => {
  switch (action.type) {
    case SIGN_IN: {
      return {
        ...state,
        login: true,
        user: action.payload,
      };
    }
    case SIGN_OUT: {
      return {
        ...state,
        login: false,
        user: null,
      };
    }
    case RESET_PASSW: {
      return {
        ...state,
        login: false,
      };
    }
    case SIGN_UP: {
      return {
        ...state,
        login: true,
        user: action.payload,
      };
    }
    default:
      return state;
  }
};

export default currentAuth;
