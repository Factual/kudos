import React, { PropTypes } from 'react'
import KudosList from '../components/KudosList'
import ErrorBanner from '../components/ErrorBanner'
import Header from '../components/Header'
import KudoModalRenderer from '../components/KudoModalRenderer'
import ModalCover from '../components/ModalCover'

export default class KudosApp extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <ModalCover />
        <ErrorBanner />
        <KudoModalRenderer />
        <KudosList />
      </div>
    )
  }
}
