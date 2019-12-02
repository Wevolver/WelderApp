import React, {Component} from 'react'
import TwitterIcon from '../../icons/twitter'
import FacebookIcon from '../../icons/facebook'
import YouTubeIcon from '../../icons/youtube'
import InstagramIcon from '../../icons/instagram'
import { Link } from 'react-router-dom'

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: ''
    };
  }

  updateInputValue(evt) {
    this.setState({
      inputValue: evt.target.value
    });
  }

  render() {
    return (<section className='footer'>
      <div className="footer-container wrapper">
        <div className="pane fifth">
          <h1>Welder</h1>
          <div className="vertical">
            <Link to={"/"}>
              <div>Home</div>
            </Link>
            <Link to={"/projects"}>
              <div>Projects</div>
            </Link>
            {<Link to={"/about"}>
              <div>About</div>
            </Link>}
          </div>
        </div>

        <div className="pane fifth">
          <h1>Resources</h1>
          <div className="vertical">
            {false && <Link to={"/sitemap"}>
              <div>Site Map</div>
            </Link>}
            <a href="mailto:info@wevolver.com">Contact</a>
            <a href="https://blog.wevolver.com/" target="_blank">Wevolver Blog</a>
            <Link to={"/desktop"}>
              <div>Desktop Client</div>
            </Link>
          </div>
        </div>

        <div className="pane forty">
          <h1>Newsletter</h1>
          <p>Get notified about major changes to Welder.</p>
          <form action="https://wevolver.us2.list-manage.com/subscribe/post?u=b9b8a21a2438fd4fbe17aa6a9&amp;id=ad4de55d17" method="post" id="mc-embedded-subscribe-form" target="_blank" noValidate>
            <input style={{width: 320}} value={this.state.inputValue} onChange={evt => this.updateInputValue(evt)} type="email" name="EMAIL" className="required email" id="mce-EMAIL" placeholder="Follow the Welder Newsletter (email)"/>
            <button type="submit" style={{position: 'relative', top: -2, borderRadius: 2, color:"#424242", borderColor:"#bdbdbd"}}>Subscribe</button>
          </form>
        </div>
        <div style={{textAlign: 'center', margin: '20px auto', flexShrink: 0}}>
        <img src="https://s3.amazonaws.com/www.wevolver.com/images/flag_black_white_low.jpg" style={{margin: 'auto'}}width={140}/>
        <p style={{fontSize: 14, textAlign: 'left', padding: '0 20px', maxWidth: 300, margin: 'auto'}}>
          This project has received funding from the European Union’s Horizon 2020 research and innovation programme under grant agreement No. 780298
        </p>
        </div>
      </div>
      <ul className="address middle">
        <li style={{color: "#424242", fontWeight: 700}} >
          Powered by <a style={{color: "#424242", textDecoration: "underline"}} href="https://www.wevolver.com?ref=welder" target="_blank">Wevolver</a>
        </li>
      </ul>
    </section>)
  }
}

export default Footer
