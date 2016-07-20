import React, { PropTypes } from 'react';
import _ from 'lodash';
import moment from 'moment';

const Kudo = ({ kudo }) => {
  const timestamp = moment.parseZone(kudo.given_at);
  const formattedTimestamp = `At ${timestamp.format('h:mm a')} on ${timestamp.format('MMM D, YYYY')}`
  return <div className="kudo">
    <div className="kudo__receiver">
      {kudo.giver} gave kudos to {kudo.receiver}
    </div>
    <div className="kudo__message">
      "{kudo.body}"
    </div>
    <div className="kudo__timestamp">
      {formattedTimestamp}
    </div>
  </div>
}

export default class KudosList extends React.Component {
  static propTypes = {
    kudos: PropTypes.array.isRequired,
  }

  render() {
    console.log(this.props.kudos)
    return <div className="kudos-list">
      {this.props.kudos.map(kudo => <Kudo key={kudo.id} kudo={kudo}/>)}
    </div>
  }
}
