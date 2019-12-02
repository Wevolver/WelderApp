import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from "react-helmet"
import MainContainer from '../../../components/layout/mainContainer'
import Footer from '../footer/footer'
import './siteMap.css'


function renderLinkList(list) {
  return (<div className="site-map-link-row">
    {list.map(link =>
      <div className="site-map-link">
        <Link to={link.url} >{link.name}</Link>
        <div>{link.description}</div>
      </div>
    )}
  </div>)
}

class SiteMap extends Component {
  render () {
  const gettingStartedLinks = [
    {
      url: "",
      name: "Home Page",
      description: "What is Wevolver?",
    },
    {
      url: "/projects",
      name: "Projects",
      description: "Explore hundreds of high quality projects.",
    },
    {
      url: "/about",
      name: "About Wevolver",
      description: "Meet the team behind Wevolver.",
    },
  ]

  const discoverLinks = [
    {
      url: "/projects?tags=staff+pick",
      name: "Staff Picks",
      description: "The very best projects on Wevolver.",
    },
    {
      url: "/projects?tags=soft+robotics",
      name: "Soft Robotics",
      description: "Discover projects about robots made of soft materials.",
    },
    {
      url: "/projects?tags=exoskeleton",
      name: "Exoskeletons",
      description: "Explore projects that allow for increased human strength and endurance.",
    },
    {
      url: "/projects?tags=3d+printing",
      name: "3D printing",
      description: "Discover projects related to 3D printing.",
    },
    {
      url: "/projects?tags=drone",
      name: "Drone",
      description: "Discover flying robots.",
    },
  ]

  const legalLinks = [
    {
      url: "/privacy-policy",
      name: "Privacy Policy",
      description: "Learn more about your privacy rights in Wevolver.",
    },
    {
      url: "/terms",
      name: "Terms and Conditions",
      description: "Learn more about the rules of Wevolver",
    },
  ]

  return(
    <div>
      <Helmet>
        <title> Welder Site Map </title>
      </Helmet>
      <MainContainer>
        <div className="main-page-title" style={{paddingBottom: 16}}>
          <h1 style={{textAlign: 'center'}} id="site-content">
            Welder Site Map
          </h1>
        </div>

        <h2 className="form-section-title">Getting Started</h2>
        {renderLinkList(gettingStartedLinks)}
        <h2 className="form-section-title">Discover</h2>
        {renderLinkList(discoverLinks)}
        <h2 className="form-section-title">Legal</h2>
        {renderLinkList(legalLinks)}
      </MainContainer>
      <div className="faded-line-reverse grey" style={{marginTop: 124}}></div>
      <MainContainer>
      <Footer />
      </MainContainer>
    </div>
    )
  }
}

export default SiteMap
