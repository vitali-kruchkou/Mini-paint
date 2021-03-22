import Brush from 'modules/Canvas/Toolbar/Tools/Brush';
import Circle from 'modules/Canvas/Toolbar/Tools/Circle';
import Line from 'modules/Canvas/Toolbar/Tools/Line';
import Rectangle from 'modules/Canvas/Toolbar/Tools/Rectangle';
import ClearAll from 'modules/Canvas/Toolbar/Tools/ClearAll';
import {
  PUSH_TO_REDO,
  PUSH_TO_UNDO,
  REDO,
  SET_REF,
  UNDO,
  SIGN_IN,
  SIGN_OUT,
  RESET_PASSW,
  SIGN_UP,
} from 'store/actions/constans';
import { ThunkAction } from 'redux-thunk';
import auth from '../firebase/index';

export type CanvasState = {
  canvasRef: HTMLCanvasElement | null;
  undo: string[];
  redo: string[];
};

export type ToolsState = {
  tool?: ToolType;
};

export type CanvasActions =
  | {
      type: typeof SET_REF;
      payload: HTMLCanvasElement | null;
    }
  | {
      type: typeof PUSH_TO_REDO;
      payload: string;
    }
  | {
      type: typeof PUSH_TO_UNDO;
      payload: string;
    }
  | {
      type: typeof REDO;
    }
  | {
      type: typeof UNDO;
    };

export type ToolType = Brush | Rectangle | Circle | Line | Eraser | ClearAll;

export type ToolsAction =
  | {
      type: typeof SET_TOOL;
      payload: ToolType;
    }
  | {
      type: typeof SET_FILL_COLOR;
      payload: string;
    }
  | {
      type: typeof SET_STROKE_COLOR;
      payload: string;
    }
  | {
      type: typeof SET_LINE_WIDTH;
      payload: number;
    };

export type User = {
  email: string;
  uid: string;
};

export type AuthActions =
  | {
      type: typeof SIGN_IN;
      payload: User | null;
    }
  | {
      type: typeof SIGN_UP;
      payload: User | null;
    }
  | {
      type: typeof RESET_PASSW;
    }
  | {
      type: typeof SIGN_OUT;
    };

export type AuthState = {
  login: boolean;
  user: User | null;
};

export type AppDispatch = typeof store.dispatch;
