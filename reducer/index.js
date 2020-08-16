import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router';
import { music } from './music.reducer';

const rootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    music
  });

  export default rootReducer;
