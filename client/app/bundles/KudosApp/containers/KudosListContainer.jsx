import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchPage } from '../actions/tabActions';
import KudosList from '../components/KudosList'
import _ from 'lodash'

function mapStateToProps({ kudosAppStore }) {
  return _.pick(kudosAppStore, ['kudos', 'isFetchingKudos', 'totalKudos', 'currentTab'])
}

function mergeProps(stateProps, { dispatch }, ownProps) {
  const { currentTab, kudos } = stateProps
  return Object.assign({
    fetchPage: () => dispatch(fetchPage(currentTab, kudos.length))
  }, ownProps, _.omit(stateProps, ['currentTab']))
}

class KudosListContainer extends connect(mapStateToProps, null, mergeProps)(KudosList) {
}

export default KudosListContainer
