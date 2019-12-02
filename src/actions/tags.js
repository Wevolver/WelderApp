import { ActionTypes } from '../constants/index';

export const getTags = (query) => {
  return {
    type: ActionTypes.TAGS_GET_REQUEST,
    query
  };
}

export const getTagOptions = () => {
  return {
    type: ActionTypes.TAGS_GET_OPTIONS_REQUEST,
    options: 'all'
  }
}

export const getTagSearch = () => {
  return {
    type: ActionTypes.TAGS_GET_OPTIONS_REQUEST,
    options: 'search'
  }
}
export const addTagToProject = (tag, projectId) => {
  return {
    type: ActionTypes.TAGS_ADD_TO_PROJECT,
    payload: {
      tag,
      projectId,
    }
  }
}
export const removeTagFromProject = (tag, projectId) => {
  return {
    type: ActionTypes.TAGS_REMOVE_FROM_PROJECT,
     payload: {
      tag,
      projectId,
    }
  }
}

export const followTag = (tagId, unfollow) => {
  return {
    type: ActionTypes.TAGS_FOLLOW_REQUEST,
    tagId,
    unfollow
  }
}

export const noAuthFollowTag = (tagId, unfollow) => {
  return {
    type: ActionTypes.TAGS_NOAUTH_FOLLOW_REQUEST,
    tagId
  }
}
