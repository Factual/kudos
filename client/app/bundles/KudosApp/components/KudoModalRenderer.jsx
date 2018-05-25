import React, {PropTypes} from 'react'
import GiveKudo from './GiveKudo'


export default class KudoModalRenderer extends React.Component {
  static propTypes = {
    // If you have lots of data or action properties, you should consider grouping them by
    // passing two properties: "data" and "actions".
    createKudo: PropTypes.func.isRequired,
    activateModal: PropTypes.bool.isRequired,
  }

  constructor(props, context) {
    super(props, context);
    this.state = {
      activateModal : this.props.activateModal,
    }
  }

  handleClick(e) {
    this.setState({activateModal : !this.state.activateModal})
  }

  render() {
    return(
      <div className="give-kudo">
        <button onClick={this.handleClick.bind(this)}>GIVE A KUDO!</button>

        <GiveKudo createKudo={this.props.createKudo} activateModal = {this.state.activateModal} />
      </div>
    )
  }
}