import { createReducer } from '../modules/helpers';

import { ActionTypes } from '../constants/index';

const user = localStorage.getItem('wevolverUser') ? JSON.parse(localStorage.getItem('wevolverUser')) : {}
export const userState = {
  isAuthenticated: !!user._id,
  isRunning: false,
  ...user
};

const auth = createReducer(userState, {
    [ActionTypes.AUTH_LOGIN_REQUEST](state) {
      return Object.assign({}, state, {
        isRunning: true,
      });
    },
    [ActionTypes.AUTH_LOGIN_SUCCESS](state, { payload }) {
      return Object.assign({}, state, {
        isAuthenticated: true,
        isRunning: false,
      });
    },
    [ActionTypes.AUTH_LOGIN_FAILURE](state, { payload }) {
      return Object.assign({}, state, {
        isAuthenticated: false,
        isRunning: false,
      });
    },
    [ActionTypes.AUTH_LOGOUT_REQUEST](state) {
      return Object.assign({}, state, {
        isRunning: true,
      });
    },
    [ActionTypes.AUTH_LOGOUT_SUCCESS](state) {
      return Object.assign({}, state, {
        isAuthenticated: false,
        isRunning: false,
      });
    },
    [ActionTypes.AUTH_GET_USER_REQUEST](state) {
      return Object.assign({}, state, {
        isRunning: true
      });
    },
    [ActionTypes.AUTH_GET_USER_SUCCESS](state, { payload }) {
      return Object.assign({}, state, {
        isAuthenticated: true,
        isRunning: false,
        ...payload
      });
    },
    [ActionTypes.AUTH_PATCH_USER_REQUEST](state, { payload }) {
      return Object.assign({}, state, {
        updating: true,
      })
    },
    [ActionTypes.AUTH_PATCH_USER_SUCCESS](state, { payload }) {
      return Object.assign({}, state, {
        updating: false,
        profile: payload.profile,
        notify_toggle: payload.notify_toggle,
        profession:  payload.profession,
        twitter:  payload.twitter,
        facebook: payload.facebook,
        instagram: payload.instagram,
        linkedin: payload.linkedin,
        website:  payload.website,
        location:  payload.location,
        bio: payload.bio
      })
    },
    [ActionTypes.TAGS_NOAUTH_FOLLOW_REQUEST](state, { payload, tagId }) {
      return Object.assign({}, state, {
        tags_followed_buffer: tagId,
      })
    },
    [ActionTypes.TAGS_FOLLOW_SUCCESS](state, { payload }) {
      return Object.assign({}, state, {
        tags_followed: payload,
        tags_followed_buffer: false,
      })
    },
  })

export default auth
