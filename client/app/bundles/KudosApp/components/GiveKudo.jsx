import { isEmpty, trim } from 'lodash'
import React, { PropTypes } from 'react'
import { observer } from 'mobx-react'
import Autosuggest from 'react-autosuggest'
import request from 'axios'
import AppStore from '../stores/AppStore'

// Functions for Autosuggest component
const fuzzySearchUsers = query => {
  return request({
    method: 'GET',
    url: 'users/search',
    responseType: 'json',
    params: {
      q: query,
    },
  }).then(res => {
    return res.data.map(obj => _.pick(obj, ['name', 'email']))
  })
}

const getSuggestionValue = suggestion => suggestion.email

const renderSuggestion = suggestion => (
  <div>
    {suggestion.name}, {suggestion.email}
  </div>
)

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
    _.bindAll(this, 'handleClick', 'onChangeSearchInput', 'setMessage')
  }

  // React will automatically provide us with the event `e`
  handleClick(e) {
    try {
      this.setState({ inFlight: true })
      AppStore.kudosStore.newKudo(this.state.emails, this.state.message)
      this.setState(this._initialState())
    } catch (e) {
      console.error(e)
      this.setState({ inFlight: false })
    }
  }

  onChangeSearchInput = (event, { newValue }) => {
    this.setState({
      emails: newValue.split(',').map(trim),
    })
  }

  onSuggestionsFetchRequested = ({ value }) => {
    fuzzySearchUsers(value).then(suggestions => {
      this.setState({
        userSuggestions: suggestions,
      })
    })
  }

  onSuggestionsClearRequested = () => {
    this.setState({
      userSuggestions: [],
    })
  }
  setMessage(e) {
    this.setState({ message: e.target.value })
  }

  render() {
    const buttonInnerHTML = this.state.inFlight
      ? '<i class="fas fa-spinner fa-spin"></i>'
      : 'Give Kudo'
    const buttonDisabled =
      isEmpty(this.state.emails) || isEmpty(this.state.message) || this.state.inFlight
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
      <div className="give-kudo">
        <h3>Give Kudo</h3>
        <form className="give-kudo__form">
          <fieldset className="give-kudo__inputs">
            <label htmlFor="give-kudo__input-email">To:</label>
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
            <label htmlFor="give-kudo__input-message">Say:</label>
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
            <button
              type="button"
              className="give-kudo__button"
              onClick={this.handleClick}
              disabled={buttonDisabled}
              dangerouslySetInnerHTML={{ __html: buttonInnerHTML }}
            />
          </div>
        </form>
      </div>
    )
  }
}

export default GiveKudo
