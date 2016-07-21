import React, { PropTypes } from 'react';
import GiveKudo from '../components/GiveKudo';
import KudosList from '../components/KudosList';
import ErrorBanner from '../components/ErrorBanner';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions/actionCreators';


// Simple example of a React "smart" component
const KudosApp = ({ kudos, error, createKudo, isFetchingKudos }) => {
  return (
    <div className="kudo-pane">
      <ErrorBanner error={ error } />
      <GiveKudo {...{ createKudo }} />
      <KudosList {...{ kudos, isFetchingKudos }} />
    </div>
  );
};

KudosApp.propTypes = {
  kudos: PropTypes.array.isRequired,
  error: PropTypes.string,
  isFetchingKudos: PropTypes.bool.isRequired,
  createKudo: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  // Which part of the Redux global state does our component want to receive as props?
  const { kudosAppStore } = state
  const { kudos, error, isFetchingKudos } = kudosAppStore
  return { kudos, error, isFetchingKudos }
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
