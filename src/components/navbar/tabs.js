import React from 'react';

function tabClass(selected, noTabs) {
  let style = selected ? 'tab selected' : 'tab'
  if(noTabs < 2) style += ' black'
  return style
}
const Tabs = ({ tabs, onTabSelect }) => (
  <div className="tab-container">
  {tabs.map(tab => 
      <div className={tabClass(tab.selected, tabs.length)} key={tab.id} onClick={() => onTabSelect ? onTabSelect(tab.id) : {}}>
        {tab.title}
      </div>
    )}
  </div>
)

export default Tabs