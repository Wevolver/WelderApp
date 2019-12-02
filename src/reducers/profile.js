import { ActionTypes } from '../constants/index';

const profileDefault = {
  followed: { results: [], loading: true },
  projects: { results: [], loading: true },
  selectedTab: 0,
  activity: {},
  activityPages: []
}

const profile = (state = profileDefault, action) => {
  switch (action.type) {
     case ActionTypes.PROFILE_GET_USER:
      return Object.assign({}, state, {loading: true})
     case ActionTypes.USER_FOLLOW_SUCCESS:
     case ActionTypes.USER_UNFOLLOW_SUCCESS:
      return Object.assign({}, state, {
        [action.payload.slug]: action.payload
      })
     case ActionTypes.PROFILE_GET_USER_SUCCESS:
      return Object.assign({}, state, {
        selected: action.payload.slug,
        loading: false,
        [action.payload.slug]: action.payload
      })
     case ActionTypes.PROFILE_GET_USER_PROJECTS:
      return Object.assign({}, state, {
        projects: Object.assign({}, state.projects, {loading: true, totalCount: null}),
      })
    case ActionTypes.PROFILE_GET_USER_PROJECTS_SUCCESS:
      return Object.assign({}, state, {
        projects: Object.assign({}, state.projects, {results: action.payload, totalCount: action.count, loading: false}),
      })
    case ActionTypes.PROJECT_CREATE_SUCCESS:
      return Object.assign({}, state, {
        projects: Object.assign({}, state.projects, {results: [action.payload, ...state.projects.results]}),
      })
    case ActionTypes.PROFILE_GET_FOLLOWED:
      return Object.assign({}, state, {
        followed: Object.assign({}, state.followed, {loading: true}),
      })
    case ActionTypes.PROFILE_GET_FOLLOWED_SUCCESS:
      return Object.assign({}, state, {
        followed: Object.assign({}, state.followed, {results: action.payload, loading: false}),
      })
    case ActionTypes.PROFILE_CHANGE_TAB:
      return Object.assign({}, state, {selectedTab: action.tab})
    case ActionTypes.PROFILE_GET_COMMENTS_SUCCESS:
      let activityPages = state.activityPages
      if(activityPages.indexOf(action.page) < 0) {
        activityPages = [...activityPages, action.page]
      }
      return Object.assign({}, state, {
        activityPages,
        activity: Object.assign({}, state.activity, {[action.page]:action.payload})
      })
    default:
      return state
  }
}

export default profile
