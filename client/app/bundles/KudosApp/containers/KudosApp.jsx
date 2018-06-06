import React, { PropTypes } from 'react'
import KudosListContainer from './KudosListContainer'
import ErrorBanner from '../components/ErrorBanner'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actionCreators from '../actions/actionCreators'
import KudoModalRenderer from '../components/KudoModalRenderer'
import { modalSwitch } from '../actions/modalActions'
import ModalCover from "../components/ModalCover";

// Simple example of a React "smart" component
const KudosApp = ({ kudos, error, createKudo, modalSwitch, isFetchingKudos, totalKudos, showModal, allUsers }) => {
  return (
    <div>
      <ModalCover showModal={ showModal }/>
      <ErrorBanner error={ error } />
      <KudoModalRenderer createKudo={ createKudo }
                         modalSwitch={ modalSwitch }
                         showModal={ showModal }
                         allUsers={allUsers}/>
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
  const { kudos, error, isFetchingKudos, totalKudos, showModal, allUsers } = kudosAppStore
  return { kudos, error, isFetchingKudos, totalKudos, showModal, allUsers }
}

function mapDispatchToProps(dispatch) {
  const actions = bindActionCreators(actionCreators, dispatch);
  const { createKudo } = actions;
  const boundModalSwitch = showModal => dispatch(modalSwitch(showModal))
  return {
    createKudo: createKudo,
    modalSwitch: boundModalSwitch,
  }
}

// Don't forget to actually use connect!
// Note that we don't export HelloWorld, but the redux "connected" version of it.
// See https://github.com/reactjs/react-redux/blob/master/docs/api.md#examples
export default connect(mapStateToProps, mapDispatchToProps)(KudosApp)
