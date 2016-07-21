import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setActiveTab } from '../actions/tabActions';
import TabBar from '../components/TabBar'

function mapStateToProps({ kudosAppStore }) {
  return { currentTab: kudosAppStore.currentTab };
}

function mapDispatchToProps(dispatch) {
  return { setActiveTab: newActiveTab => dispatch(setActiveTab(newActiveTab)) }
}

class TabBarContainer extends connect(mapStateToProps, mapDispatchToProps)(TabBar) {
}

export default TabBarContainer

