import React, { PropTypes } from 'react';
import { isPresent } from 'lib/util';
import _ from 'lodash';

// Simple example of a React "dumb" component
export default class GiveKudo extends React.Component {
  static propTypes = {
    // If you have lots of data or action properties, you should consider grouping them by
    // passing two properties: "data" and "actions".
    createKudo: PropTypes.func.isRequired,
  };

  _initialState() {
    return {
      email: '',
      message: '',
      inFlight: false
    }
  }

  constructor(props, context) {
    super(props, context);

    this.state = this._initialState();

    // Uses lodash to bind all methods to the context of the object instance, otherwise
    // the methods defined here would not refer to the component's class, not the component
    // instance itself.
    _.bindAll(this, 'handleClick', 'setEmail', 'setMessage', 'onSuccess', 'onFailure');
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

  setEmail(e) {
    this.setState({email: e.target.value});
  }

  setMessage(e) {
    this.setState({message: e.target.value});
  }

  render() {
    const buttonInnerHTML = this.state.inFlight ? '<i class="fa fa-spinner fa-spin"></i>' : 'Give Kudo';
    const buttonEnabled = isPresent(this.state.email) && !this.state.inFlight;
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
            <input
              required={true}
              placeholder="Factual email address"
              type="email"
              id="give-kudo__input-email"
              className="give-kudo__input"
              value={this.state.email}
              onChange={this.setEmail}
              disabled={this.state.inFlight}
            />
            <label htmlFor="give-kudo__input-message">
              Say:
            </label>
            <input
              placeholder="Optional message"
              type="text"
              id="give-kudo__input-message"
              className="give-kudo__input"
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
    );
  }
}
