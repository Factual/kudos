import React, { PropTypes } from 'react';
import _ from 'lodash';
import moment from 'moment';
import { grey400, lightBlue400 } from 'material-ui/styles/colors';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ThumbUp from 'material-ui/svg-icons/action/thumb-up';

export default class SingleKudo extends React.Component {

  constructor(props, context) {
    super(props, context);
    _.bindAll(this, 'formatTimestamp', 'likedBySelf');
    this.state = {
      likeAction: this.props.likeKudo(this.props.id),
      timestamp: this.formatTimestamp(this.props.kudo.given_at),
      thumbColor: grey400,
      likeText: ""
    };

    if (this.props.kudo.likes.length > 0){
      this.state.likeText = `${this.props.kudo.likes.length} ${this.props.kudo.likes.length === 1 ? 'person likes': 'people like'} this`;
    }

    if (this.likedBySelf(this.props.kudo.likes, this.props.giverId)) {
      this.state.thumbColor = lightBlue400;
      this.state.likeAction = this.props.unlikeKudo(this.props.id);
    }
  }

  formatTimestamp(t) {
    let ts = moment(t);
    console.log("Parsed Zone:", ts);
    return `At ${ts.format('h:mm a')} on ${ts.format('MMM D, YYYY')}`
  }

  likedBySelf(likes, giverId) {
    let match = false

    _.forEach(likes, val => {
      if (val.giver_id === this.props.giverId) {
        match = true
        return
      }
    })

    return match
  }

  render() {
    return <div className="kudo">
      <h4 className="list-group-item-heading">Kudos, {this.props.kudo.receiver}!</h4>
      <div className="kudo__receiver">
        <img src={this.props.kudo.receiver_avatar} alt={this.props.kudo.receiver} className="kudo__avatar" />
      </div>
      <div className="kudo__message">
        <blockquote className="blockquote">
          {this.props.kudo.body}
          <footer className="blockquote-footer">{this.props.kudo.giver}</footer>
        </blockquote>
      </div>
      <FloatingActionButton onClick={this.state.likeAction} mini={true} backgroundColor={this.state.thumbColor}>
        <ThumbUp/>
      </FloatingActionButton>
      <div>{this.state.likeText}</div>
      <div className="kudo__timestamp">
        {this.state.timestamp}
      </div>
    </div>
  }

}
