import React, { PropTypes } from 'react';
import Settings from '../components/Settings';
import ErrorBanner from '../components/ErrorBanner';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import * as actionCreators from '../actions/actionCreators';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { toggleEmailNotifications } from '../actions/actionCreators';


function mapStateToProps({ kudosAppStore }) {
  console.log('test')
  const { user: { name, id, email_notifications } } = kudosAppStore
  return {
    name,
    id,
    email_notifications
  }
}


const mapDispatchToProps = (dispatch) => {
    return {
//      subscribe: dispatch(toggleEmailNotifications(true)),
//      unsubscribe: dispatch(toggleEmailNotifications(false))
//      likeKudo: thumbKudo(dispatch, true, id, name),
//      unlikeKudo: thumbKudo(dispatch, false, id, name)
//      onClick: dispatch(toggleEmailNotifications(email_notifications))
    }
}

const SettingsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings)

export default SettingsContainer
