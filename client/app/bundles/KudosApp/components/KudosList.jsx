import React, { PropTypes } from 'react';
import TabBarContainer from '../containers/TabBarContainer';
import _ from 'lodash';
import moment from 'moment';
import { grey400, lightBlue400 } from 'material-ui/styles/colors';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ThumbUp from 'material-ui/svg-icons/action/thumb-up';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

function likedBySelf(likes, giverId) {
  let match = false
  
  _.forEach(likes, val => {
    if (val.giver_id === giverId) {
      match = true
      return
    }
  })

  return match
}

const Kudo = ({ id, giverId, kudo, likeKudo, unlikeKudo }) => {
  const timestamp = moment.parseZone(kudo.given_at);
  const formattedTimestamp = `At ${timestamp.format('h:mm a')} on ${timestamp.format('MMM D, YYYY')}`
  const numLikes = kudo.likes.length
  const likeText = `${ numLikes > 0 ? `${numLikes} ${numLikes === 1 ? 'person likes': 'people like'} this` : ''}`

  let thumbColor = grey400
  let likeAction = likeKudo(id)
  if (likedBySelf(kudo.likes, giverId)) {
    thumbColor = lightBlue400
    likeAction = unlikeKudo(id)
  }

  return <div className="kudo">
    <h4 className="list-group-item-heading">Kudos, {kudo.receiver}!</h4>
    <div className="kudo__receiver">
      <img src={kudo.receiver_avatar} alt={kudo.receiver} className="kudo__avatar" />
    </div>
    <div className="kudo__message">
      <blockquote className="blockquote">
        {kudo.body}
        <footer className="blockquote-footer">{kudo.giver}</footer>
      </blockquote>
    </div>
    <FloatingActionButton onClick={likeAction} mini={true} backgroundColor={ thumbColor }>
      <ThumbUp/>
    </FloatingActionButton>
    <div>{likeText}</div>
    <div className="kudo__timestamp">
      {formattedTimestamp}
    </div>
  </div>
}

const List = ({ giverId, kudos, likeKudo, unlikeKudo }) => {
  return <div className="kudos-list">
    { kudos.length > 0 ? kudos.map(kudo => <Kudo id={kudo.id} giverId={giverId} key={kudo.id} kudo={kudo} likeKudo={likeKudo} unlikeKudo={unlikeKudo}/>) : 'No kudos' }
  </div>
}

const Spinner = () => <div className="kudos-list__fetching-container">
  <i className="fa fa-spin fa-spinner fa-5x" aria-hidden="true"></i>
</div>

export default class KudosList extends React.Component {
  static propTypes = {
    kudos: PropTypes.array.isRequired,
    id: PropTypes.string.isRequired,
    isFetchingKudos: PropTypes.bool.isRequired,
    totalKudos: PropTypes.number.isRequired,
    fetchPage: PropTypes.func.isRequired,
    likeKudo: PropTypes.func.isRequired,
    unlikeKudo: PropTypes.func.isRequired
  }

  constructor(props, context) {
    super(props, context);
    _.bindAll(this, 'areMoreKudos', 'handleScroll');
  }

  areMoreKudos() {
    return this.props.totalKudos > this.props.kudos.length
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll(event) {
    const isAtBottom = event.srcElement.body.scrollTop + window.innerHeight == document.body.offsetHeight

    if (isAtBottom && this.areMoreKudos() && !this.props.isFetchingKudos) {
      this.props.fetchPage()
    }
  }

  render() {
    return <div className="kudos-list__container">
      <TabBarContainer />
      <List giverId={this.props.id} kudos={this.props.kudos} likeKudo={this.props.likeKudo} unlikeKudo={this.props.unlikeKudo} />
      {this.props.isFetchingKudos ? <Spinner /> : null}
    </div>
  }
}
