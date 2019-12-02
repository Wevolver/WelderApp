import auth0 from 'auth0-js';
import { API } from '../constants/api'

const CLIENT_ID = ''

class Auth {

  accessToken = null
  idToken = null
  expiresAt = null
  tokenRenewalTimeout = null
  profile = {}

  constructor() {
    const user_string = localStorage.getItem('wevolverUser')
    const user = user_string ? JSON.parse(user_string) : {}
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.getAccessToken = this.getAccessToken.bind(this);
    this.getIdToken = this.getIdToken.bind(this);
    this.getProfile = this.getProfile.bind(this);
    this.renewSession = this.renewSession.bind(this);
    this.scheduleRenewal();
    this.profile = Object.assign({}, this.profile, {user_id: user._id})
  }

  auth0 = new auth0.WebAuth({
    domain: 'welder.eu.auth0.com',
    clientID: CLIENT_ID,
    redirectUri: API.callbackUrl || '',
    responseType: 'token id_token',
    audience: 'http://localhost:5000/api/v2',
    scope: 'openid email profile'
  });

  handleAuthentication() {
    return new Promise((resolve, reject) => {
      this.auth0.parseHash((err, authResult) => {
        if (err) return reject(err);
        if (!authResult || !authResult.idToken) {
          return reject(err);
        }
        this.setSession(authResult);
        resolve();
      });
    })
  }

  scheduleRenewal() {
    let expiresAt = this.expiresAt;
    const timeout = expiresAt - Date.now();
    if (timeout > 0) {
      this.tokenRenewalTimeout = setTimeout(() => {
        this.renewSession();
      }, timeout);
    }
  }

  getExpiryDate() {
    return JSON.stringify(new Date(this.expiresAt));
  }

  login() {
    localStorage.setItem('redirectAfterLogin', window.location.pathname)
    this.auth0.authorize()
  }

  isAuthenticated() {
    return new Date().getTime() < this.expiresAt;
  }

   getAccessToken() {
    return this.accessToken;
  }

  getIdToken() {
    return this.idToken;
  }

  logout() {
    // Remove tokens and expiry time
    this.accessToken = null;
    this.idToken = null;
    this.expiresAt = 0;

    // Remove isLoggedIn flag from localStorage
    localStorage.removeItem('wevolverUser');
    clearTimeout(this.tokenRenewalTimeout);

    this.auth0.logout({
      clientID: CLIENT_ID,
      returnTo: `${window.location.protocol}//${window.location.host}`
    });
  }

  getProfile() {
    return this.profile;
  }

  renewSession() {
      return new Promise((resolve, reject) => {
      this.auth0.checkSession({}, (err, authResult) => {
         if (authResult && authResult.accessToken && authResult.idToken) {
           this.setSession(authResult);
           resolve();
         } else if (err) {
           this.logout();
           console.log(err);
           reject();
         }
      });
    });
  }

  setUserId(id) {
    if(id) this.profile['user_id'] = id
  }

  setSession(authResult) {
    const user_string = localStorage.getItem('wevolverUser')
    const user = user_string ? JSON.parse(user_string) : {}
    // Set the time that the access token will expire at
    let expiresAt = (authResult.expiresIn * 1000) + new Date().getTime();
    this.accessToken = authResult.accessToken;
    this.idToken = authResult.idToken;
    this.expiresAt = expiresAt;
    this.scheduleRenewal();
    this.profile = Object.assign({}, authResult.idTokenPayload, {user_id: user._id})

  }
}

const auth = new Auth()
export default auth
