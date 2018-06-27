import React, { PropTypes } from 'react'
import { observer } from 'mobx-react'
import AppStore from '../stores/AppStore'

const DropDownItem = ({ itemName, currentTab}) => {
  const classNameForItem = 'nav-link' + (currentTab === itemName ? ' active' : '');

  return <option className={`${classNameForItem} +  kudos-list__tab`} value={itemName}>
    {itemName}
  </option>
};

@observer
export class TabBar extends React.Component {
  static itemChanger(event) {
    AppStore.kudosStore.setCurrentTab(event.target.value)
  }
  render() {
    const drop_down = ['All Kudos', 'Kudos Received', 'Kudos Sent']
    const gray = "#898989";
    return (
    <div className="kudo_list-changer kudos-list">
    <select onChange={TabBar.itemChanger} className="drop_down_menu">
      {drop_down.map(drop_down => <DropDownItem key={drop_down}
                                                itemName={drop_down}
                                                currentTab={AppStore.kudosStore.currentTab}/>)}</select>
      <svg width="100%" height="10">
        <line x1="0" x2="100%" y1="5" y2="5"
              stroke={gray}
              strokeWidth="2.5"
              strokeLinecap="square"
              strokeDasharray=".5,5"
              />
      </svg>
    </div>)};
}

export default TabBar
