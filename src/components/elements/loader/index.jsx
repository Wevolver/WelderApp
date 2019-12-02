import React from 'react'
import './loader.css'

const Loader = () => (
  <div className="loader-container">
    <div className="loader-circle" />
    <div className="loader-line-mask">
      <div className="loader-line" />
    </div>
  </div>
)

export default Loader
