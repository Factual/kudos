import React, { PropTypes } from 'react'
import { observer } from 'mobx-react'
import AppStore from '../stores/AppStore'

const DropdownItem = ({ itemName, currentTab}) => {
  const classNameForItem = 'nav-link' + (currentTab == itemName ? ' active' : '');

  return <option className={`${classNameForItem} +  kudos-list__tab`} value={itemName}>
    {itemName}
  </option>
}

const TabBar = ({ currentTab, setActiveTab }) => {
  const drop_down = ['All Kudos', 'My Kudos', 'Awarded Kudos']
  function itemChanger(event) {
    setActiveTab(event.target.value)
  }
  return (
    <div className="kudo_list-changer kudos-list">
    <select onChange={itemChanger} className={"drop_down_menu"}>
      {drop_down.map(drop_down => <DropdownItem key={drop_down}
                                                itemName={drop_down}
                                                currentTab={currentTab}/>)}</select>
      <svg width="100%" height="10">
        <line x1="0" x2="100%" y1="5" y2="5"
              stroke="#898989"
              strokeWidth="2.5"
              strokeLinecap="square"
              strokeDasharray=".5,5"
              />
      </svg>
    </div>

@observer
export class TabBar extends React.Component {
  render() {
    const tabs = ['Recent', 'My Kudos', 'Awarded Kudos']

    return (
      <ul className="kudos-list__nav">
        {tabs.map(tab => (
          <Tab
            key={tab}
            tabName={tab}
            currentTab={AppStore.kudosStore.currentTab}
            clickHandler={() => AppStore.kudosStore.setCurrentTab(tab)}
          />
        ))}
      </ul>
    )
  }
}
  return <option className={`${classNameForItem} +  kudos-list__tab`} value={itemName}>
    {itemName}
  </option>
}

const TabBar = ({ currentTab, setActiveTab }) => {
  const drop_down = ['All Kudos', 'My Kudos', 'Awarded Kudos']
  function itemChanger(event) {
    setActiveTab(event.target.value)
  }
  return (
    <div>
    <select onChange={itemChanger} className={"drop_down_menu"}>
      {drop_down.map(drop_down => <DropdownItem key={drop_down}
                                                itemName={drop_down}
                                                currentTab={currentTab}/>)}</select>
      <p className="dotted_line"/>
    </div>

  );
};

const Tab = ({ tabName, currentTab, clickHandler }) => {
  const classNameForTab = 'nav-link' + (currentTab == tabName ? ' active' : '')

  return (
    <li className="kudos-list__tab" onClick={clickHandler}>
      <span className={classNameForTab}>{tabName}</span>
    </li>
  )
}

export default TabBar
