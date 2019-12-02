import { ActionTypes } from '../constants/index';

const desktop = (state = {release: null, windows: null, mac: null}, action) => {
  switch (action.type) {
    case ActionTypes.GET_DESKTOP_PARAMS_SUCCESS:

    let macDownload = ''
    let winDownload = ''
    action.payload.assets.forEach(function(asset) {
      if(asset.browser_download_url.indexOf('OSX') > -1) {
        macDownload = asset.browser_download_url
      } else if(asset.browser_download_url.indexOf('win') > -1) {
        winDownload = asset.browser_download_url
      }
    })

      return {release: action.payload.tag_name, windows: winDownload, mac: macDownload}
    default:
      return state
  }
}

export default desktop
