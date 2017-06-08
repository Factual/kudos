import React, { PropTypes } from 'react';
import _ from 'lodash';
import moment from 'moment';
import { grey400, lightBlue400 } from 'material-ui/styles/colors';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Textarea from 'react-textarea-autosize';
import ThumbUp from 'material-ui/svg-icons/action/thumb-up';

export default class Kudo extends React.Component {

  constructor(props, context) {
    super(props, context);
    _.bindAll(this, 'formatTimestamp', 'likedBySelf', 'formatLikeText', 'postedByActiveUser', 'makeEditable', 'setMessage');
    this.state = {
      likeAction: this.props.likeKudo(this.props.id),
      updateAction: () => console.log("Saved"), // placeholder, initialize from props
      timestamp: this.formatTimestamp(this.props.kudo.given_at),
      thumbColor: grey400,
      likeText: this.formatLikeText(this.props.kudo.likes.length),
      body: this.props.kudo.body,
      editing: false
    };

    if (this.likedBySelf(this.props.kudo.likes, this.props.giverId)) {
      this.state.thumbColor = lightBlue400;
      this.state.likeAction = this.props.unlikeKudo(this.props.id);
    }
  }

  formatTimestamp(t) {
    let ts = moment(t);
    return `At ${ts.format('h:mm a')} on ${ts.format('MMM D, YYYY')}`;
  }

  formatLikeText(numLikes) {
    if (numLikes === 0) {
      return "";
    }
    return `${numLikes} ${numLikes === 1 ? 'person likes': 'people like'} this`;
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

  postedByActiveUser() {
    let user = this.props.giverId;
    let poster = this.props.kudo.giver_id;
    return (user == poster);
  }

  makeEditable(e) {
    this.setState({editing: true});
  }

  componentWillReceiveProps(props) {
    if (this.props.kudo.likes != props.kudo.likes) {
      this.setState({ likeText: this.formatLikeText(props.kudo.likes.length) });
      if (this.likedBySelf(props.kudo.likes, this.props.giverId)) {
        this.setState({ thumbColor: lightBlue400, likeAction: this.props.unlikeKudo(this.props.id) });
      } else {
        this.setState({ thumbColor: grey400, likeAction: this.props.likeKudo(this.props.id) });
      }
    }
  }

  setMessage(e) {
    this.setState({body: e.target.value})
  }

  render() {

    const Edit = () => <div className="edit-kudo-button">
      <button type='button' className="btn" onClick={this.makeEditable}>
        <i className="fa fa-pencil-square-o fa-2x" aria-hidden="true"></i>
      </button>
    </div>

    const Save = () => <div className="save-kudo-button">
      <button type='button' className='btn' onClick={this.state.updateAction}>Save</button>
    </div>

    return <div className="kudo">
      <h4 className="list-group-item-heading">Kudos, {this.props.kudo.receiver}!</h4>
      <div className="kudo__receiver">
        <img src={this.props.kudo.receiver_avatar} alt={this.props.kudo.receiver} className="kudo__avatar" />
      </div>
      <div className="kudo__message">
      {this.state.editing ? (
        <Textarea
          minRows={2}
          value={this.state.body}
          onChange={this.setMessage}
        />
      ) : (
        <blockquote className="blockquote">
          {this.props.kudo.body}
          <footer className="blockquote-footer">{this.props.kudo.giver}</footer>
        </blockquote>
      )}
      </div>
      <FloatingActionButton onClick={this.state.likeAction} mini={true} backgroundColor={this.state.thumbColor}>
        <ThumbUp/>
      </FloatingActionButton>
      <div>{this.state.likeText}</div>
      <div className="kudo__timestamp">
        {this.state.timestamp}
      </div>
      {this.postedByActiveUser() ? (this.state.editing ? <Save /> : <Edit />) : (null)}
    </div>
  }

}
