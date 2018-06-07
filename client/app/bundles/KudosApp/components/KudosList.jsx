import _ from 'lodash'
import React, { PropTypes } from 'react'
import { observer } from 'mobx-react'
import injectTapEventPlugin from 'react-tap-event-plugin'
import BottomScrollListener from 'react-bottom-scroll-listener'
import AppStore from '../stores/AppStore'
import TabBar from '../components/TabBar'
import Kudo from './Kudo'

injectTapEventPlugin()

@observer
export class KudosList extends React.Component {
  loadMoreKudos = () => {
    if (AppStore.kudosStore.canLoadMore && !AppStore.kudosStore.isFetchingKudos) {
      AppStore.kudosStore.fetchKudos()
    }
  }

  render() {
    return (
      <div className="kudos-list__container">
        <TabBar />
        <List
          user={AppStore.user}
          kudos={AppStore.kudosStore.kudos}
          isFetchingKudos={AppStore.kudosStore.isFetchingKudos}
        />
        <div className="kudos-list__fetching-container">
          {AppStore.kudosStore.isFetchingKudos ? (
            <Spinner />
          ) : (
            <LoadMore onClick={this.loadMoreKudos} />
          )}
        </div>
      </div>
    )
  }
}

export class List extends React.Component {
  render() {
    return (
      <div className="kudos-list">
        {this.props.kudos.length === 0 && !this.props.isFetchingKudos
          ? 'No kudos'
          : this.props.kudos.map(kudo => (
              <Kudo
                id={kudo.id}
                colorClass={kudo.colorClass}
                userId={this.props.user.id}
                key={kudo.id}
                kudo={kudo}
                likeKudo={id => () => AppStore.kudosStore.likeKudo(id)}
                unlikeKudo={id => () => AppStore.kudosStore.unlikeKudo(id)}
                updateKudo={message => AppStore.kudosStore.editKudo(kudo.id, message)}
              />
            ))}
      </div>
    )
  }
}

const LoadMore = ({ onClick }) => <a onClick={onClick}>Load more...</a>

const Spinner = () => <i className="fas fa-spin fa-spinner fa-5x" aria-hidden="true" />

export default KudosList
