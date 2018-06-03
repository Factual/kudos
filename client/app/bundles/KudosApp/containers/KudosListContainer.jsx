import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import request from 'axios'
import { bindActionCreators } from 'redux'
import { addLike, failedLike, removeLike, editKudo } from '../actions/actionCreators'
import { fetchPage } from '../actions/tabActions'
import KudosList from '../components/KudosList'
import { omit, last, get } from 'lodash'

const thumbKudo = (dispatch, up = true, giverId, giverName) => kudoId => () => {
  request({
    method: 'POST',
    url: `/${up ? 'like' : 'unlike'}`,
    responseType: 'json',
    data: {
      kudo_id: kudoId,
    },
  })
    .then(res => {
      const action = up ? addLike : removeLike
      dispatch(action(kudoId, giverId, giverName))
    })
    .catch(err => {
      dispatch(failedLike(err))
    })
}

function mapStateToProps({ kudosAppStore }) {
  const {
    kudos,
    isFetchingKudos,
    totalKudos,
    currentTab,
    user: { id },
  } = kudosAppStore
  return {
    kudos,
    isFetchingKudos,
    totalKudos,
    currentTab,
    id,
  }
}

function mergeProps(stateProps, { dispatch }, ownProps) {
  const { currentTab, kudos, name, id } = stateProps
  const cursor = last(kudos)
  const cursor_time = get(cursor, 'created_at')
  const cursor_id = get(cursor, 'id')

  return Object.assign(
    {
      likeKudo: thumbKudo(dispatch, true, id, name),
      unlikeKudo: thumbKudo(dispatch, false, id, name),
      updateKudo: bindActionCreators(editKudo, dispatch),
      fetchPage: () => dispatch(fetchPage(currentTab, cursor_time, cursor_id)),
    },
    ownProps,
    omit(stateProps, ['currentTab'])
  )
}

class KudosListContainer extends connect(mapStateToProps, null, mergeProps)(KudosList) {}

export default KudosListContainer
