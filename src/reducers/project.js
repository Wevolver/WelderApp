import { ActionTypes } from '../constants/index';

const project = (state = { memberSearch: [], wizardProjectCreated:false, creating: false, followBuffer: false, fetchingHistory: false, related: {} }, action) => {
  switch (action.type) {
    case ActionTypes.PROJECT_GET_DETAILS:
      return Object.assign({}, state, {
        selected: null,
      })
    case ActionTypes.PROJECT_GET_DETAILS_SUCCESS:
      return Object.assign({}, state, {
        selected: action.key,
        [action.key]:action.payload
      })
     case ActionTypes.PROJECT_EDIT:
      return Object.assign({}, state, {
        loading: true
      })
     case ActionTypes.PROJECT_EDIT_FAILURE:
      return Object.assign({}, state, {
        loading: false
      })
    case ActionTypes.PROJECT_EDIT_SUCCESS:
      return Object.assign({}, state, {
        [action.key]: Object.assign({}, state[action.key], action.payload),
        loading: false
      })
    case ActionTypes.PROJECT_EDIT_OVERVIEW_SUCCESS:
      return Object.assign({}, state, {
        [action.key]: Object.assign({}, state[action.key], action.payload),
        wizardProjectCreated: false,
        loading: false
      })
    case ActionTypes.PROJECT_SEARCH_MEMBERS_SUCCESS:
      return Object.assign({}, state, {
        memberSearch: action.payload
      })
    case ActionTypes.PROJECT_GET_MEMBERS_SUCCESS:
      return Object.assign({}, state, {
        members: action.payload
      })
    case ActionTypes.PROJECT_GET_RELATED_SUCCESS:
      return Object.assign({}, state, {
        related: Object.assign({}, state.related, {[action.selected]: action.payload})
      })
    case ActionTypes.PROJECT_GET_HISTORY:
      return Object.assign({}, state, {
        fetchingHistory: true
      })
    case ActionTypes.PROJECT_GET_HISTORY_SUCCESS:
      return Object.assign({}, state, {
        fetchingHistory: false,
        [action.payload.projectKey]: Object.assign({}, state[action.payload.projectKey], {[`history/${action.payload.branch}`]: action.payload.history})
      })
    case ActionTypes.WIZARD_CREATE_PROJECT:
      return Object.assign({}, state, {
        creating: true
      })
    case ActionTypes.WIZARD_CREATE_PROJECT_SUCCESS:
      return Object.assign({}, state, {
        wizardProjectCreated: true
      })
    case ActionTypes.PROJECT_CREATE:
      return Object.assign({}, state, {
        creating: true
      })
    case ActionTypes.PROJECT_CREATE_SUCCESS:
      return Object.assign({}, state, {
        creating: false
      })
    case ActionTypes.PROJECT_CREATE_FAILURE:
      return Object.assign({}, state, {
        creating: false
      })
    case ActionTypes.PROJECT_FOLLOW:
      return Object.assign({}, state, {
        followBuffer: action.projectOid,
        bookmarkLocation: action.bookmarkLocation,
      })
    case ActionTypes.PROJECT_UNFOLLOW:
      return Object.assign({}, state, {
        unfollowBuffer: action.projectOid,
        bookmarkLocation: action.bookmarkLocation,
      })
    case ActionTypes.PROJECT_UNFOLLOW_SUCCESS:
      return Object.assign({}, state, {
        unfollowBuffer: false,
        followBuffer: false,
        bookmarkLocation: false,
      })
    case ActionTypes.PROJECT_FOLLOW_SUCCESS:
      return Object.assign({}, state, {
        followBuffer: false,
        unfollowBuffer: false,
        bookmarkLocation: false,
      })
    case ActionTypes.PROJECT_SET_COMMENT_BUFFER:
      return Object.assign({}, state, {
        commentBuffer: true,
      })
    case ActionTypes.PROJECT_UNSET_COMMENT_BUFFER:
      return Object.assign({}, state, {
        commentBuffer: false,
      })
    default:
      return state
  }
}

export default project
