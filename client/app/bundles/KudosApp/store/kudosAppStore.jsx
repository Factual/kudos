import { compose, createStore, applyMiddleware, combineReducers } from 'redux';
import stateInvariant from 'redux-immutable-state-invariant'
import { setActiveTab } from '../actions/tabActions'

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
  let { kudosAppState } = initialStates;
  kudosAppState.kudos = props.kudos;

  const initialState = {
    kudosAppStore: kudosAppState
  };

  const middleware = [thunkMiddleware]
  if (process.env.NODE_ENV !== 'production') {
    middleware.push(stateInvariant())
    middleware.push(loggerMiddleware)
  }

  const reducer = combineReducers(reducers);
  const composedStore = compose(
    applyMiddleware(...middleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f // detect devtools extension
  );
  const storeCreator = composedStore(createStore);
  const store = storeCreator(reducer, initialState);

  // Load data and select initial tab
  store.dispatch(setActiveTab('Recent'))

  return store;
};
