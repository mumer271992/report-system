import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Tabs = ({ children, defaultTab }) => {
  const [currentTab, setCurrentTab] = useState(defaultTab);

  return (
    <div className="tabs">
      <ul className="nav nav-tabs">
        {children.map(child => (
          <li className="nav-item" key={child.props.uniqueKey}>
            <div
              className={`nav-link ${
                currentTab === child.props.uniqueKey ? 'active' : ''
              }`}
              onClick={() => setCurrentTab(child.props.uniqueKey)}
            >
              {child.props.label}
            </div>
          </li>
        ))}
      </ul>
      {children.map(
        (child, index) =>
          child.props.uniqueKey === currentTab && (
            <div key={`${child.props.uniqueKey}-${index}`}>
              {child.props.children}
            </div>
          )
      )}
    </div>
  );
};

Tabs.propTypes = {
  children: PropTypes.node.isRequired,
  defaultTab: PropTypes.string.isRequired
};

export default Tabs;
