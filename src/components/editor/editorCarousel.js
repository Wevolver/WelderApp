import React, { Component } from "react";
import { Link } from 'react-router-dom'
import Slider from "react-slick";
import ChevronLeftIcon from '../icons/chevron-left'
import ChevronRightIcon from '../icons/chevron-right'
import { exctractYoutubeVideoId } from '../../modules/helpers'
import playButtonImage from './playButton.png'
import Button from '../elements/button'
import ExpandIcon from '../icons/expand'
import ContractIcon from '../icons/contract'
import './editor.css'

function NextArrow(props) {
  const { className, style, onClick, small } = props;
  const isDisabled = className.indexOf('slick-disabled') > -1
  let compStyle = Object.assign({}, style, {
    display: isDisabled ? 'none' : 'flex',
  })
  if(props.fullScreen) compStyle.right = 0
  return (
    <div
      className={'editor-slider-arrow right-arrow hidden-in-small' + (small ? ' small' : '')}
      style={compStyle}
      onClick={onClick}
    >
      <ChevronRightIcon fill={isDisabled ? '#ddd' : '#424242'} width={20} height={20}/>
    </div>
  );
}


function PrevArrow(props) {
  const { className, style, onClick, small } = props;
  const isDisabled = className.indexOf('slick-disabled') > -1
  let compStyle = Object.assign({}, style, {
    display: isDisabled ? 'none' : 'flex',
  })
  if(props.fullScreen) compStyle.left = 0
  return (
    <div
      className={'editor-slider-arrow left-arrow hidden-in-small' + (small ? ' small' : '')}
      style={compStyle}
      onClick={onClick}
    >
      <ChevronLeftIcon fill={isDisabled ? '#ddd' : '#424242'} width={20} height={20}/>
    </div>
  );
}


class EditorCarousel extends Component {

  constructor(props) {
    super(props);
    this.state = {
      nav1: null,
      nav2: null,
      slide: 0,
      fullScreen: false,
    };
  }

  escFunction = (event) => {
    if(event.keyCode === 27) {
      if(this.state.fullScreen) {
        this.toggleFullScreen()
      }
    }
  }

  toggleFullScreen = () => {
    this.setState({fullScreen: !this.state.fullScreen})
    document.body.style.overflow = this.state.fullScreen ? "auto" : 'hidden'
  }

  componentDidMount() {
    this.setState({
      nav1: this.slider1,
      nav2: this.slider2
    });
    document.addEventListener("keydown", this.escFunction, false);
  }

  componentWillUnmount = () => {
    document.removeEventListener("keydown", this.escFunction, false);
    document.body.style.overflow = "auto"
  }

  renderThumbnail = (src, video) => {
    return(
      <div
        style={{
          backgroundImage: `url('${src}')`,
          width: '100%',
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          overflow: 'hidden',
          top: 0,
          bottom: 0,
          // left: 0,
          right: 0,

        }}
      >
        {!!video && 
          <img 
            src={playButtonImage}
            style={{
              maxWidth: 64,
              width: '20%',
            }}
          />}
      </div>
    )
  }

  renderImage = (src, thumb, video) => {
    return(
      <div
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          overflow: 'hidden',
          top: 0,
          bottom: 0,
          // left: 0,
          right: 0,

        }}
      >
          <img 
            src={src}
            style={{
              backgroundColor: 'white',
              objectFit: 'contain',
            }}
          />
      </div>
    )
  }

  renderVideo = (src, thumb, top) => {
    const videoId = exctractYoutubeVideoId(src)
    const thumbSrc = `https://img.youtube.com/vi/${videoId}/0.jpg`
    return(
      thumb ?
        this.renderThumbnail(thumbSrc, true)
      : <iframe
        id={videoId}
        style={{
          width: '100%',
          height: 'calc(100% - 4px)',
          zIndex: top ? 6 : 1,
          position: 'absolute',
          top: 0,
          bottom: 0,
          // left: 0,
          right: 0,
        }}
        frameBorder='0'
        src={src}
        allowFullScreen
      />
    )
  }

  render() {
    const {
      hoveringNav1,
      hoveringNav2
    } = this.state
    const settings1 = {
      dots: false,
      infinite: false,
      speed: 250,
      slidesToShow: 1,
      slidesToScroll: 1,
      fade: true,
      nextArrow: hoveringNav1 ? <NextArrow fullScreen={this.state.fullScreen}/> : null,
      prevArrow: hoveringNav1 ? <PrevArrow fullScreen={this.state.fullScreen}/> : null,
    }
    const thumbSlideCount = this.state.fullScreen ? 5 : 3
    let settings2 = {
      dots: false,
      speed: 500,
      infinite: false,
      slidesToShow: this.props.sliderItems.length > thumbSlideCount ? thumbSlideCount + 0.3 : thumbSlideCount,
      slidesToScroll: 3,
      centerMode: false,
      nextArrow: hoveringNav2 ? <NextArrow small fullScreen={this.state.fullScreen}/> : null,
      prevArrow: hoveringNav2 ? <PrevArrow small fullScreen={this.state.fullScreen}/> : null,
      initialSlide: 0,
      focusOnSelect: false,
    }
    return (
      <div className={this.state.fullScreen ? "editor-carousel-fullscreen" : "editor-carousel"}>
        <div onMouseEnter={() => this.setState({hoveringNav1: true})} onMouseLeave={() => this.setState({hoveringNav1: false})}>
        {hoveringNav1 && <div className="full-screen-button">
        <Button
          disabled={false}
          loading={false}
          style={{
            backgroundColor: 'white'
          }}
          square
          icon={this.state.fullScreen ? <ContractIcon /> : <ExpandIcon />}
          onClick={this.toggleFullScreen}
        />
        </div>}
        <Slider {...settings1}
          afterChange={(idx) => this.setState({slide: idx})}
          ref={slider => (this.slider1 = slider)}>
          {this.props.sliderItems.map((item, idx) =>
            <div className="editor-carousel-preview" key={idx}>
                {item.type === 'img' ? this.renderImage(item.src) : this.renderVideo(item.src, false, this.state.slide === idx)}
            </div>
          )}
        </Slider>
        </div>
        <div style={{width: '100%', height: 4, backgroundColor: 'white'}} />
        <div style={{width: this.props.sliderItems.length > thumbSlideCount ? '100%' : 'calc(100% + 4px)'}}onMouseEnter={() => this.setState({hoveringNav2: true})} onMouseLeave={() => this.setState({hoveringNav2: false})}>
        <Slider {...settings2}
          ref={slider => (this.slider2 = slider)}
        >
          {this.props.sliderItems.map((item, idx) =>
            <div
              className="editor-carousel-navigation-thumb"
              key={idx}
              onClick={() => this.state.nav1.slickGoTo(idx)}
            >

              {item.type === 'img' ? this.renderThumbnail(item.src) : this.renderVideo(item.src, true)}
            </div>
          )}
        </Slider>
        </div>
      </div>
    )
  }
}

export default EditorCarousel
