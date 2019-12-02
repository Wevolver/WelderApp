import { ActionTypes } from '../constants/index';
/**
 * get User
 *
 * @returns {Object}
 */
export const getUser = (userSlug) => {
  return {
    type: ActionTypes.USER_GET_REQUEST,
    userSlug
  };
}

export const registerUser = () => {
  return {
    type: ActionTypes.USER_REGISTER
  }
}
export const getUserWithPk = (pk) => {
  return {
    type: ActionTypes.USER_GET_WITH_PK_REQUEST,
    pk
  }
}

export const followUser = (user) => {
  return {
    type: ActionTypes.USER_FOLLOW_REQUEST,
    user
  }
}

export const followUserBuffer = (user) => {
  return {
    type: ActionTypes.USER_FOLLOW_BUFFER,
    user
  }
}

export const unfollowUser = (user) => {
  return {
    type: ActionTypes.USER_UNFOLLOW_REQUEST,
    user
  }
}