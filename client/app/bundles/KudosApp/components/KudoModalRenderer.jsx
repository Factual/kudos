import React, {PropTypes} from 'react'
import { observer } from 'mobx-react'
import GiveKudo from './GiveKudo'
import KudoButtonText from './KudoButtonText'
import MODAL_STORE from "../stores/ModalStore";

@observer
export default class KudoModalRenderer extends React.Component {

  modalClick(e) {
    MODAL_STORE.modalSwitch();
  }

  render() {
    return(
      <div className="give-kudo">
        <button className="styled-kudo-button open-modal" onClick={this.modalClick.bind(this)}>
          <KudoButtonText text={"GIVE A KUDO!"}/>
        </button>
        {MODAL_STORE.showModal ?
          <GiveKudo showModal={MODAL_STORE.showModal}
                    modalClick={this.modalClick}
          /> : null
        }
      </div>
    )
  }
}