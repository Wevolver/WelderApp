import React, { Component } from 'react';
import Loader from '../elements/loader'

class ImagePreview extends Component {
  render() {
    const {
      file,
    } = this.props
    const blob = new Blob([file], {type: 'image/png'})
    // console.log(blob)
    var urlCreator = window.URL || window.webkitURL;
    const src = urlCreator.createObjectURL(blob)
    return (
      <div>
        <img style={{maxWidth: '100%'}} src={src} alt={src}/>
      </div>
    );
  }
}

export default ImagePreview;
