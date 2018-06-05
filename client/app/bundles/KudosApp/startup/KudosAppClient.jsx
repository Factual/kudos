import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import KudosApp from '../containers/KudosApp'
import Settings from '../containers/Settings'
import Header from '../components/Header'
import AppStore from '../stores/AppStore'

export default props => {
  AppStore.loadClientData(props)

  return (
    <Router>
      <div>
        <Header />
        <Route exact path="/" component={KudosApp} />
        <Route exact path="/settings" component={Settings} />
      </div>
    </Router>
  )
}
