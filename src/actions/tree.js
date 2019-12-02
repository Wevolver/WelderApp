import { ActionTypes } from '../constants/index';

export const getProjectTree = () => {
  return {
    type: ActionTypes.PROJECT_GET_TREE,
  };
}

export const invalidateTree = () => {
  return {
    type: ActionTypes.PROJECT_INVALIDATE_TREE,
  };
}

export const addTreeListOfFiles = (files) => {
    return {
        type: ActionTypes.TREE_RECEIVE_LIST_OF_FILES,
        payload: files
    }
}