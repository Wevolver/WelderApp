import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import Button from '../../../elements/button'
import Image from '../../../elements/ironImage'


class Splash extends Component {

  render() {
    return (
      <section className="splash">
        <div  className="splash-img"><Image contain srcLoaded="https://s3-eu-west-1.amazonaws.com/wevolver/flatpage/square.png"/></div>
        <div className="contents wrapper">
          <hgroup>
            <h1>Develop Better <br /> Hardware Together</h1>
            <h2 className="subtitle">
              Welder is a file sharing and version management solution,<br/>empowering both private teams and open communities.
            </h2>
          </hgroup>
        </div>
      </section>
    )
  }
}

export default Splash
