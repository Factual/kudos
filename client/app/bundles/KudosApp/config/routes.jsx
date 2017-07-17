import React from 'react'
import { BrowserRouter, Route, IndexRoute } from 'react-router-dom'
// var ReactRouter = require('react-router');
// var hashHistory = ReactRouter.hashHistory;
import KudosApp from '../containers/KudosApp';
import SettingsContainer from '../containers/SettingsContainer';

// window.history = hashHistory

console.log(SettingsContainer)

const routes = (
  <BrowserRouter>
    <div>
      <Route exact path="/" component={KudosApp} />
      <Route exact path="/settings" component={SettingsContainer} />
    </div>
  </BrowserRouter>
)

export default routes
