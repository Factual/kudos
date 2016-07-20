import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setActiveTab } from '../actions/tabActions';

const Tab = ({ tabName, currentTab, clickHandler }) => {
  const classNameForTab = 'nav-link' + (currentTab == tabName ? ' active' : '');

  return <li className="nav-item">
    <span
      className={classNameForTab}
      onClick={clickHandler}
    >
      {tabName}
    </span>
  </li>
}

const TabBarContainer = ({ currentTab, setActiveTab }) => {
  const tabs = ['Recent', 'My Kudos', 'Awarded Kudos']
  const makeClickHandler = tabName => {
    () => setActiveTab(tabName)
  }

  return (
    <ul className="kudos-list__nav">
      { tabs.map(tab => <Tab tabName={tab} currentTab={currentTab} clickHandler={makeClickHandler(tab)}/>) }
    </ul>
  );
};

TabBarContainer.propTypes = {
  currentTab: PropTypes.string.isRequired,
  setActiveTab: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return { currentTab: state.currentTab };
}

function mapDispatchToProps(dispatch) {
  return { setActiveTab: newActiveTab => dispatch(setActiveTab(newActiveTab)) }
}

export default connect(mapStateToProps, mapDispatchToProps)(TabBarContainer);
