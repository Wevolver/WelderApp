import { ActionTypes } from '../constants/index';

const user = (state = { registering: false }, action) => {
  switch (action.type) {
    case ActionTypes.USER_GET_SUCCESS:
      return Object.assign({}, state, {
        selected: action.payload.slug,
        [action.payload.slug]: action.payload
      })
    case ActionTypes.USER_GET_WITH_PK_SUCCESS:
      return Object.assign({}, state, {
        [action.key]: action.payload,
      })
    case ActionTypes.USER_REGISTER:
      return Object.assign({}, state, {
        registering: true,
      })
    case ActionTypes.USER_REGISTER_FAIL:
      return Object.assign({}, state, {
        registering: false,
      })
    case ActionTypes.AUTH_LOGOUT_SUCCESS:
        let clone = Object.assign({}, state)
        // delete clone['selected'];
        return clone
    case ActionTypes.USER_FOLLOW_BUFFER:
      return Object.assign({}, state, {
        userFollowBuffer: action.user,
      })
    default:
      return state
  }
}

export default user
