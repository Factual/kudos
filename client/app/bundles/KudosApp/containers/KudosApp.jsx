import React, { PropTypes } from 'react'
import GiveKudo from '../components/GiveKudo'
import KudosList from '../components/KudosList'
import ErrorBanner from '../components/ErrorBanner'
import Header from '../components/Header'

export default class KudosApp extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <ErrorBanner />
        <GiveKudo />
        <KudosList />
      </div>
    )
  }
}
