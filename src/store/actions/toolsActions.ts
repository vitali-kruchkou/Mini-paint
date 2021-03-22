import { ToolType } from '../../type/types.d';
import {
  SET_FILL_COLOR,
  SET_LINE_WIDTH,
  SET_STROKE_COLOR,
  SET_TOOL,
} from './constans.d';

const setTool = (tool: ToolType) => {
  return {
    type: SET_TOOL,
    payload: tool,
  };
};

const setFillColor = (color: string) => {
  return {
    type: SET_FILL_COLOR,
    payload: color,
  };
};

const setStrokeColor = (color: string) => {
  return {
    type: SET_STROKE_COLOR,
    payload: color,
  };
};

const setLineWidth = (width: number) => {
  return {
    type: SET_LINE_WIDTH,
    payload: width,
  };
};

export default { setFillColor, setTool, setStrokeColor, setLineWidth };
