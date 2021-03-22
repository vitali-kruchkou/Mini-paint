import { combineReducers } from 'redux';
import currentCanvas from './currentCanvas';
import currentTools from './currentTools';
import currentAuth from './currentAuth';
const rootReducer = combineReducers({
  currentCanvas,
  currentTools,
  currentAuth,
});

export default rootReducer;
