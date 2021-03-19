import {
  SET_FILL_COLOR,
  SET_LINE_WIDTH,
  SET_STROKE_COLOR,
  SET_TOOL,
} from '../actions/constans.d';
import { ToolsAction, ToolsState } from '../../type/types.d';

const initiaslState = {
  tool: undefined as undefined,
};

const currentTools = (
  state: ToolsState = initiaslState,
  action: ToolsAction,
) => {
  switch (action.type) {
    case SET_TOOL: {
      return {
        ...state,
        tool: action.payload,
      };
    }

    case SET_FILL_COLOR: {
      if (state.tool) {
        state.tool.fillColor = action.payload;
      }
      return state;
    }

    case SET_STROKE_COLOR: {
      if (state.tool) {
        state.tool.strokeColor = action.payload;
      }
      return state;
    }

    case SET_LINE_WIDTH: {
      if (state.tool) {
        state.tool.lineWidth = action.payload;
      }
      return state;
    }
    default:
      return state;
  }
};

export default currentTools;
