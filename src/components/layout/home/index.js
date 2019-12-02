import React, { Component } from 'react'
import MainContainer from '../../../components/layout/mainContainer'
import Splash from './partials/splash.js'
import EngineerBetter from './partials/engineer-better.js'
import FeaturedOn from './partials/featured-on.js'
import Footer from '../footer/footer'
import ProjectCarousel from '../../../containers/ProjectCarousel'
import Features from './partials/features'
import Projects from './partials/projects'
import Careables from './partials/careables'

import './home.css'

class Home extends Component {


  render () {

  return(
    <div>
      <div className="home-page">
        <Splash />
        <div className="faded-line"></div>
        <Features />
        <Projects />
        <div className="faded-line-reverse"></div>
        <Careables/>
        <div className="faded-line"></div>
        <div className="home-page-container">
          <FeaturedOn />
        </div>
        <div className="faded-line-reverse"></div>
        <div className="home-page-container">
          <EngineerBetter />
        </div>
        <div className="faded-line-reverse grey"></div>
        <MainContainer>
          <Footer />
        </MainContainer>
      </div>
    </div>
    )
  }
}

export default Home
