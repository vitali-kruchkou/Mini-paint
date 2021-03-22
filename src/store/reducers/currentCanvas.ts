import {
  PUSH_TO_REDO,
  PUSH_TO_UNDO,
  REDO,
  SET_REF,
  UNDO,
} from '@store/actions/constans.d';
import { CanvasActions, CanvasState } from 'type/types';

const initialState = {
  canvasRef: null as null,
  undo: [] as string[],
  redo: [] as string[],
};

const currentCanvas = (
  state: CanvasState = initialState,
  action: CanvasActions,
) => {
  switch (action.type) {
    case SET_REF: {
      return {
        ...state,
        canvasRef: action.payload,
      };
    }

    case PUSH_TO_REDO: {
      return {
        ...state,
        redo: [...state.redo, action.payload],
      };
    }

    case PUSH_TO_UNDO: {
      return {
        ...state,
        redo: [...state.undo, action.payload],
      };
    }

    case REDO: {
      const canvas: CanvasRenderingContext2D | null = state.canvasRef.getContext(
        '2d',
      );
      canvas.globalCompositeOperation = 'source-over';
      if (state.undo.length > 0) {
        const dataUrl = state.undo.pop();
        state.redo.push(state.canvasRef.toDataURL());
        const img = new Image();
        img.src = dataUrl;
        img.onload = () => {
          canvas?.clearRect(
            0,
            0,
            state.canvasRef.width,
            state.canvasRef.height,
          );
          canvas?.drawImage(
            img,
            0,
            0,
            state.canvasRef.width,
            state.canvasRef.height,
          );
        };
      }
      return {
        ...state,
      };
    }

    case UNDO: {
      const canvas: CanvasRenderingContext2D | null = state.canvasRef.getContext(
        '2d',
      );
      canvas.globalCompositeOperation = 'source-over';
      if (state.redo.length > 0) {
        const dataUrl = state.redo.pop();
        state.undo.push(state.canvasRef.toDataURL());
        const img = new Image();
        img.src = dataUrl;
        img.onload = () => {
          canvas?.clearRect(
            0,
            0,
            state.canvasRef.width,
            state.canvasRef.height,
          );
          canvas?.drawImage(
            img,
            0,
            0,
            state.canvasRef.width,
            state.canvasRef.height,
          );
        };
      }

      return {
        ...state,
      };
    }

    default:
      return state;
  }
};

export default currentCanvas;
