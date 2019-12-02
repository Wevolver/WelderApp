import React, {Component} from 'react'
import Button from '../../../elements/button'
import { Link } from 'react-router-dom'

class Projects extends Component {
  render() {
    return (<div>
      <div className="contents wrapper" style={{marginTop: 75, marginBottom: 75}}>
        <div style={{marginBottom: '3rem'}} className='home-2-colums'>
          <div className="column-40">
            <h2 style={{textAlign: 'left', fontWeight: 400}}>Discover, Make, and Share</h2>
            <h3 style={{textAlign: 'left', fontWeight: 400, marginBottom: 0}}>Design for care collection</h3>
            <p> Careables is an open and inclusive approach to healthcare for citizens based on digital fabrication, distributed manufacturing and collaborative making. </p>
          </div>
          <div style={{width: 50, flexShrink: 0}}/>
          <div>
            <Link to="/careables">
              <img className="careables-tile" style={{width: '100%'}} src="https://s3-eu-west-1.amazonaws.com/wevolver/flatpage/Careables+Tile.jpg"/>
            </Link>
          </div>
        </div>
        <div className='home-2-colums'>
          <div className="column-40">
            <h3 style={{textAlign: 'left', fontWeight: 400, marginBottom: 0}}>Open Design of Trusted Things</h3>
            <p>OpenDoTT is a PhD programme from the University of Dundee and Mozilla to explore how to build a more open, secure, and trustworthy Internet of Things.<br/>
Technologists, designers, and researchers create and advocate for connected products that are more open, secure, and trustworthy.</p>
          </div>
          <div style={{width: 50, flexShrink: 0}}/>
          <div>
            <img style={{width: '100%'}}src="https://wevolver.s3-eu-west-1.amazonaws.com/flatpage/OpenDott.jpg"/>
          </div>
        </div>
      </div>
    </div>)
  }
}

export default Projects
