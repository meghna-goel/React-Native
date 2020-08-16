import { applyMiddleware, createStore, compose } from 'redux';
import thunkMiddleware from 'redux-thunk'
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import createHistory from 'history/createMemoryHistory';
import rootReducer from '../reducer';
import { routerMiddleware } from "connected-react-router";
import { composeWithDevTools } from 'redux-devtools-extension';

const initial_state = window.__REDUX_STATE_ ? window.__REDUX_STATE_ : undefined;

export const history = createHistory();
const composeEnhancers = composeWithDevTools({
  // Specify name here, actionsBlacklist, actionsCreators and other options if needed
});

const composeByEnv = () => {
  if(process.env.REACT_APP_MODE === "dev"){
    return composeEnhancers(applyMiddleware(routerMiddleware(history), thunkMiddleware, reduxImmutableStateInvariant()));
  } else {
    return compose(applyMiddleware(routerMiddleware(history), thunkMiddleware));
  }

};

const store = createStore(rootReducer(history), initial_state, composeByEnv());

export default store;
