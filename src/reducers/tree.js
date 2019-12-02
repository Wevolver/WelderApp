import { ActionTypes } from '../constants/index';

const tree = (state = { currentProject: [], root: [], loaded: false, isVisible: false }, action) => {
  switch (action.type) {
    case ActionTypes.PROJECT_INVALIDATE_TREE:
      return Object.assign({}, state, { loaded: false })
    case ActionTypes.PROJECT_GET_TREE_SUCCESS:
      return Object.assign({}, state, {...action.payload, loaded: true })
    case '@@router/LOCATION_CHANGE':
      let sameProject = (state.currentProject.length > 2 && action.payload.pathname.split('/').length > 2
                         && action.payload.pathname.split('/')[1] == state.currentProject[1]
                         && action.payload.pathname.split('/')[2] == state.currentProject[2])
      return Object.assign({}, state, { currentProject: action.payload.pathname ? action.payload.pathname.split('/') : [], loaded: sameProject })
    default:
      return state
  }
}

export default tree
