import React, { PropTypes } from 'react'
import GiveKudo from '../components/GiveKudo'
import KudosListContainer from './KudosListContainer'
import ErrorBanner from '../components/ErrorBanner'
import Header from '../components/Header'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actionCreators from '../actions/actionCreators'

// Simple example of a React "smart" component
const KudosApp = ({ user, kudos, error, createKudo, isFetchingKudos, totalKudos }) => {
  return (
    <div>
      <Header user={user} />
      <ErrorBanner error={error} />
      <GiveKudo createKudo={createKudo} />
      <KudosListContainer />
    </div>
  )
}

KudosApp.propTypes = {
  error: PropTypes.string,
  createKudo: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
  // Which part of the Redux global state does our component want to receive as props?
  const { kudosAppStore } = state
  const { user, kudos, error, isFetchingKudos, totalKudos } = kudosAppStore
  return { user, kudos, error, isFetchingKudos, totalKudos }
}

function mapDispatchToProps(dispatch) {
  const actions = bindActionCreators(actionCreators, dispatch)
  const { createKudo } = actions
  return { createKudo }
}

// Don't forget to actually use connect!
// Note that we don't export HelloWorld, but the redux "connected" version of it.
// See https://github.com/reactjs/react-redux/blob/master/docs/api.md#examples
export default connect(mapStateToProps, mapDispatchToProps)(KudosApp)
