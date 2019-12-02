import axios from 'axios'
import jwtDecode from 'jwt-decode'
import auth from '../modules/auth'

export class ServerError extends Error {
  response: Object;

  constructor(response: Object, ...params: any): Error {
    super(...params);

    Error.captureStackTrace(this, ServerError);

    this.name = 'ServerError';
    this.response = {};

    return this;
  }
}

export function parseError(error: string): string {
  return error || 'Something went wrong';
}


export function getToken() {
  const auth_token = auth.getAccessToken()
  const profile = auth.getProfile()
  if (auth.isAuthenticated() && auth_token){
    return `${auth_token}:${profile['user_id']}`
  } else if(profile['user_id']) {
    return `-:${profile['user_id']}`
  }
  return null
}

export function isLoggedIn() {
  return getToken() ? true : false
}
/**
 * Fetch data
 *
 * @param {string} url
 * @param {Object} options
 * @param {string} [options.method] - Request method ( GET, POST, PUT, ... ).
 * @param {string} [options.payload] - Request body.
 * @param {Object} [options.headers]
 *
 * @returns {Promise}
 */
export function request(url: string, options: Object = {}): Promise<*> {
  const config = {
    method: 'GET',
    ...options,
  };
  const errors = [];

  if (!url) {
    errors.push('url');
  }

  if (!config.payload && (config.method !== 'GET' && config.method !== 'DELETE')) {
    errors.push('payload');
  }

  const auth_token = getToken()

  if (errors.length) {
    throw new Error(`Error! You must pass \`${errors.join('`, `')}\``);
  }

  let headers = {
    Accept: 'application/json, text/plain, */*',
    'Content-Type': 'application/json',
    ...config.headers,
  };

  if(headers.Authorization === 'welder') {
    headers.Permissions = localStorage.getItem('WelderPermissions')
    delete headers.Authorization
  }
  if (!headers.Authorization && auth_token && !config.s3) {
    headers = Object.assign(headers, {Authorization:`Bearer ${auth_token}`})
  }
  if(headers.Authorization === 'github') {
    delete headers.Authorization
  }

  const params: Object = {
    headers,
    url,
    method: config.method,
    onDownloadProgress: (progressEvent) => {},
    onUploadProgress: (progressEvent) => {},
  };

  if (params.method !== 'GET') {
    params.data =  config.payload;
  }

  if(config.responseType) params.responseType = config.responseType

  return axios(params)
  .then(async (response) => {
      const contentType = response.headers['content-type'];
      const permissions = response.headers['permissions'];
      if (permissions) {
        localStorage.setItem('WelderPermissions', permissions)
      } else {
        localStorage.setItem('WelderPermissions', '')
      }
      return response.data;
  })
}
