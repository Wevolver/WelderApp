import { ActionTypes } from '../constants/index';

const files = (state = { isRunning: true, selected: 'latest', editing: false, historyView: false, edited: null }, action) => {
  switch (action.type) {
    case ActionTypes.PROJECT_GET_FILE:
      return Object.assign({}, state, {
        isRunning: true,
        // [action.path]: Object.assign({}, state[action.path], {}),
      })
    case ActionTypes.FILE_GET:
      return Object.assign({}, state, {
        editing: false,
        isRunning: true,
      })
    case ActionTypes.FILE_GET_SUCCESS:
      return Object.assign({}, state, {
        [action.path]: Object.assign({}, state[action.path], {[action.oid]: action.payload}),
        isRunning: false,
        selected: action.oid,
        editing: false,
      })
    case ActionTypes.FILE_GET_HISTORY_SUCCESS:
      return Object.assign({}, state, {
        [action.path]: Object.assign({}, state[action.path], {history: action.payload}),
      })
    case ActionTypes.FILE_EDIT:
      return Object.assign({}, state, {
        edited: action.payload,
      })
    case ActionTypes.FILE_EDITING_TOGGLE:
      return Object.assign({}, state, {
        editing: action.payload,
      })
    case ActionTypes.FILE_HISTORY_TOGGLE: {
      return Object.assign({}, state, {
        historyView: action.payload,
      })
    }
    case '@@router/LOCATION_CHANGE': {
      return Object.assign({}, state, {
        historyView: false,
        editing: false,
      })
    }

    default:
      return state
  }
}

export default files
