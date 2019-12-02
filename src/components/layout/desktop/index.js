import React, { Component } from 'react'
import MainContainer from '../../../components/layout/mainContainer'
import Splash from './partials/splash'
import Footer from '../footer/footer'
import {Helmet} from "react-helmet";

import './desktop.css'

class Desktop extends Component {
  componentWillMount() {
    const { desktop, getDesktopParams } = this.props
    getDesktopParams()
  }

  render () {
  const { desktop } = this.props
  return(
    <MainContainer style={{padding: 0, maxWidth: 'none'}}>
    <Helmet>
      <meta name="robots" content="noindex" />
    </Helmet>
      <div className="desktop-page">
        <Splash release={desktop.release} windows={desktop.windows} mac={desktop.mac}/>
        <Footer/>
      </div>
    </MainContainer>
    )
  }
}

export default Desktop
