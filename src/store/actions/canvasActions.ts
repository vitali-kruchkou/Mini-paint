/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { PUSH_TO_REDO, PUSH_TO_UNDO, REDO, SET_REF, UNDO } from './constans.d';

const setRef = (canvasState: HTMLCanvasElement | null) => {
  return {
    type: SET_REF,
    payload: canvasState,
  };
};

const redo = () => {
  return {
    type: REDO,
  };
};

const undo = () => {
  return {
    type: UNDO,
  };
};

const pushToRedo = (data: string) => {
  return {
    type: PUSH_TO_REDO,
    payload: data,
  };
};

const pushToUndo = (data: string) => {
  return {
    type: PUSH_TO_UNDO,
    payload: data,
  };
};

export default { setRef, undo, pushToRedo, pushToUndo, redo };
