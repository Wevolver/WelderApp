import keyMirror from 'fbjs/lib/keyMirror'

export const tagsActionTypes = keyMirror({
  TAGS_GET_REQUEST: null,
  TAGS_GET_SUCCESS: null,
  TAGS_GET_OPTIONS_REQUEST: null,
  TAGS_GET_OPTIONS_REQUEST_SUCCESS: null,
  TAGS_ADD_TO_PROJECT: null,
  TAGS_REMOVE_FROM_PROJECT: null,
  TAGS_FOLLOW_REQUEST: null,
  TAGS_NOAUTH_FOLLOW_REQUEST: null,
  TAGS_FOLLOW_SUCCESS: null,
})
