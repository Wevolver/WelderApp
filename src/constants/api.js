const buildEnv = process.env.BUILD_ENV || 'development'

const ENPOINT_LIST = {
  development: {
    authUrl: 'http://localhost:8000/o/proxy-client-token',
    resetUrl: 'http://localhost:8000/password/reset/',
    apiUrl: 'http://localhost:8000/api/2',
    apiUrlV2: 'http://localhost:5000/api/v2',
    welderUrl: 'http://localhost:9000',
    callbackUrl: 'http://localhost:3000/callback',
  },
  staging: {
    authUrl: '',
    resetUrl: '',
    apiUrl: '',
    apiUrlV2: '',
    welderUrl: '',
    callbackUrl: '',
  },
  production: {
    authUrl: 'https://api.wevolver.com/o/proxy-client-token',
    resetUrl: 'https://api.welder.app/password/reset/',
    apiUrl: 'https://api.welder.app/api/2',
    apiUrlV2: 'https://api.wevolver.com/welder/api/v2',
    welderUrl: 'https://projects.wevolver.com',
    callbackUrl: 'https://www.welder.app/callback',
  }
}
export const API = ENPOINT_LIST[buildEnv]
