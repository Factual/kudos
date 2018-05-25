import React, { PropTypes } from 'react'
import TabBarContainer from '../containers/TabBarContainer'
import Kudo from './Kudo'
import _ from 'lodash'
import injectTapEventPlugin from 'react-tap-event-plugin'

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
    _.bindAll(this, 'areMoreKudos', 'handleScroll')
  }

  areMoreKudos() {
    return this.props.totalKudos > this.props.kudos.length
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

    if (isAtBottom && this.areMoreKudos() && !this.props.isFetchingKudos) {
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
      </div>
    )
  }
}
