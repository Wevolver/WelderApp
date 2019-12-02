import { ActionTypes } from '../constants/index';
import get from 'lodash/get'

const profile = (state = {}, action) => {
  switch (action.type) {
    case ActionTypes.PROJECT_GET_COMMENTS:
      return Object.assign({}, state, {
        [action.discussing]: null
      })
    case ActionTypes.PROJECT_GET_COMMENTS_SUCCESS:
      return Object.assign({}, state, {
        [action.discussing]: action.payload
      })
    case ActionTypes.PROJECT_SUBMIT_COMMENT_SUCCESS:
      const key = get(action.payload, 'parentItem.$oid') || 'root'
      return Object.assign({}, state, {
        [action.discussing]: Object.assign({}, state[action.discussing], {
          [key]: [
            ...get(state,`${action.discussing}.${key}`) || [],
            action.payload,
          ]
        })
      })
    default:
      return state
  }
}

export default profile
