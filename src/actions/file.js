import { ActionTypes } from '../constants/index';


export const getProjectFile = (path, oid) => {
  return {
    type: ActionTypes.FILE_GET,
    path,
    oid
  };
}

export const getFileHistory = () => {
  return {
    type: ActionTypes.FILE_GET_HISTORY,
  };
}


export const uploadFiles = (modalPath) => {
  return {
    type: ActionTypes.FILE_UPLOAD,
    modalPath
  }
}

export const createText = (modalPath) => {
  return {
    type: ActionTypes.FILE_CREATE_TEXT,
    modalPath,
  }
}

export const editFile = (markdown) => {
  return {
    type: ActionTypes.FILE_EDIT,
    payload: markdown
  }
}

export const editFileToggle = (value) => {
  return {
    type: ActionTypes.FILE_EDITING_TOGGLE,
    payload: value
  }
}

export const fileHistoryToggle = (value) => {
  return {
    type: ActionTypes.FILE_HISTORY_TOGGLE,
    payload: value
  }
}

export const downloadFile = () => {
  return {
    type: ActionTypes.FILE_DOWNLOAD,
  }
}

export const deleteFile = () => {
  return {
    type: ActionTypes.FILE_DELETE,
  }
}
