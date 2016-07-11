import React, { PropTypes } from 'react';
import GiveKudo from '../components/GiveKudo';
import KudosList from '../components/KudosList';
import ErrorBanner from '../components/ErrorBanner';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions/actionCreators';


// Simple example of a React "smart" component
const KudosApp = (props) => {
  const { dispatch, kudosAppStore } = props;
  const actions = bindActionCreators(actionCreators, dispatch);
  const { createKudo } = actions;

  // TODO: add real app container element.
  return (
    <div>
      <ErrorBanner error={kudosAppStore.error} />
      <GiveKudo {...{ createKudo }} />
      <KudosList kudos={kudosAppStore.kudos} />
    </div>
  );
};

KudosApp.propTypes = {
  dispatch: PropTypes.func.isRequired,
  kudosAppStore: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  // Which part of the Redux global state does our component want to receive as props?
  return { kudosAppStore: state.kudosAppStore };
}

// Don't forget to actually use connect!
// Note that we don't export HelloWorld, but the redux "connected" version of it.
// See https://github.com/reactjs/react-redux/blob/master/docs/api.md#examples
export default connect(mapStateToProps)(KudosApp);
