import React, { PropTypes } from 'react';
import Select from 'react-select';

function constructOptions(key, index, returnArray, map) {
  const filterValue = `${key} ${map[key]}`;
  const displayValue = `${key} (${map[key]})`;
  returnArray.push({value: filterValue, label: displayValue})
}
// display={displayValue}
export default class KudoSelectMenu extends React.Component {

  static propTypes = {
    allUsers: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
  };

  render() {
    const children = [];
    const users = this.props.allUsers;
    Object.keys(users).forEach(function callback(key, index, array) {
      return constructOptions(key, index, children, users);
    });
    return (<Select closeOnSelect={false}
                    disabled={false}
                    placeholder="Select a person!"
                    multi
                    options={children}
                    removeSelected={true}
                    rtl={false}
                    simpleValue
                    onChange={this.props.onChange}/>)
  }
}

