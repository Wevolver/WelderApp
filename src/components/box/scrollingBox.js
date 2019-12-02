import React, { Component } from 'react'
import './box.css'

const ScrollingBox = (props) => (
  <div className={`box-container flex-column ${props.className}`}>
    {!props.menuDisabled && <div style={props.style} className={`${props.headerClassName} box-header-minimal`}>
          <h2>{props.title}</h2>
          {props.menu}
        </div>
    }
    <div
      className={props.type === "no-border"  ? "box-body-no-border" :"box-body"}
      style={{paddingTop: props.type === "no-border" && !props.menuDisabled ? 46 : 16}}
    >
      <div style={props.style}>
      {props.children}
      </div>
    </div>
  </div>
)

export default ScrollingBox
