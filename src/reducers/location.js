import { ActionTypes } from '../constants/index';

const locationDefault = {
  folderPath: null,
  folders: [],
}

const location = (state = locationDefault, action) => {
  switch (action.type) {
    case ActionTypes.SET_CURRENT_FOLDER_PATH:
      return Object.assign({}, state, action.payload)
    case ActionTypes.REDIRECT:
      return Object.assign({}, state, {redirect: action.payload})
    case '@@router/LOCATION_CHANGE':
      let payload = {redirect: null}
      if(action.payload.pathname){
        
        let data = action.payload.pathname
        let preSlash, userSlug, projectSlug, type, branch, currentLocation
        currentLocation = data.split("/")

        userSlug = currentLocation[1]
        projectSlug = currentLocation[2]
        branch = currentLocation[3]
        type = currentLocation[4]

        if(userSlug && projectSlug && type && branch){
          payload = {redirect: null, userSlug: userSlug, projectSlug: projectSlug, type: type, branch: branch}
        }
      }
      return Object.assign({}, state, payload)
    default:
      return state
  }
}

export default location
