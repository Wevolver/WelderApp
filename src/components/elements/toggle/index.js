import React, { Component } from 'react'
import Button from '../button'
import './toggle.css'


const ToggleButtons = ({labels, selected, onSelect}) => (
  <div className="toggle-buttons">
    {labels.map((label, index) => 
        <div className={selected === label ? "toggle active" : "toggle"} onMouseDown={() => onSelect(label)}>
            {label}
        </div>
    )}
  </div>
)

export default ToggleButtons
