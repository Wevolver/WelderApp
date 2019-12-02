import React, { Component } from "react";
import { Link } from 'react-router-dom'
import Slider from "react-slick";
import SearchHomeTile from '../searchPage/searchHomeTile'
import ChevronLeftIcon from '../icons/chevron-left'
import ChevronRightIcon from '../icons/chevron-right'
import FollowTagButton from '../../containers/FollowTagButton'
import { API } from '../../constants/api'
import './projectCarousel.css'

function NextArrow(props) {
  const { className, style, onClick } = props;
  const isDisabled = className.indexOf('slick-disabled') > -1
  return (
    <div
      // className={className}
      className={'home-slider-arrow right-arrow hidden-in-small'}
      style={{ cursor: isDisabled ? 'default' : 'pointer' }}
      onClick={onClick}
    >
      <ChevronRightIcon fill={isDisabled ? '#ddd' : '#424242'} width={40} height={40}/>
    </div>
  );
}


function PrevArrow(props) {
  const { className, style, onClick } = props;
  const isDisabled = className.indexOf('slick-disabled') > -1
  return (
    <div
      className={'home-slider-arrow left-arrow hidden-in-small'}
      style={{ cursor: isDisabled ? 'default' : 'pointer' }}
      onClick={onClick}
    >
      <ChevronLeftIcon fill={isDisabled ? '#ddd' : '#424242'} width={40} height={40}/>
    </div>
  );
}


class ProjectCarousel extends Component {

  constructor(props) {
   super(props);
   this.state = {};
 }

  componentDidMount = () => {
    const {
      load
    } = this.props
    if(load.tag === 'featured'){
    this.props.search(load.name, undefined, load.limit, load.hidden_tags)
  } else {
    this.props.search(load.name, load.tag, load.limit, load.hidden_tags)

  }
  }

  render() {
    const settings = {
      dots: false,
      infinite: false,
      arrows: false,
      speed: 300,
      draggable: false,
      slidesToShow: 5,
      slidesToScroll: 5,
      rows: this.props.rows || 1,
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />,
      responsive: [
        {
          breakpoint: 1480,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 4,
          }
        },
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        }
      ]
    };

    let getTag = (searchTag) => {
      let url = `${API.apiUrlV2}/tags?options=${searchTag}`
      return fetch(url).then(function(response) {
        return response.json()
      })
      .then(function(responseJson) {
        return responseJson
      })
    }

    const {
      projects
    } = this.props

    if(!this.state.followCount && this.state.followCount !==0){
      getTag(this.props.load.tag).then(val => {
        let count = val.followCount || 0
        this.setState({followCount: count});
      })
    }

    let tiles = projects ? projects.results : false
    if(!tiles || tiles.constructor !== Array) tiles = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]
      // <FollowTagButton tagCount={this.state.followCount} tagId={this.props.load.tag}/>
    return (
      <div className="project-carousel-container">
      <div className="project-carousel-title">
      <Link className="carousel-header" to={(this.props.load.tag !== "featured" ? `/projects?tags=${this.props.load.tag.replace(' ', '+')}` : '/projects')}><h3 style={{color: '#424242 !important', marginBottom: 0, marginTop: 64}}>{this.props.load.title}<ChevronRightIcon  fill='#424242' style={{stroke: '#424242', strokeWidth: '2px', marginLeft: '.5rem'}} height={16} width={16}/></h3></Link>
      {this.props.load.tag !== 'featured' && <FollowTagButton tagId={this.props.load.tag}/>}
      </div>
      <div style={{width: 'calc(100% + 16px)', transform: 'translate(-8px, 0)'}}>
        {tiles &&
        <Slider {...settings}>
          {tiles.map((tile, index) =>
            <SearchHomeTile
              key={index}
              result={tile}
              index={index}
            />
          )}
        </Slider>
      }
      </div>
      </div>
    );
  }
}

export default ProjectCarousel
