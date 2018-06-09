import React, { PropTypes } from 'react'
import GiveKudo from '../components/GiveKudo'
import KudosList from '../components/KudosList'
import ErrorBanner from '../components/ErrorBanner'

export default class KudosApp extends React.Component {
  render() {
    return (
      <div>
        <ErrorBanner />
        <GiveKudo />
        <KudosList />
      </div>
    )
  }
}
