import React, { PropTypes } from 'react';
// import '../../../../../app/assets/stylesheets/kudos/utils/_variables.scss'

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

  );
};

TabBar.propTypes = {
  currentTab: PropTypes.string.isRequired,
  setActiveTab: PropTypes.func.isRequired,
};

export default TabBar
