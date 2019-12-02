import { ActionTypes } from '../constants/index'

export const getProjectDetail = (slug) => {
  return {
    type: ActionTypes.PROJECT_GET_DETAILS,
    slug
  }
}

export const editProject = (data) => {
  return {
    type: ActionTypes.PROJECT_EDIT,
    payload: data,
  }
}

export const createProject = (data) => {
  return {
    type: ActionTypes.PROJECT_CREATE,
    data
  }
}

export const revertCommit = (commit) => {
  return {
    type: ActionTypes.PROJECT_REVERT_COMMIT,
    commit
  }
}

export const forkProject = (data) => {
  return {
    type: ActionTypes.PROJECT_FORK,
    data
  }
}

export const deleteProject = () => {
  return {
    type: ActionTypes.PROJECT_DELETE,
  }
}

export const searchMembers = (query) => {
  return {
    type: ActionTypes.PROJECT_SEARCH_MEMBERS,
    payload: query
  }
}

export const getMembers = (project) => {
  return {
    type: ActionTypes.PROJECT_GET_MEMBERS,
    project: project
  }
}

export const getRelatedProjects = (tags, name) => {
  return {
    type: ActionTypes.PROJECT_GET_RELATED,
    tags: tags,
    name: name
  }
}

export const getProjectHistory = (branch, page, pageSize) => {
  return {
    type: ActionTypes.PROJECT_GET_HISTORY,
    payload: { branch, page, pageSize }
  }
}

export const followProject = (projectOid, bookmarkLocation) => {
  return {
    type: ActionTypes.PROJECT_FOLLOW,
    projectOid,
    bookmarkLocation,
  }
}

export const cancelFollowProject = () => {
  return {
    type: ActionTypes.PROJECT_FOLLOW_SUCCESS,
  }
}

export const projectFollowRequest = (projectOid) => {
  return {
    type: ActionTypes.PROJECT_FOLLOW_REQUEST,
    projectOid
  }
}

export const unfollowProject = (projectOid, bookmarkLocation) => {
  return {
    type: ActionTypes.PROJECT_UNFOLLOW,
    projectOid,
    bookmarkLocation,
  }
}

export const projectUnfollowRequest = (projectOid) => {
  return {
    type: ActionTypes.PROJECT_UNFOLLOW_REQUEST,
    projectOid
  }
}

export const setCommentBuffer = () => {
    return {
    type: ActionTypes.PROJECT_SET_COMMENT_BUFFER,
  }
}

export const unsetCommentBuffer = () => {
    return {
    type: ActionTypes.PROJECT_UNSET_COMMENT_BUFFER,
  }
}

export const submitComment = (comment) => {
  return {
    type: ActionTypes.PROJECT_SUBMIT_COMMENT,
    comment
  }
}

export const getComments = (projectId) => {
    return {
    type: ActionTypes.PROJECT_GET_COMMENTS,
    discussing: projectId
  }
}

export const editOverview = (projectId) => {
  return {
    type: ActionTypes.PROJECT_EDIT_OVERVIEW,
    projectId
  }
}
