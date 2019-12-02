import { ActionTypes } from '../constants/index';

export const addEditingGuide = (file, stepIndex) => {
  return {
    type: ActionTypes.GUIDE_ADD_EDITING,
    payload: file,
    stepIndex
  };
}

export const removeEditingGuide = () => {
  return {
    type: ActionTypes.GUIDE_REMOVE_EDITING,
  };
}

export const uploadGuide = (file, path, stepChange) => {
  return {
    type: ActionTypes.GUIDE_UPLOAD,
    file,
    path,
    stepChange
  };
}
