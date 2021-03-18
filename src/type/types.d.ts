import Brush from 'modules/Tools/Brush';
import Circle from 'modules/Tools/Circle';
import Line from 'modules/Tools/Line';
import Rectangle from 'modules/Tools/Rectangle';

export const SET_REF = 'SET_REF';
export const PUSH_TO_UNDO = 'PUSH_TO_UNDO';
export const PUSH_TO_REDO = 'PUSH_TO_REDO';
export const UNDO = 'UNDO';
export const REDO = 'REDO';

export const SET_TOOL = 'SET_TOOL';
export const SET_FILL_COLOR = 'SET_FILL_COLOR';
export const SET_STROKE_COLOR = 'SET_STROKE_COLOR';
export const SET_LINE_WIDTH = 'SET_LINE_WIDTH';

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

export type ToolType = Brush | Rectangle | Circle | Line;

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
