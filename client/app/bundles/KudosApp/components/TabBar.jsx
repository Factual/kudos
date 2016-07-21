import React, { PropTypes } from 'react';

const Tab = ({ tabName, currentTab, clickHandler }) => {
  const classNameForTab = 'nav-link' + (currentTab == tabName ? ' active' : '');

  return <li className="kudos-list__tab" onClick={clickHandler}>
    <span className={classNameForTab}>
      {tabName}
    </span>
  </li>
}

const TabBar = ({ currentTab, setActiveTab }) => {
  const tabs = ['Recent', 'My Kudos', 'Awarded Kudos']
  const makeClickHandler = tabName => () => setActiveTab(tabName)

  return (
    <ul className="kudos-list__nav">
      { tabs.map(tab => <Tab key={tab} tabName={tab} currentTab={currentTab} clickHandler={makeClickHandler(tab)}/>) }
    </ul>
  );
};

TabBar.propTypes = {
  currentTab: PropTypes.string.isRequired,
  setActiveTab: PropTypes.func.isRequired,
};

export default TabBar
