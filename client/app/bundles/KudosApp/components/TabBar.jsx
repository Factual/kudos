import React, { PropTypes } from 'react'
import { observer } from 'mobx-react'
import AppStore from '../stores/AppStore'

const DropdownItem = ({ itemName, currentTab}) => {
  const classNameForItem = 'nav-link' + (currentTab == itemName ? ' active' : '');

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
  const drop_down = ['Recent', 'My Kudos', 'Awarded Kudos']
  function itemChanger(event) {
    setActiveTab(event.target.value)
  }
  return (
    <select onChange={itemChanger}>
      {drop_down.map(drop_down => <DropdownItem key={drop_down}
                                                itemName={drop_down}
                                                currentTab={currentTab}/>)}</select>

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
