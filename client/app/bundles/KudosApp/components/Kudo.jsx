import React, { PropTypes } from 'react'
import { observer } from 'mobx-react'
import { map, chunk, isEmpty, after } from 'lodash'
import { Tooltip } from 'material-ui'
import Draggable from 'react-draggable'

class UserAvatar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      imageSrc: props.user.avatar || '',
    }
  }

  handleImageError = () => {
    this.setState({ imageSrc: 'assets/default-avatar.jpeg' })
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

// EASTER EGG
function convertFlashingKudos(text) {
  const arr = text.split(/(kudos?)/i,)
  return (
    <span>
    {arr.map((str, index) => {
      return index % 2 === 0 ? str : (
        <span key={`${index}-flash-${str}`}className="easter-egg__flash-color">{str}</span>
      )
    })}
    </span>
  )
}

@observer
export default class Kudo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      body: this.props.kudo.body,
      editing: false,
      shakeClass: "",
    }
    this.kudoClicked = null
  }

  componentDidMount() {
    if (this.props.superKudoMode) {
      this.startShake()
    }
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.superKudoMode && this.props.superKudoMode) {
      this.startShake()
    }
    if (prevProps.superKudoMode && !this.props.superKudoMode) {
      this.stopShake()
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

  // EASTER EGG
  handleClick = () => {
    this.kudoClicked = this.kudoClicked || this.listenForTripleClick()
    this.kudoClicked()
  }

  // EASTER EGG
  listenForTripleClick = () => {
    setTimeout(() => this.kudoClicked = null, 300)
    return after(3, () => {
      this.props.toggleSuperKudoMode()
    })
  }

  // EASTER EGG: random delay so Kudos don't shake in sync
  startShake = () => {
    setTimeout(() => {
      this.setState({ shakeClass: 'shake-constant shake-slow' })
    }, Math.floor(Math.random() * 2000))
  }

  // EASTER EGG
  stopShake = () => {
    this.setState({ shakeClass: '' })
  }

  formattedHeaderText() {
    const recipients = map(this.props.kudo.receivers, 'name').join(', ')
    const headerText = `Kudos, ${recipients}!`
    return this.props.flashKudo ? convertFlashingKudos(headerText) : headerText
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
      this.props.flashKudo ? convertFlashingKudos(body) : body
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
      <Draggable disabled={!this.props.superKudoMode}>
        <div className="kudo" onClick={this.handleClick}>
          <div className={ this.state.shakeClass }>
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
        </div>
      </Draggable>
    )
  }
}
