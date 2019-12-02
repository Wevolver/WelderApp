import React, {Component} from 'react'
import Image from '../../../elements/ironImage'

class Features extends Component {
  render() {
    return (<div>
      <div className="contents wrapper features" style={{marginTop: 50, marginBottom: 20}}>
        <div className='home-2-colums'>
          <div className="featured-items column-70">
            <h2 style={{textAlign: 'left', fontWeight: 400, lineHeight: '1.2em'}}>Let nothing stop you from innovating</h2>
            <ul className="home-list">
              <li>Better organization of your project's files; always one clear latest revision.</li>
              <li>Review &amp; retrieve any past moment in time, with unlimited project-wide revision history.</li>
              <li>Trace back past decisions and considerations using annotated revisions.</li>
            </ul>
            {false && <a className="button">Features</a>}
          </div>
          <div style={{width: 50, flexShrink: 0}}/>
          <div>
            <img style={{width: '100%'}}src="https://s3-eu-west-1.amazonaws.com/wevolver/flatpage/plen-computers.jpg" />
          </div>
        </div>
      </div>
    </div>)
  }
}

export default Features