import React, { PropTypes } from 'react'
import TabBarContainer from '../containers/TabBarContainer'
import Kudo from './Kudo'
import injectTapEventPlugin from 'react-tap-event-plugin'
import BottomScrollListener from 'react-bottom-scroll-listener'

injectTapEventPlugin()

const List = ({ userId, kudos, likeKudo, unlikeKudo, updateKudo, isFetchingKudos }) => (
  <div className="kudos-list">
    {kudos.length === 0 && !isFetchingKudos
      ? 'No kudos'
      : kudos.map(kudo => (
          <Kudo
            id={kudo.id}
            colorClass={kudo.colorClass}
            userId={userId}
            key={kudo.id}
            kudo={kudo}
            likeKudo={likeKudo}
            unlikeKudo={unlikeKudo}
            updateKudo={updateKudo}
          />
        ))}
  </div>
)

const Spinner = () => (
  <div className="kudos-list__fetching-container">
    <i className="fas fa-spin fa-spinner fa-5x" aria-hidden="true" />
  </div>
)

export default class KudosList extends React.Component {
  static propTypes = {
    kudos: PropTypes.array.isRequired,
    id: PropTypes.string.isRequired,
    isFetchingKudos: PropTypes.bool.isRequired,
    totalKudos: PropTypes.number.isRequired,
    fetchPage: PropTypes.func.isRequired,
    likeKudo: PropTypes.func.isRequired,
    unlikeKudo: PropTypes.func.isRequired,
    updateKudo: PropTypes.func.isRequired,
  }

  constructor(props, context) {
    super(props, context)
  }

  areMoreKudos = () => {
    return this.props.totalKudos > this.props.kudos.length
  }

  loadMoreKudos = () => {
    if (this.areMoreKudos() && !this.props.isFetchingKudos) {
      this.props.fetchPage()
    }
  }

  render() {
    const { id, kudos, likeKudo, unlikeKudo, updateKudo, isFetchingKudos } = this.props
    return (
      <div className="kudos-list__container">
        <TabBarContainer />
        <List
          userId={id}
          kudos={kudos}
          likeKudo={likeKudo}
          unlikeKudo={unlikeKudo}
          updateKudo={updateKudo}
          isFetchingKudos={isFetchingKudos}
        />
        {isFetchingKudos ? <Spinner /> : null}
        <BottomScrollListener offset={200} onBottom={this.loadMoreKudos} />
      </div>
    )
  }
}
