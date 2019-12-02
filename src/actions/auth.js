import { ActionTypes } from '../constants/index';

/**
 * Login
 *
 * @returns {Object}
 */
export const login = () => {
  return {
    type: ActionTypes.AUTH_LOGIN_REQUEST,
    payload: {}
  };
}

export const getAuthUser = (user, idToken, afterLogin) => {
  return {
    type: ActionTypes.AUTH_GET_USER_REQUEST,
    user,
    idToken,
    afterLogin
  };
}

export const createAuthUser = (payload) => {
  return {
    type: ActionTypes.AUTH_CREATE_USER_REQUEST,
    payload
  }
}

export const editAuthUser = (userId, userObject) => {
  return {
    type: ActionTypes.AUTH_PATCH_USER_REQUEST,
    userId,
    userObject
  };
}

export const resetPassword = () => {
  return {
    type: ActionTypes.AUTH_RESET_PASSWORD_REQUEST,
  }
}

export const newPassword = (data) => {
  return {
    type: ActionTypes.AUTH_NEW_PASSWORD_REQUEST,
    payload: data
  }
}
/**
 * Logout
 *
 * @returns {Object}
 */
export const logOut = () => {
  return {
    type: ActionTypes.AUTH_LOGOUT_REQUEST,
  };
}
