import React, { PropTypes } from 'react';
import { map } from 'lodash';
import moment from 'moment';
import { grey400, lightBlue400 } from 'material-ui/styles/colors';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Textarea from 'react-textarea-autosize';
import ThumbUp from 'material-ui/svg-icons/action/thumb-up';

export default class Kudo extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      likeAction: this.props.likeKudo(this.props.id),
      timestamp: this.formatTimestamp(this.props.kudo.given_at),
      thumbColor: grey400,
      likeText: this.formatLikeText((this.props.kudo.likes ? this.props.kudo.likes.length : 0)),
      body: this.props.kudo.body,
      editing: false
    };

    if (this.likedBySelf(this.props.kudo.likes, this.props.giverId)) {
      this.state.thumbColor = lightBlue400;
      this.state.likeAction = this.props.unlikeKudo(this.props.id);
    }
  }

  formatTimestamp = (t) => {
    let ts = moment(t);
    return `At ${ts.format('h:mm a')} on ${ts.format('MMM D, YYYY')}`;
  }

  formatLikeText = (numLikes) => {
    if (numLikes === 0) {
      return "";
    }
    return `${numLikes} ${numLikes === 1 ? 'person likes': 'people like'} this`;
  }

  likedBySelf = (likes, giverId) => {
    return likes.some(like => like.giver_id === this.props.giverId)
  }

  postedByActiveUser = () => {
    let user = this.props.giverId;
    let poster = this.props.kudo.giver_id;
    return (user === poster);
  }

  makeEditable = (e) => {
    this.setState({editing: true});
  }

  setMessage = (e) => {
    this.setState({body: e.target.value})
  }

  update = (e) => {
    this.setState({editing: false});
    this.props.updateKudo(this.props.kudo.id, this.state.body);
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

  render() {

    const Edit = () => (
      <button
        type='button'
        className="kudo__edit-button"
        onClick={this.makeEditable}>
        Edit
      </button>
    )

    const Save = () => (
      <button
        type='button'
        className='kudo__edit-button kudo__edit-button--save'
        onClick={this.update}>
        Save
      </button>
    )

    const recipientDisplay = map(this.props.kudo.receivers, 'name').join(', ')
    return (
      <div className="kudo">
        <h4 className="list-group-item-heading">{`Kudos, ${recipientDisplay}!`}</h4>
        <div className="kudo__receiver">
          <img src={this.props.kudo.receivers[0].avatar} alt={this.props.kudo.receivers[0].name} className="kudo__avatar" />
        </div>
        <div className="kudo__message">
          <blockquote className="blockquote">
            {this.state.editing ? (
              <Textarea
                className="kudo__input"
                value={this.state.body}
                onChange={this.setMessage}
              />
            ) : (
              this.state.body
            )}
            <footer className="blockquote-footer">{this.props.kudo.giver}</footer>
          </blockquote>
        </div>
        <FloatingActionButton onClick={this.state.likeAction} mini={true} backgroundColor={this.state.thumbColor}>
          <ThumbUp/>
        </FloatingActionButton>
        <div>{this.state.likeText}</div>
        {this.postedByActiveUser() ? (
          <div className="kudo__update">
            {this.state.editing ? <Save /> : <Edit />}
          </div>
        ) : (null)}
        <div className="kudo__timestamp">
          {this.state.timestamp}
        </div>
      </div>
    )
  }
}
