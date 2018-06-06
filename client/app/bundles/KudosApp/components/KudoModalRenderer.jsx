import React, {PropTypes} from 'react'
import GiveKudo from './GiveKudo'
import KudoButtonText from './KudoButtonText'

export default class KudoModalRenderer extends React.Component {
  static propTypes = {
    // If you have lots of data or action properties, you should consider grouping them by
    // passing two properties: "data" and "actions".
    createKudo: PropTypes.func.isRequired,
    showModal: PropTypes.bool.isRequired,
    modalSwitch: PropTypes.func.isRequired,
    allUsers: PropTypes.object.isRequired,
  }

  modalClick(e) {
    this.props.modalSwitch(this.props.showModal);
  }

  render() {
    return(
      <div className="give-kudo">
        <button className="styled-kudo-button open-modal" onClick={this.modalClick.bind(this)}>
          <KudoButtonText text={"GIVE A KUDO!"}/>
        </button>
        {this.props.showModal ?
          <GiveKudo createKudo={this.props.createKudo}
                    showModal={this.props.showModal}
                    modalClick={this.modalClick.bind(this)}
                    allUsers={this.props.allUsers}
          /> : null
        }
      </div>
    )
  }
}