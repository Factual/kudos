import React, { PropTypes } from 'react';
import KudosListContainer from './KudosListContainer';
import ErrorBanner from '../components/ErrorBanner';
import KudoModalRenderer from '../components/KudoModalRenderer'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions/actionCreators';

// Simple example of a React "smart" component
const KudosApp = ({ kudos, error, createKudo, isFetchingKudos, totalKudos, activateModal }) => {
  return (
    <div>
      <ErrorBanner error={ error } />
      <KudoModalRenderer createKudo={ createKudo } activateModal={ activateModal }/>
      <KudosListContainer />
    </div>
  );
};

KudosApp.propTypes = {
  error: PropTypes.string,
  createKudo: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  // Which part of the Redux global state does our component want to receive as props?
  const { kudosAppStore } = state
  const { kudos, error, isFetchingKudos, totalKudos, activateModal } = kudosAppStore
  return { kudos, error, isFetchingKudos, totalKudos, activateModal }
}

function mapDispatchToProps(dispatch) {
  const actions = bindActionCreators(actionCreators, dispatch);
  const { createKudo } = actions
  return { createKudo }
}

// Don't forget to actually use connect!
// Note that we don't export HelloWorld, but the redux "connected" version of it.
// See https://github.com/reactjs/react-redux/blob/master/docs/api.md#examples
export default connect(mapStateToProps, mapDispatchToProps)(KudosApp);
