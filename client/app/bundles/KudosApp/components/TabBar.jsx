import React, { PropTypes } from 'react'
import { observer } from 'mobx-react'
import AppStore from '../stores/AppStore'

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

const Tab = ({ tabName, currentTab, clickHandler }) => {
  const classNameForTab = 'nav-link' + (currentTab == tabName ? ' active' : '')

  return (
    <li className="kudos-list__tab" onClick={clickHandler}>
      <span className={classNameForTab}>{tabName}</span>
    </li>
  )
}

export default TabBar
