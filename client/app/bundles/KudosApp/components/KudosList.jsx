import React, { PropTypes } from 'react';
import _ from 'lodash';

const Kudo = ({ kudo }) => {
  return <div>
    {JSON.stringify(kudo)}
  </div>
}

export default class KudosList extends React.Component {
  static propTypes = {
    kudos: PropTypes.array.isRequired,
  }

  render() {
    console.log(this.props.kudos)
    return <div>
      {this.props.kudos.map(kudo => <Kudo key={kudo.id} kudo={kudo}/>)}
    </div>
  }
}
