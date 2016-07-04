import { compose, createStore, applyMiddleware, combineReducers } from 'redux';
import stateInvariant from 'redux-immutable-state-invariant'

// See
// https://github.com/gaearon/redux-thunk and http://redux.js.org/docs/advanced/AsyncActions.html
// This is not actually used for this simple example, but you'd probably want to use this
// once your app has asynchronous actions.
import thunkMiddleware from 'redux-thunk';

// This provides an example of logging redux actions to the console.
// You'd want to disable this for production.
import loggerMiddleware from 'lib/middlewares/loggerMiddleware';

import reducers from '../reducers';
import { initialStates } from '../reducers';

export default props => {
  // This is how we get initial props Rails into redux.
  // const { name } = props;
  const { kudosAppState } = initialStates;

  // Redux expects to initialize the store using an Object, not an Immutable.Map
  const initialState = {
    kudosAppStore: kudosAppState
    // .merge({
    //   name,
    // }),
  };

  const middleware = [thunkMiddleware]
  if (process.env.NODE_ENV !== 'production') {
    middleware.push(stateInvariant())
    middleware.push(loggerMiddleware)
  }

  const reducer = combineReducers(reducers);
  const composedStore = compose(
    applyMiddleware(...middleware)
  );
  const storeCreator = composedStore(createStore);
  const store = storeCreator(reducer, initialState);

  return store;
};
