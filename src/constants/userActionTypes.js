import keyMirror from 'fbjs/lib/keyMirror'

export const userActionTypes = keyMirror({
  USER_GET_REQUEST: null,
  USER_GET_SUCCESS: null,
  USER_REGISTER: null,
  USER_REGISTER_SUCCESS: null,
  USER_REGISTER_FAIL: null,
  USER_GET_WITH_PK_REQUEST: null,
  USER_GET_WITH_PK_SUCCESS: null,
  USER_FOLLOW_REQUEST: null,
  USER_FOLLOW_SUCCESS: null,
  USER_UNFOLLOW_REQUEST: null,
  USER_UNFOLLOW_SUCCESS: null,
  USER_FOLLOW_BUFFER: null,
});
