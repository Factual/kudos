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
      email: ''
    }

    // Uses lodash to bind all methods to the context of the object instance, otherwise
    // the methods defined here would not refer to the component's class, not the component
    // instance itself.
    _.bindAll(this, 'handleClick');
  }

  // React will automatically provide us with the event `e`
  handleClick(e) {
    const name = e.target.value;
    // this.props.updateName(name);
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
            type="text"
            // value={this.state.email}
            // onChange={this.createKudo}
          />
          <button
            type="button"
            className="login__button"
            // onClick={this.createKudo}
          >
            Give Kudo
          </button>
        </form>
      </div>
    );
  }
}
