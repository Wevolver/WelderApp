import React, { Component } from 'react'
import './box.css'
import Tabs from '../navbar/tabs'


const Box = (props) => (
  <div style={props.style} className="box-container">
    <div className="box-header">
      {props.title &&<div className="box-title">
        <h2>{props.title}</h2>
        {props.menu}
      </div>}
      {props.tabs &&
        <div className="box-tabs" style={props.tabStyle}>
          <Tabs tabs={props.tabs} onTabSelect={props.onTabSelect}/>
        </div>
      }
    </div>
    <div
      className={props.type === "no-border" ? "box-body-no-border" : "box-body"} style={props.bodyStyle || {}}>
      {props.children}
    </div>
  </div>
)

export default Box
