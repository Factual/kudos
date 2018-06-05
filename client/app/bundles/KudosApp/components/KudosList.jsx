import _ from 'lodash'
import React, { PropTypes } from 'react'
import { observer } from 'mobx-react'
import injectTapEventPlugin from 'react-tap-event-plugin'
import AppStore from '../stores/AppStore'
import TabBar from '../components/TabBar'
import Kudo from './Kudo'

injectTapEventPlugin()

@observer
export class KudosList extends React.Component {
  constructor(props, context) {
    super(props, context)
    _.bindAll(this, 'handleScroll')
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll(event) {
    const isAtBottom =
      event.srcElement.body.scrollTop + window.innerHeight == document.body.offsetHeight

    if (isAtBottom && AppStore.kudosStore.canLoadMore() && !AppStore.kudosStore.isFetchingKudos) {
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
        {AppStore.kudosStore.isFetchingKudos ? <Spinner /> : null}
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
                likes={kudo.likes}
                likeKudo={id => () => AppStore.kudosStore.likeKudo(id)}
                unlikeKudo={id => () => AppStore.kudosStore.unlikeKudo(id)}
                updateKudo={AppStore.kudosStore.editKudo}
              />
            ))}
      </div>
    )
  }
}

const Spinner = () => (
  <div className="kudos-list__fetching-container">
    <i className="fas fa-spin fa-spinner fa-5x" aria-hidden="true" />
  </div>
)

export default KudosList
