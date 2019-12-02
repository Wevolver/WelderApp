import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Button from '../../components/elements/button'
import DropdownMenu from '../../components/elements/dropdown'
import MainContainer from '../../components/layout/mainContainer'
import MenuIcon from '../icons/menu'
import TagsSearchBox from '../../containers/Tags/TagsSearch'
import auth from '../../modules/auth.js';

import './navbar.css'

class Navbar extends Component {

  state = {
    isSearching: false
  }

  constructor(props) {
    super(props)
    this.openRegister = this.openRegister.bind(this)
    this.gotUser = false
  }

  getUser = () => {
    const { dispatch } = this.props
    if (!this.gotUser) {
      this.gotUser = true
      this.props.getAuthUser(auth.getProfile(), auth.getAccessToken())
    }
  }

  componentDidMount() {
    if (localStorage.getItem('wevolverUser')) {
      auth.renewSession()
      .then(() => this.getUser())
    }
  }

  openRegister() {
    auth.login()
  }

  handleLinkClick = () => {
    this.refs.dropdown.hide()
  }

  onLogOut = () => {
    auth.logout()
    this.props.logOut()
  }

  renderLoginSignup = (className) => {
    const {
      auth,
    } = this.props
    if(auth.isAuthenticated) return null
    const unconfirmedLogIn = localStorage.getItem('wevolverUser') && !auth.isAuthenticated

    return(
      <div className={`no-auth ${className}`}>
        <Button
          onClick={this.openRegister}
          typeClass="white"
          label="SIGNUP / LOGIN"
          loading={unconfirmedLogIn || auth.isRunning}
        />
      </div>
    )
  }

  renderFlatPageLinks = (className) => {
    let path = window.location.pathname
    const search = window.location.search
    if(search) path = null
    let direction = className === "hidden-in-large" ? "column" : "row"
    return(
      <div style={{display: 'flex', flexDirection: direction }}>
        <Link to={"/desktop"} className={className}>
          <Button className="drop-down-item" label="Desktop Client" typeClass="subtle white" style={{height: 37, fontWeight: path === '/desktop' ? 'bold' : 'normal'}}onClick={this.handleLinkClick}/>
        </Link>
      </div>
    )
  }

  render() {
    const {
      auth,
      auth0
    } = this.props

    let navbar_style = {}
    if(process.env.NODE_ENV === "development"){
      // navbar_style.background = '#ff61a7'
    }
    let path = window.location.pathname
    if(path) path = path.split('/')
    if(path.length > 1) path = path[1]
    return (
      <div className="navbar" style={navbar_style}>

        <div className="navbar-inner">
          <div style={{display: 'flex', alignItems: 'center'}}>
            <Link to={"/"} className={this.state.isSearching ? "hidden-in-small" : "" } style={{color: 'white', fontWeight: 700, paddingLeft: 12, paddingRight: 12}}>WELDER</Link>
            <Link to={"/projects"}>
              <Button label="Projects" className={this.state.isSearching ? "hidden-in-small" : ""} typeClass="subtle white" style={{height: 37, fontWeight: path === 'projects' ? 'bold' : 'normal'}} onClick={this.handleLinkClick}/>
            </Link>
            <Link to={"/about"}>
              <Button label="About" className={this.state.isSearching ? "hidden-in-small" : ""} typeClass="subtle white" style={{height: 37, fontWeight: path === 'about' ? 'bold' : 'normal'}} onClick={this.handleLinkClick}/>
            </Link>
            {this.renderFlatPageLinks("hidden-in-small")}
          </div>
          <div>

          {this.renderLoginSignup("hidden-in-small")}
          <div style={{display: 'flex', alignItems: 'center'}}>
          {auth.isAuthenticated &&
            <DropdownMenu
              ref="dropdown"
              navbar
              label={
                <div>
                  <div className="hidden-in-large"><Button icon={<MenuIcon />} square/></div>
                  <div className="hidden-in-small"><Button typeClass="subtle white" label={`${auth.first_name || ''} ${auth.last_name || ''}`} /></div>
                </div>
              }
            >
              {this.renderFlatPageLinks("hidden-in-large")}
              <hr className="hidden-in-large" />
              <Link to={"/profile/" + auth.slug }><Button className="drop-down-item" onClick={this.handleLinkClick} label="Profile" typeClass="subtle white"/></Link>
              <Link to={"/user-settings/" + auth.slug }><Button className="drop-down-item" onClick={this.handleLinkClick} label="Account Settings" typeClass="subtle white"/></Link>
              <a href="mailto:info@wevolver.com?subject=User Feedback"><Button className="drop-down-item" label="Leave Feedback" typeClass="subtle white" /></a>
              <Button className="drop-down-item" label="Log Out" onClick={this.onLogOut} typeClass="subtle white" />
            </DropdownMenu>
          }

          {!auth.isAuthenticated &&
            <div className="hidden-in-large">
              <DropdownMenu
              ref="dropdown"
              navbar
              label={
                <div>
                  <div><Button icon={<MenuIcon />} square/></div>
                </div>
              }
            >
              {this.renderFlatPageLinks()}
              <hr />
              {this.renderLoginSignup("hidden-in-large")}
            </DropdownMenu>
            </div>
          }
          </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Navbar
