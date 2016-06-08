// HelloWorldWidget is an arbitrary name for any "dumb" component. We do not recommend suffixing
// all your dump component names with Widget.

import React, { PropTypes } from 'react';
import _ from 'lodash';

// Simple example of a React "dumb" component
export default class KudosWidget extends React.Component {
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
      <div className="container">
        <h3>
          Kudos, {this.state.email}!
        </h3>
        <hr />
        <form className="form-horizontal">
          <label>
            Give kudos to:
          </label>
          <input
            required={true}
            placeholder="Factual email address"
            type="email"
            value={this.state.email}
            onChange={this.setEmail}
          />
          <input
            placeholder="Optional message"
            type="text"
            value={this.state.message}
            onChange={this.setMessage}
          />
          <button
            type="button"
            className="login__button"
            onClick={this.handleClick}
          >
            Give Kudo
          </button>
        </form>
      </div>
    );
  }
}
