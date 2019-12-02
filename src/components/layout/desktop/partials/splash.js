import React, {Component} from 'react'
import Button from '../../../elements/button'

class Splash extends Component {

  render() {

    const { release, windows, mac } = this.props
    return (<section className="splash">
      <div className="wrapper" style={{maxWidth: 500}}>
        <div className="center">
        <h1 className="main-title">Desktop Client</h1>
        <p style={{marginBottom: -10}}>
          Powered by Wevolver
        </p>
        <img src="https://www.wevolver.com/logo.png" width={80}/>
        <div>
          <p>
            Wevolver's lightweight desktop client enables you to
            <b> sync changes </b>
            between a project on your computer and Welder.app. Adopt a fast, secure, and iterative development workflow.
          </p>
        </div>


        <div className="centered-row">
        <a className="download-button" href={windows}>
          <Button
            label="Download for Windows"
            typeClass="blue"
          />
        </a>
        <a className="download-button" href={mac}>
          <Button
            label="Download for OSX"
            typeClass="blue"
          />
        </a>
      </div>

        <div className="version-note"style={{marginBottom: 0}}>
          <p>Requires a 64 bit version of Windows 7 (or later) or macOS.</p>
        </div>
        <div className="os-note">The Desktop Client is fully open source. <a href="https://github.com/Wevolver/Desktop2">Code on Github</a></div>
      </div>
    </div>
      <div className="faded-line-reverse grey"></div>
    </section>)
  }
}

export default Splash
