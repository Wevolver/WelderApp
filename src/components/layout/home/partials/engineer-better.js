import React, {Component} from 'react'
import Button from '../../../elements/button'
import { Link } from 'react-router-dom'


class EngineerBetter extends Component {

  render() {
    return (
      <div className="contents wrapper" style={{textAlign: 'left', padding: '100px 0'}}id="site-content">
          <h2 style={{fontWeight: 400}}>Open Source Software</h2>
          <p className="subtitle">
            Welder's Git Server, Desktop Client, and 3D file render software are open source.<br/>
            Be part of the community or contribute to it's development<br/>
          </p>
          <div style={{height: 20}} />
          <a href={"https://github.com/Wevolver"} target="_blank">
            <Button label="Code on Github" typeClass="blue" style={{marginLeft: 0}} />
          </a>
      </div>
    )
  }
}

export default EngineerBetter
