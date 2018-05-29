import React, {PropTypes} from 'react'
import GiveKudo from './GiveKudo'


export default class KudoModalRenderer extends React.Component {
  static propTypes = {
    // If you have lots of data or action properties, you should consider grouping them by
    // passing two properties: "data" and "actions".
    createKudo: PropTypes.func.isRequired,
    activateModal: PropTypes.bool.isRequired,
    modalSwitch: PropTypes.func.isRequired,
  }


  modalClick(e) {
    this.props.modalSwitch(this.props.activateModal);
  }

  render() {
    return(
      <div className="give-kudo">
        <button onClick={this.modalClick.bind(this)}>GIVE A KUDO!</button>
        {this.props.activateModal ?
          <GiveKudo createKudo={this.props.createKudo}
                    activateModal={this.props.activateModal}
                    modalSwitch={this.props.modalSwitch}
                    modalClick={this.modalClick}
          /> : null
        }
      </div>
    )
  }
}