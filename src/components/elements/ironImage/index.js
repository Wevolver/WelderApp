import React, { Component } from 'react'
import TrackVisibility from 'react-on-screen'
import IronImage from './IronImage'

class Image extends Component {

  render() {
    if(this.props.noTrackVisibility) {
      return <IronImage {...this.props}/>
    } else {
      return (
        <TrackVisibility once partialVisibility className="iron-image-container">
          <IronImage {...this.props} />
        </TrackVisibility>
      )
    }
  }
}

export default Image;