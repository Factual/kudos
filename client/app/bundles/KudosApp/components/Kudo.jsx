import React, { PropTypes } from 'react'
import { observer } from 'mobx-react'
import { map, chunk, isEmpty } from 'lodash'
import { Tooltip } from 'material-ui'

class UserAvatar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      imageSrc: props.user.avatar || '',
    }
  }

  handleImageError = () => {
    this.setState({ imageSrc: 'default-avatar.jpeg' })
  }

  render() {
    const { name } = this.props.user
    return (
      <Tooltip
        placement="top"
        className="kudo__tooltip"
        title={<div className="kudo__tooltip-text">{name}</div>}
      >
        <img
          src={this.state.imageSrc}
          alt={name}
          className="avatar"
          onError={this.handleImageError}
        />
      </Tooltip>
    )
  }
}

@observer
export default class Kudo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      body: this.props.kudo.body,
      editing: false,
    }
  }

  makeEditable = () => {
    this.setState({ editing: true })
  }

  setMessage = e => {
    this.setState({ body: e.target.value })
  }

  update = () => {
    this.setState({ editing: false })
    this.props.updateKudo(this.state.body)
  }

  formattedHeaderText() {
    const recipients = map(this.props.kudo.receivers, 'name').join(', ')
    return `Kudos, ${recipients}!`
  }

  // Render avatars in rows of at most 3
  renderRecipientAvatars() {
    const { kudo } = this.props
    const rowsOfReceivers = chunk(kudo.receivers, 3)

    return (
      <div className="avatars">
        {rowsOfReceivers.map((rowOfReceiver, rowIndex) => (
          <div key={kudo.id.concat('-avatar-row-', rowIndex)} className="avatar-row">
            {rowOfReceiver.map(receiver => (
              <UserAvatar key={kudo.id.concat('-recipient-avatar-', receiver.id)} user={receiver} />
            ))}
          </div>
        ))}
      </div>
    )
  }

  renderBody() {
    const { body, editing } = this.state

    return editing ? (
      <textarea id="kudo-input" className="edit-box" value={body} onChange={this.setMessage} />
    ) : (
      body
    )
  }

  renderLikeIcon() {
    const { unlikeKudo, likeKudo, id } = this.props
    const likedBySelf = this.props.kudo.likes.some(like => like.giver_id === this.props.userId)

    return (
      <i
        className={likedBySelf ? 'fas fa-heart' : 'far fa-heart'}
        onClick={likedBySelf ? unlikeKudo(id) : likeKudo(id)}
      />
    )
  }

  renderEditOptions() {
    const Edit = () => <i className="far fa-edit" onClick={this.makeEditable} />

    const Save = () => <i className="far fa-save" onClick={this.update} />

    return this.props.kudo.giver.id === this.props.userId ? (
      <div>{this.state.editing ? <Save /> : <Edit />}</div>
    ) : null
  }

  render() {
    return (
      <div className="kudo">
        <div className="content">
          <div className="sender">
            <UserAvatar user={this.props.kudo.giver} />
          </div>
          <div className={`receiver ${this.props.colorClass}`}>
            <div className="header">
              {this.formattedHeaderText()}
              {this.renderRecipientAvatars()}
            </div>
            <div className="message">{this.renderBody()}</div>
          </div>
        </div>
        <div className="meta">
          <div className="meta-item">
            {this.renderLikeIcon()}
            {this.props.kudo.numLikes}
          </div>
          <div className="meta-item">
            {this.props.kudo.timestamp}
            {this.renderEditOptions()}
          </div>
        </div>
      </div>
    )
  }
}
