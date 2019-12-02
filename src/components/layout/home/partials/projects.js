import React, {Component} from 'react'
import Button from '../../../elements/button'
import { Link } from 'react-router-dom'

class Projects extends Component {
  render() {
    return (<div>
      <div className="contents wrapper projects" style={{marginBottom: 0}}>
        <div className='home-2-colums'>
          <div className="projects-image">
            <img style={{width: '100%', height: '100%', marginLeft: 0, paddingRight: 80}} src="https://s3.amazonaws.com/www.wevolver.com/images/welder-projects.jpg" />
          </div>
          <div style={{width: 50, flexShrink: 0}}/>
          <div className="featured-items column-70">
            <h2 style={{textAlign: 'left', fontWeight: 400, lineHeight: '1.2em'}}>For private & public projects</h2>
            <ul className="home-list">
              <li>Join thousands of hardware developers contributing to open source hardware projects from around the world, or develop proprietary technologies with selected team members in private.</li>
            </ul>
            <div style={{marginTop: 40}}>
            <Link to="/projects">
              <Button
               label="view projects"
               typeClass="blue"
              />
            </Link>
            </div>
          </div>
        </div>
      </div>
    </div>)
  }
}

export default Projects
