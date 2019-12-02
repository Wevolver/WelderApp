import { ActionTypes } from '../constants/index';

export const setCurrentLocationParams = (params) => {
  return {
    type: ActionTypes.SET_CURRENT_FOLDER_PATH,
    payload: params
  }
}

export const redirect = (project) => {
 return {
   type: ActionTypes.REDIRECT,
   payload: project
 }
}
