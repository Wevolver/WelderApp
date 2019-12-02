import React, { Component } from 'react';
import './IronImage.css';

class IronImage extends Component {

  constructor(props) {
    super(props);
    this.ironImageHd = null;
  }

  loadImage() {

    const hdLoaderImg = new Image();

    hdLoaderImg.src = this.props.srcLoaded;
    let mediumFile = this.props.srcLoaded

    if(this.props.tileImage && this.props.srcLoaded && this.props.srcLoaded.startsWith("https://wevolver-project-images.s3.amazonaws.com/")){
      let file = this.props.srcLoaded.split('/').slice(-1)[0]
      mediumFile = "https://wevolver-project-images.s3.amazonaws.com/medium/" + file
      hdLoaderImg.src = mediumFile;
    }

    hdLoaderImg.onload = () => {
      if(this.ironImageHd) {
        this.ironImageHd.setAttribute(
          'style',
          `background-image: url('${mediumFile}')`
        );
        this.ironImageHd.classList.add('iron-image-fade-in');
      }
    }

  };

  componentDidMount = () => {
    if(this.props.noTrackVisibility) {
      this.loadImage()
    }
  }

  componentWillReceiveProps = (nextProps) => {
    if(!this.props.isVisible && nextProps.isVisible) {
      this.loadImage()
    }
  }

  render() {
    const {
      contain
    } = this.props
    let type = 'iron-image-loaded'
    if (contain) type = `${type} contain`
    return (
        <div
          className={type}
          ref={imageLoadedElem => this.ironImageHd = imageLoadedElem}>
        </div>
    )
  }
}

export default IronImage;
