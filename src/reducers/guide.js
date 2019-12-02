import { ActionTypes } from '../constants/index';

const guide = (state = { editing: null, listOfFiles: [] }, action) => {
  switch (action.type) {
    case ActionTypes.GUIDE_ADD_EDITING:
      return Object.assign({}, state, {
        editing: action.payload,
        editingStepIndex: action.stepIndex
      })
    case ActionTypes.GUIDE_REMOVE_EDITING:
      return Object.assign({}, state, {
        editing: null,
        editingStepIndex: action.stepIndex
      })
    case ActionTypes.GUIDE_UPLOAD:
      return Object.assign({}, state, {
        uploadingGuide: true
    })
    case ActionTypes.GUIDE_UPLOAD_SUCCESS:
      return Object.assign({}, state, {
        uploadingGuide: false
    })
    case ActionTypes.GUIDE_UPLOAD_FAILURE:
      return Object.assign({}, state, {
        uploadingGuide: false
    })
    case ActionTypes.TREE_RECEIVE_LIST_OF_FILES:
        return Object.assign({}, state, {listOfFiles: action.payload})
    default:
      return state
  }
}

export default guide
