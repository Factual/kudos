import React, { PropTypes } from 'react';
import TabBarContainer from '../containers/TabBarContainer';
import Kudo from './Kudo';
import _ from 'lodash';
import moment from 'moment';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

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
