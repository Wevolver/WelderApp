import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Redirect, Switch } from 'react-router'
import ReactGA from 'react-ga';

import logo from './logo.svg'
import './App.css'
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

import Profile from '../../containers/Profile'
import Register from '../../containers/Register'
import UserSettings from '../../containers/userSettings'
import PasswordReset from '../../containers/PasswordReset'
import Project from '../../containers/Project'
import Discover from '../../containers/Discover'
import Desktop from '../../containers/Desktop'
import Home from '../../containers/Home'
import About from '../../containers/About'
import Careables from '../../containers/Careables'
import ProjectCreate from '../../containers/ProjectCreate'
import CareablesDiscover from '../../containers/Careables/Discover'
import Terms from '../../components/layout/terms'
import Privacy from '../../components/layout/privacyPolicy'
import SiteMap from '../../components/layout/siteMap'
import Create from '../../containers/Create'
import SearchResults from '../../containers/SearchResults'
import NotFound from '../../components/layout/notFound'
import { ToastContainer } from 'react-toastify'
import Navbar from '../Navbar'
import Modals from '../Modals'
import CrossIcon from '../../components/icons/cross'
import { isLoggedIn } from '../../modules/authentication'
import { getAuthUser, editAuthUser } from '../../actions/index'
import ScrollToTopRoute from './ScrollToTopRoute';
import {Helmet} from "react-helmet";
import Cookies from 'universal-cookie';
import CookieBanner from 'react-cookie-banner';
import Callback from '../Callback'

const cookies = new Cookies();


class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      'accepts-cookies': this.props.auth.accepts_cookies || cookies.get('accepts-cookies') || false,
    }
    this.gotUser = false
  }

  componentWillMount() {
    if(this.props.auth && this.props.auth.profile && !cookies.get('accepts_cookies')){
      cookies.set('accepts_cookies', (this.props.auth.accepts_cookies || false))
    }
  }

  UNSAFE_componentWillReceiveProps = (nextProps) => {}

  handleGdprAccept = () => {
    const userUrl = isLoggedIn()
    if(window.location.hostname === 'www.wevolver.com') window.heap.load("");
    ReactGA.pageview(window.location.pathname + window.location.search);
    if(userUrl && this.props.auth && this.props.auth.profile){
       const { dispatch } = this.props
       let profile = this.props.auth.profile
       profile.accepts_cookies = true
       if(!profile.mail_recommendations){
          profile.mail_recommendations = false
       }
       dispatch(editAuthUser(this.props.auth.pk, profile))
    }
  }



  render() {
    const {
      match,
      redirect
    } = this.props
    const CloseButton = ({ closeToast }) => (
      <button onClick={closeToast} className="notification-close"><CrossIcon /></button>
    );
    if(redirect) return <Redirect to={redirect} />
    return (
      <div className="App">
        <Helmet>
          <title>Welder | Blueprints & files of engineering projects</title>
          <meta name="description" content="Discover technologies like robotics, exoskeletons and drones. Understand the design, characteristics, and engineering process." data-react-helmet="true"/>
          <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
          <meta charset="utf-8" />
        </Helmet>
        <a className="skip-to-content" href="#site-content">Skip to content</a>
        <Route component={Navbar} />
        <Modals/>
        <ToastContainer closeButton={<CloseButton/>}/>
        <Switch>
          <ScrollToTopRoute exact path={`${match.url}`} component={Home} />
          <ScrollToTopRoute exact path={`${match.url}register`} component={Register} />
          <ScrollToTopRoute exact path={`${match.url}callback`} component={Callback} />
          <ScrollToTopRoute exact path={`${match.url}join`} component={Register} />
          <ScrollToTopRoute exact path={`${match.url}projects`} component={Discover} />
          <ScrollToTopRoute exact path={`${match.url}submit`} component={Create} />
          <ScrollToTopRoute exact path={`${match.url}search/:query?`} component={SearchResults} />
          <ScrollToTopRoute exact path={`${match.url}careables`} component={CareablesDiscover} />
          <ScrollToTopRoute exact path={`${match.url}careables/create`} component={ProjectCreate} />
          <ScrollToTopRoute exact path={`${match.url}create`} component={ProjectCreate} />
          <ScrollToTopRoute exact path={`${match.url}terms`} component={Terms} />
          <ScrollToTopRoute exact path={`${match.url}privacy-policy`} component={Privacy} />
          <ScrollToTopRoute exact path={`${match.url}sitemap`} component={SiteMap} />
          <ScrollToTopRoute exact path={`${match.url}desktop`} component={Desktop} />
          <ScrollToTopRoute exact path={`${match.url}about`} component={About} />
          <ScrollToTopRoute exact path={`${match.url}profile/:userSlug`} component={Profile} />
          <ScrollToTopRoute exact path={`${match.url}user-settings/:userSlug`} component={UserSettings} />
          <ScrollToTopRoute exact path={`${match.url}password-reset/:uuid([0-9A-Za-z_\-]+)/:token`} component={PasswordReset} />
          <ScrollToTopRoute path={`${match.url}:userSlug/:projectSlug/:branch?/:type?/:folderPath([-A-Za-z0-9+&@#\/%?=~_|!:,.;\\)\\(\\s]+[-A-Za-z0-9+&@#\/%=~_|])?`} component={Project} />
          <Route component={NotFound} />
        </Switch>
        <CookieBanner
          disableStyle={true}
          message="We use analytics to learn how we can make future improvements to your online experience. By continuing to browse the site you're agreeing to our use of cookies."
          buttonMessage='Agree'
          dismissOnScroll={true}
          dismissOnScrollThreshold={150}
          onAccept={() => this.handleGdprAccept()}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    redirect: state.wevolverApp.location.redirect,
    auth: state.wevolverApp.auth
  }
}

App = connect(
  mapStateToProps,
)(App)

export default App;
