import React, { Component } from 'react'
import MainContainer from '../../../components/layout/mainContainer'
import Image from '../../elements/ironImage'
import { Link } from 'react-router-dom'
import Footer from '../footer/footer'

import './about.css'

class Home extends Component {
  render () {
  return(
    <MainContainer style={{padding: 0, maxWidth: 'none'}}>
      <div className="about">
      {false &&
      <div className="about-splash">
        <div className="about-splash-image">
          <Image srcLoaded="https://v1.wevolver.com/static/images/flatpages/about/abouthero.jpg"/>
        </div>
        <div className="about-splash-text">
         <div id="site-content">Why We Build Welder</div>
        </div>
      </div>
      }
      <div className="line-container">
        <div className="wrapper">
          <h1>Why We Build Welder</h1>
          <p>
            Humans need technological innovation to survive and thrive.
            New solutions enable us to deal with local and global challenges.
            and new interpretations of the world enable us to grow.
            <br/>
            Recently many changes are happening that make it cheaper and easier to develop hardware.
            <br/>
            <ol>
              <li>Digital manufacturing lets you iterate quickly, at low cost, and produce locally in small batches.</li>
              <li>Access to affordable electronics is increasing the scope and quality of the technology you can create.</li>
              <li>New channels are enabling you to finance and market your business. For example crowdfunding and social media.</li>
              <li>Ideas, technologies, and practices from the field of software development are transferring into the world of hardware.</li>
            </ol>
            This is a time, with massive challenges in fields such as food, energy, and healthcare, but it's also a time of unprecedented opportunity thanks to the democratization of technology.
            <br/>
            We think that effective, networked collaboration can hugely enhance the speed and quality of your hardware development.
            Software developers have been a trailblazer for this. Learning from and leveraging technologies or methods from software teams enables hardware developers to reduce friction during their work, thus increasing the chance of success, and the level of innovation.
          </p>
        </div>
      </div>
      <div className="line-container">
        <div className="wrapper">
          <h1>Our Approach</h1>
          <p>
          Better collaboration enables engineers to focus on developing better products. Welder.app is based on the idea of providing hardware engineering teams a powerful technology, that for the past decade has been the underlying infrastructure that enables software developers to collaborate super effectively.
          <br/> <br/>
          This technology is a version control system called 'Git.' Its ability to enable fast, secure, and decentralized collaboration has taken the world of software development by storm and has supported the creation of many of the software innovations we use today.
          </p>
        </div>
      </div>
      <div className="line-container">
        <div>
          <div class="embed-container">
            <iframe src="https://www.youtube.com/embed/gvYcYm65Czo" frameBorder="0" ></iframe>
          </div>
        </div>
      </div>
      <div className="line-container">
        <div className="wrapper">
          <h1>About Us</h1>
          <p>
            Welder.app spun out of Wevolver.
            Wevolver started in 2014 with the mission of 'enabling anyone, anywhere to develop better hardware.'
            Initially the Wevolver team focused on supporting the upcoming open source hardware movement with a platform to share and collaborate on projects.
            The platform that Wevolver created was acknowledged with several awards, including the SXSW Innovation Award and the Accenture Innovation Award, and was listed by Fast Company in the Top 20 Most Innovative Web Platforms among giants like Facebook, Slack, and IBM Watson.
            <br/> <br/>
            Over time Wevolver became more and more used as a knowledge base instead of a repository & collaboration environment.
            To ensure Wevolver could still fulfill the needs both the open source hardware community, Wevolver spun off the platform and launched it as Welder.
            <br/> <br/>
            Welder is an open source project. Currently big parts of our are open source, and we are working on swapping parts of our code base that use proprietary 3rd party software that prevents us from fully open sourcing the code base.
          </p>
        </div>
      </div>
      </div>
      <Footer />
    </MainContainer>
    )
  }
}

export default Home
