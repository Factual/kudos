import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import KudosApp from '../containers/KudosApp'
import KudosPresentation from '../components/KudosPresentation'
import Settings from '../components/Settings'
import AppStore from '../stores/AppStore'

export default props => {
  AppStore.loadClientData(props)

  return (
    <Router>
      <div>
        <Route exact path="/" component={KudosApp} />
        <Route exact path="/settings" component={Settings} />
        <Route exact path="/present" component={KudosPresentation} />
      </div>
    </Router>
  )
}
