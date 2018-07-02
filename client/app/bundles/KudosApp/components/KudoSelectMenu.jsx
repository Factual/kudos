import React, { PropTypes } from 'react'
import Select from 'react-select'

function constructOptions([name, email]) {
  const value = `${name} ${email}`
  const label = `${name} (${email})`
  return { value, label, email }
}

export default class KudoSelectMenu extends React.Component {
  render() {
    const children = this.props.allUsers.map(user => {
      return constructOptions(user)
    })
    return (
      <Select
        closeOnSelect={false}
        disabled={false}
        placeholder="Select some people!"
        multi={true}
        value={this.props.userSuggestions}
        options={children}
        onChange={this.props.onChange}
      />
    )
  }
}

KudoSelectMenu.propTypes = {
  allUsers: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  userSuggestions: PropTypes.array.isRequired,
}
