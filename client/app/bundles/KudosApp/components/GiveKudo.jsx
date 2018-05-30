import React, {PropTypes} from 'react'
import {isEmpty, trim} from 'lodash'
import Autosuggest from 'react-autosuggest'
import _ from 'lodash'
import request from 'axios'

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

const getSuggestionValue = suggestion => suggestion.email

const renderSuggestion = suggestion => (
  <div>
    {suggestion.name}, {suggestion.email}
  </div>
)

// Simple example of a React "dumb" component
export default class GiveKudo extends React.Component {
  static propTypes = {
    // If you have lots of data or action properties, you should consider grouping them by
    // passing two properties: "data" and "actions".
    createKudo: PropTypes.func.isRequired,
    activateModal: PropTypes.bool.isRequired,
    modalSwitch: PropTypes.func.isRequired,
    modalClick: PropTypes.func.isRequired,
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
    _.bindAll(this, 'handleClick', 'onChangeSearchInput', 'setMessage', 'onSuccess', 'onFailure')
  }

  // React will automatically provide us with the event `e`
  handleClick(e) {
    this.setState({inFlight: true})
    this.props.createKudo(this.state.emails, this.state.message, this.onSuccess, this.onFailure)
  }

  onSuccess(_res) {
    this.setState(this._initialState())
  }

  onFailure(_err) {
    this.setState({inFlight: false})
  }

  onChangeSearchInput = (event, {newValue}) => {
    this.setState({
      emails: newValue.split(',').map(trim)
    })
  }

  onSuggestionsFetchRequested = ({value}) => {
    fuzzySearchUsers(value).then(suggestions => {
      this.setState({
        userSuggestions: suggestions
      })
    })
  }

  onSuggestionsClearRequested = () => {
    this.setState({
      userSuggestions: []
    })
  }

  setMessage(e) {
    this.setState({message: e.target.value})
  }

  render() {
    const buttonInnerHTML = this.state.inFlight ? '<i class="fas fa-spinner fa-spin"></i>' : 'Give Kudo'
    const buttonDisabled = isEmpty(this.state.emails) || isEmpty(this.state.message) || this.state.inFlight
    const autoSuggestProps = {
      placeholder: 'Type an email or search a factualite',
      value: this.state.emails.join(', '),
      onChange: this.onChangeSearchInput,
      onKeyPress: e => {
        if (e.key === 'Enter') {
          e.preventDefault()
        }
      },
    }
    return (
      <div className="give-kudo__modal">
        <div>
        <h3>
          GIVE A KUDO!
        </h3>
        <svg style={{display:'block'}} width="100%" height="4px">
          <line x1="0" x2="100%" y1="2" y2="2" stroke="#FFC165" strokeWidth="4" strokeLinecap="round"
                strokeDasharray="0.25, 8"/>
        </svg>
        <form className="give-kudo__form">
          <fieldset className="give-kudo__inputs">
            <label htmlFor="give-kudo__input-email" >
              TO:
            </label>
            <Autosuggest
              suggestions={this.state.userSuggestions}
              id="give-kudo__input-email"
              disabled={this.state.inFlight}
              onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
              onSuggestionsClearRequested={this.onSuggestionsClearRequested}
              getSuggestionValue={getSuggestionValue}
              renderSuggestion={renderSuggestion}
              inputProps={autoSuggestProps}
            />
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
            <div className="modal-button">
              <button
                type="button"
                className="styled-kudo-button send-kudo-button"
                onClick={this.handleClick}
                disabled={buttonDisabled}
              >
                <span className="fist-left">🤜</span>
                <span className="fist-right">🤛</span>
                <span className="title">KUDOS!</span>
              </button>
            </div>
            <div className="modal-button">
              <button className="close-modal"
                      onClick={this.props.modalClick.bind(this)}
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