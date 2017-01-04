import React from 'react';
import { Provider } from 'react-redux';

import { initialize } from '../actions/actionCreators';
import createStore from '../store/kudosAppStore';
import KudosApp from '../containers/KudosApp';

// See documentation for https://github.com/reactjs/react-redux.
// This is how you get props from the Rails view into the redux store.
// This code here binds your smart component to the redux store.
export default (props) => {
  const store = createStore(props)
  store.dispatch(initialize(props))
  const reactComponent = (
    <Provider store={store}>
      <KudosApp />
    </Provider>
  );
  return reactComponent;
};
