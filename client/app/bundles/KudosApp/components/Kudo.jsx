import React, { PropTypes } from 'react'
import { map, chunk, isEmpty } from 'lodash'
import moment from 'moment'
import { Tooltip } from 'material-ui'

const UserAvatar = ({ user }) => (
  <Tooltip
    placement="top"
    className="kudo__tooltip"
    title={ <div className="kudo__tooltip-text">{ user.name }</div> }>
    <img src={ user.avatar } alt={ user.name } className="avatar" />
  </Tooltip>
)

export default class Kudo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      body: this.props.kudo.body,
      editing: false,
    };
  }

  makeEditable = () => {
    this.setState({ editing: true })
  }

  setMessage = (e) => {
    this.setState({ body: e.target.value })
  }

  update = () => {
    this.setState({ editing: false })
    this.props.updateKudo(this.props.kudo.id, this.state.body)
  }

  formattedHeaderText() {
    const recipients = map(this.props.kudo.receivers, 'name').join(', ')
    return `Kudos, ${recipients}!`
  }

  formattedTimestamp() {
    const ts = moment(this.props.kudo.given_at)
    return `At ${ts.format('h:mm a')} on ${ts.format('MMM D, YYYY')}`
  }

  formattedLikeText() {
    const { likes } = this.props.kudo
    const numLikes = isEmpty(likes) ? 0 : likes.length

    if (numLikes === 0) {
      return ""
    }
    else {
      return `${numLikes} ${numLikes === 1 ? 'person likes': 'people like'} this`
    }
  }

  likedBySelf() {
    const { kudo, userId } = this.props
    return kudo.likes.some(like => like.giver_id === userId)
  }

  postedByActiveUser() {
    const user = this.props.userId
    const poster = this.props.kudo.giver.id
    return (user === poster)
  }

  // Render avatars in rows of at most 3
  renderRecipientAvatars() {
    const { kudo } = this.props
    const rowsOfReceivers = chunk(kudo.receivers, 3)

    return (
      <div className="flex-col">
      {rowsOfReceivers.map((rowOfReceiver, rowIndex) => (
        <div key={ kudo.id.concat("-avatar-row-", rowIndex) } className="avatar-row">
        {rowOfReceiver.map(receiver => (
          <UserAvatar
            key={ kudo.id.concat("-recipient-avatar-", receiver.id) }
            user={ receiver }
          />
        ))}
        </div>
      ))}
      </div>
    )
  }

  renderBody() {
    const { body, editing } = this.state

    return (
      editing ?
        <textarea
          id="kudo-input"
          className="edit-box"
          value={ body }
          onChange={ this.setMessage }
        /> : body
    )
  }

  renderLikeIcon() {
    const { unlikeKudo, likeKudo, id } = this.props
    const likedBySelf = this.likedBySelf()

    return (
      <i
        className={ likedBySelf ? "fas fa-heart" : "far fa-heart" }
        onClick={ likedBySelf ? unlikeKudo(id) : likeKudo(id) }
      />
    )
  }

  renderEditOptions() {
    const Edit = () => (
      <i
        className="far fa-edit"
        onClick={ this.makeEditable }
      />
    )

    const Save = () => (
      <i
        className="far fa-save"
        onClick={ this.update }
      />
    )

    const Delete = () => (
      <i className="far fa-trash-alt" onClick={ ()=> alert("delete")}></i>
    )

    // TODO: enable Delete button when implemented in backend
    return (
      this.postedByActiveUser() ? (
        <div>
          { this.state.editing ? <Save /> : <Edit /> }
          {/* <Delete /> */}
        </div>
      ) : null
    )
  }

  render() {
    return (
      <div className="kudo">
        <div className="content">
          <div className="sender">
            <UserAvatar user={ this.props.kudo.giver } />
          </div>
          <div className={ "receiver " + this.props.color_class }>
            <div className="header">
              { this.formattedHeaderText() }
              { this.renderRecipientAvatars() }
            </div>
            <div className="message">
              { this.renderBody() }
            </div>
          </div>
        </div>
        <div className="meta">
          <div>
            { this.renderLikeIcon() }
            { this.formattedLikeText() }
          </div>
          <div className="flex-center">
            { this.formattedTimestamp() }
            { this.renderEditOptions() }
          </div>
        </div>
      </div>
    )
  }
}
