import React, { PropTypes } from 'react';
import _ from 'lodash';

// Simple example of a React "dumb" component
export default class GiveKudo extends React.Component {
  static propTypes = {
    // If you have lots of data or action properties, you should consider grouping them by
    // passing two properties: "data" and "actions".
    createKudo: PropTypes.func.isRequired,
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      email: '',
      message: ''
    }

    // Uses lodash to bind all methods to the context of the object instance, otherwise
    // the methods defined here would not refer to the component's class, not the component
    // instance itself.
    _.bindAll(this, 'handleClick', 'setEmail', 'setMessage');
  }

  // React will automatically provide us with the event `e`
  handleClick(e) {
    console.log('createKudo with ' + this.state.email)
    this.props.createKudo(this.state.email, this.state.message)
  }

  setEmail(e) {
    this.setState({email: e.target.value});
  }

  setMessage(e) {
    this.setState({message: e.target.value});
  }

  render() {
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
            />
          </fieldset>
          <div className="give-kudo__actions">
            <button
              type="button"
              className="give-kudo__button"
              onClick={this.handleClick}
            >
              Give Kudo
            </button>
          </div>
        </form>
      </div>
    );
  }
}
