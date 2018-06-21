import React, { PropTypes } from 'react'
import KudosList from '../components/KudosList'
import ErrorBanner from '../components/ErrorBanner'
import Header from '../components/Header'
import KudoModalRenderer from "../components/KudoModalRenderer";

export default class KudosApp extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <ErrorBanner />
        <KudoModalRenderer />
        <KudosList />
      </div>
    )
  }
}
