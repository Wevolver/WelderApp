import { ActionTypes } from '../constants/index';

const tags = (state = { related: [], options: [], hiddenOptions: [], loading: true}, action) => {
  switch (action.type) {
    case ActionTypes.TAGS_GET_REQUEST:
      return Object.assign({}, state, {loading: true})
    case ActionTypes.TAGS_GET_SUCCESS:
      return Object.assign({}, state, {related: action.payload, loading: false})
    case ActionTypes.TAGS_GET_OPTIONS_REQUEST_SUCCESS:
      return Object.assign({}, state, {
        options: action.payload.tags,
        hiddenOptions: action.payload.hiddenTags
      })
    default:
      return state
  }
}

export default tags