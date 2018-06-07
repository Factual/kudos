import React, { PropTypes } from 'react'
import { isEmpty, trim } from 'lodash'
import _ from 'lodash'
import request from 'axios'
import KudoButtonText from './KudoButtonText'
import KudoSelectMenu from './KudoSelectMenu'

// Functions for Autosuggest component
const fuzzySearchUsers = (query) => {
  return request({
    method: 'GET',
    url: 'users/search',
    responseType: 'json',
    params: {
      q: query
    }
  }).then((res) => {
    return res.data.map(obj => _.pick(obj, ['name', 'email']))
  })
}

const getEmailFromUser = (userString) => {
  //react-select gives values as name | email, so must parse email from that
  return userString.substring(userString.indexOf('|') + 1, userString.length).trim()
}

// Simple example of a React "dumb" component
export default class GiveKudo extends React.Component {

  static propTypes = {
    // If you have lots of data or action properties, you should consider grouping them by
    // passing two properties: "data" and "actions".
    createKudo: PropTypes.func.isRequired,
    showModal: PropTypes.bool.isRequired,
    modalClick: PropTypes.func.isRequired,
    allUsers: PropTypes.object.isRequired,
  }

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

  // React will automatically provide us with the event `e`
  handleClick(e) {
    this.setState({inFlight: true})
    this.props.createKudo(this.state.emails, this.state.message, this.onSuccess, this.onFailure)
    this.props.modalClick(e);
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
    this.setState({message: e.target.value})
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
              <KudoSelectMenu allUsers={this.props.allUsers}
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
                        onClick={this.props.modalClick}
                >
                  JK, CANCEL
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}
