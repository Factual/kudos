import React, { PropTypes } from 'react'
import { observer } from 'mobx-react'
import GiveKudo from './GiveKudo'
import FistBumpText from './FistBumpText'
import AppStore from '../stores/AppStore'

@observer
export default class KudoModalRenderer extends React.Component {
  render() {
    return (
      <div className="give-kudo">
        <button className="styled-kudo-button open-modal" onClick={AppStore.toggleModal}>
          <FistBumpText text={'GIVE A KUDO!'} />
        </button>
        {AppStore.showModal ? <GiveKudo /> : null}
      </div>
    )
  }
}
