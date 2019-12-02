import React, { Component } from 'react'
import mediumZoom from 'medium-zoom'

class MediaZoom extends Component {
  zoom = mediumZoom({ background: '#000', margin: 48, zIndex: 100 })

  attachZoom = image => {
    this.zoom.attach(image)
  }

  render() {
    return (

        <img src="https://source.unsplash.com/random/800x600" alt="alt" ref={this.attachZoom}/>

    )
  }
}

export default MediaZoom