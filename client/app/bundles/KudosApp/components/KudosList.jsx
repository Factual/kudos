import React, { PropTypes } from 'react';
import TabBarContainer from '../containers/TabBarContainer';
import _ from 'lodash';
import moment from 'moment';

const Kudo = ({ kudo }) => {
  const timestamp = moment.parseZone(kudo.given_at);
  const formattedTimestamp = `At ${timestamp.format('h:mm a')} on ${timestamp.format('MMM D, YYYY')}`
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
    <div className="kudo__timestamp">
      {formattedTimestamp}
    </div>
  </div>
}

const List = ({ kudos }) => {
  return <div className="kudos-list">
    {kudos.map(kudo => <Kudo key={kudo.id} kudo={kudo}/>)}
  </div>
}

const Spinner = () => <div className="kudos-list__fetching-container">
  <i className="fa fa-spin fa-spinner fa-5x" aria-hidden="true"></i>
</div>

export default class KudosList extends React.Component {
  static propTypes = {
    kudos: PropTypes.array.isRequired,
    isFetchingKudos: PropTypes.bool.isRequired
  }

  render() {
    return <div className="kudos-list__container">
      <TabBarContainer />
      {this.props.isFetchingKudos ? <Spinner /> : <List kudos={this.props.kudos} />}
    </div>
  }
}
