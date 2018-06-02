import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { initialize } from '../actions/actionCreators';
import createStore from '../store/kudosAppStore';
import KudosApp from '../containers/KudosApp';
import Settings from '../containers/Settings';
import Header from '../components/Header';
import fetchEmail from '../actions/emailActions'

// See documentation for https://github.com/reactjs/react-redux.
// This is how you get props from the Rails view into the redux store.
// This code here binds your smart component to the redux store.

export default (props) => {
  const store = createStore(props)
  store.dispatch(initialize(props))
  store.dispatch(fetchEmail(props))

  const reactComponent = (
    <Provider store={store}>
      <Router>
        <div>
          <Header user={props.user} />
          <Route exact path="/" component={ KudosApp } />
          <Route exact path="/settings" component={ Settings } />
        </div>
      </Router>
    </Provider>
  );
  return reactComponent;
};
