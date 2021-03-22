import { combineReducers } from 'redux';
import currentCanvas from './currentCanvas';
import currentTools from './currentTools';
const rootReducer = combineReducers({
  currentCanvas,
  currentTools,
});

export default rootReducer;
