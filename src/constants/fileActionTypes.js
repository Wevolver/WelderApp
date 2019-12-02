import keyMirror from 'fbjs/lib/keyMirror'

export const fileActionTypes = keyMirror({
  FILE_GET: null,
  FILE_GET_SUCCESS: null,
  FILE_GET_HISTORY: null,
  FILE_GET_HISTORY_SUCCESS: null,
  FILE_UPLOAD: null,
  FILE_UPLOAD_SUCCESS: null,
  FILE_CREATE_TEXT: null,
  FILE_CREATE_TEXT_SUCCESS: null,
  FILE_EDIT: null,
  FILE_EDITING_TOGGLE: null,
  FILE_HISTORY_TOGGLE: null,
  FILE_DOWNLOAD: null,
  FILE_DOWNLOAD_SUCCESS: null,
  FILE_DELETE: null,
  FILE_DELETE_SUCCESS: null,
});
