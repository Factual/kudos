import { isEmpty, trim } from 'lodash'
import React, { PropTypes } from 'react'
import { observer } from 'mobx-react'
import _ from 'lodash'
import AppStore from '../stores/AppStore'
import KudoButtonText from './KudoButtonText'
import KudoSelectMenu from './KudoSelectMenu'

const getEmailFromUser = (userString) => {
  //react-select gives values as name | email, so must parse email from that
  return userString.substring(userString.indexOf('|') + 1, userString.length).trim()
}

// EASTER EGG
function stringContainsKudos(str) {
  return /\bKUDOS\b/.test(str)
}

@observer
export class GiveKudo extends React.Component {
  _initialState() {
    return {
      emails: [],
      message: '',
      userSuggestions: [],
      inFlight: false,
    }
  }

  constructor(props, context) {
    super(props, context)

    this.state = this._initialState()

    // Uses lodash to bind all methods to the context of the object instance, otherwise
    // the methods defined here would not refer to the component's class, not the component
    // instance itself.
    _.bindAll(this, 'handleClick', 'onSelectChange' , 'setMessage', 'onSuccess', 'onFailure')
  }

  componentDidUpdate(prevProps, prevState) {
    if (!GiveKudo.selfKudo(prevState.emails) && GiveKudo.selfKudo(this.state.emails)) {
      AppStore.easterEggStore.showEasterEggPunch()
    }
    AppStore.easterEggStore.flashKudo = stringContainsKudos(this.state.message)
  }

  // React will automatically provide us with the event `e`
  handleClick(e) {
    try {
      this.setState({ inFlight: true })
      AppStore.kudosStore.newKudo(this.state.emails, this.state.message)
      this.setState(this._initialState())
      this.props.modalClick(e);
    } catch (e) {
      console.error(e)
      this.setState({ inFlight: false })
    }
  }

  onSelectChange = (value) => {
    this.setState({
      emails: value.split(',').map(getEmailFromUser),
      userSuggestions: value.split(','),
    })
  }

  onSuccess(_res) {
    this.setState(this._initialState())
  }

  onFailure(_err) {
    this.setState({inFlight: false})
  }

  setMessage(e) {
    this.setState({ message: e.target.value })
  }

  static selfKudo(emails) {
    return emails.includes(AppStore.user.email)
  }

  resizeMessageBox() {
    let message = document.querySelector('textarea');
    message ? message.addEventListener('keydown', resize) : null;

    function resize() {
      // setTimeout needed so that top also resizes dynamically to reveal top row of words
      setTimeout(function () {
        message.style.height = 'auto';
        message.style.height = message.scrollHeight + 'px';
      }, 0);
    }
  }

  render() {
    const buttonInnerHTML = this.state.inFlight ?
      <i className="fas fa-spinner fa-spin"> </i> :
      <KudoButtonText text={"KUDOS!"}/>;
    const buttonDisabled = isEmpty(this.state.emails) || isEmpty(this.state.message) || this.state.inFlight;
    this.resizeMessageBox();
    return (
      <div className="give-kudo__modal">
        <div>
          <h3>
            GIVE A KUDO!
          </h3>
          <svg style={{display: 'block'}} width="100%" height="4px">
            <line x1="0" x2="100%" y1="2" y2="2" stroke="#FFC165" strokeWidth="4" strokeLinecap="round"
                  strokeDasharray="0.25, 8"/>
          </svg>
          <form className="give-kudo__form">
            <fieldset className="give-kudo__inputs">
              <label htmlFor="give-kudo__input-email">
                TO:
              </label>
              <KudoSelectMenu allUsers={AppStore.allUsers.userList}
                              onChange={this.onSelectChange}
                              userSuggestions={this.state.userSuggestions}/>
              <label htmlFor="give-kudo__input-message">
                MESSAGE:
              </label>
              <textarea
                placeholder="Message"
                id="give-kudo__input-message"
                className="give-kudo__input"
                rows={3}
                value={this.state.message}
                onChange={this.setMessage}
                disabled={this.state.inFlight}
              />
            </fieldset>
            <div className="give-kudo__actions">
              <div className="modal-button"><button
                  type="button"
                  className="styled-kudo-button send-kudo-button"
                  onClick={this.handleClick}
                  disabled={buttonDisabled}
                >
                  {buttonInnerHTML}
                </button>
              </div><div className="modal-button">
              <button className="close-modal"
                        onClick={this.props.modalClick.bind(this)}
                >
                  JK, CANCEL
                </button>
              </div>
            </div>
          </form>
          {AppStore.easterEggStore.easterEggPunchVisible ? (
            <div className="easter-egg__punch-container">
              <img className="easter-egg__punch centered" src="assets/easter-egg__fist.png" />
            </div>
          ): null}
        </div>
      </div>
    )
  }
}

export default GiveKudo
