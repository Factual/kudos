import React, { PropTypes } from 'react';

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
    <div>
    <select onChange={itemChanger} className={"drop_down_menu"}>
      {drop_down.map(drop_down => <DropdownItem key={drop_down}
                                                itemName={drop_down}
                                                currentTab={currentTab}/>)}</select>
      <p></p>
    </div>

  );
};

TabBar.propTypes = {
  currentTab: PropTypes.string.isRequired,
  setActiveTab: PropTypes.func.isRequired,
};

export default TabBar
