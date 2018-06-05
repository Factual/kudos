import React, { PropTypes } from 'react';
import { Select } from 'antd'

function constructOptions(key, index, returnArray, map) {
  const Option = Select.Option;
  const filterValue = `${key} ${map[key]}`;
  const displayValue = `${key} (${map[key]})`;
  returnArray.push(<Option key={filterValue}
                           value={map[key]}>{displayValue}</Option>)
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
    return (<Select style={{zIndex:"999999999999"}}
                    mode='tags'
                    onChange={this.props.onChange}>
      {children}
      </Select>)
  }
}

