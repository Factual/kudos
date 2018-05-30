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
        <button className="styled-kudo-button open-modal" onClick={this.modalClick.bind(this)}>
          <span className="fist-left">🤜</span>
          <span className="fist-right">🤛</span>
          <span className="title">GIVE A KUDO!</span>
        </button>
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