import { ActionTypes } from '../constants/index';

export const getUserProjects = (userSlug, limit) => {
  return {
    type: ActionTypes.PROFILE_GET_USER_PROJECTS,
    userSlug,
    limit
  };
}

export const getFollowedProjects = (limit, selectedUser) => {
  return {
    type: ActionTypes.PROFILE_GET_FOLLOWED,
    limit,
    selectedUser
  }
}

export const changeProfileTab = (tab) => {
  return {
    type: ActionTypes.PROFILE_CHANGE_TAB,
    tab
  }
}

export const getUsersComments = (skip, selectedUser) => {
  return {
    type: ActionTypes.PROFILE_GET_COMMENTS,
    skip,
    selectedUser
  }
}

export const getUserProfile = (userSlug) => {
  return {
    type: ActionTypes.PROFILE_GET_USER,
    userSlug
  }
}
