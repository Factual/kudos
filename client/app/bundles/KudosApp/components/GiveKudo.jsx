import React, { PropTypes } from 'react'
import { isPresent } from 'lib/util'
import Autosuggest from 'react-autosuggest'
import Textarea from 'react-textarea-autosize'
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
    return res.data.map(obj => _.pick(obj, [ 'name', 'email' ]))
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
  }

  _initialState() {
    return {
      email: '',
      message: '',
      userSuggestions: [],
      inFlight: false
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
    this.props.createKudo(this.state.email, this.state.message, this.onSuccess, this.onFailure)
  }

  onSuccess(_res) {
    this.setState(this._initialState())
  }

  onFailure(_err) {
    this.setState({inFlight: false})
  }

  onChangeSearchInput = (event, { newValue }) => {
    this.setState({
      email: newValue
    })
  }

  onSuggestionsFetchRequested = ({ value }) => {
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
    const buttonInnerHTML = this.state.inFlight ? '<i class="fa fa-spinner fa-spin"></i>' : 'Give Kudo'
    const buttonEnabled = isPresent(this.state.email) && isPresent(this.state.message) && !this.state.inFlight
    const autoSuggestProps = {
      placeholder: 'Search a factualite',
      value: this.state.email,
      onChange: this.onChangeSearchInput,
    }
    return (
      <div className="give-kudo">
        <h3>
          Give Kudo
        </h3>
        <form className="give-kudo__form">
          <fieldset className="give-kudo__inputs">
            <label htmlFor="give-kudo__input-email">
              To:
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
              Say:
            </label>
            <Textarea
              placeholder="Message"
              id="give-kudo__input-message"
              className="give-kudo__input"
              minRows={3}
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
              disabled={!buttonEnabled}
              dangerouslySetInnerHTML={{__html: buttonInnerHTML}}
            >
            </button>
          </div>
        </form>
      </div>
    )
  }
}
