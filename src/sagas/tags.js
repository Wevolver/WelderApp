import { all, call, put, takeLatest, select } from 'redux-saga/effects'

import { ActionTypes } from '../constants/index'
import { API } from '../constants/api'
import { request } from '../modules/connect'
import { toast } from '../modules/toast';
import ReactGA from 'react-ga';

const getSelectedProject = (state) => state.wevolverApp.project[state.wevolverApp.project.selected]
const getSelected = (state) => state.wevolverApp.project.selected
const getAuthUser = (state) => { return state.wevolverApp.auth }

export function* search(action) {
  try {
    let url = `${API.apiUrlV2}/tags${action.query}`
    const response = yield call(request, url)
    yield put({
      type: ActionTypes.TAGS_GET_SUCCESS,
      payload: response
    });
  } catch(err) {
    console.log(err)
  }
}

export function* fetchTagsOptions(action) {
  try {
    let url = `${API.apiUrlV2}/tags?options=${action.options}`
    const response = yield call(request, url)
    const allTags = response || []
    const tags = []
    const hiddenTags = []
    allTags.forEach(tag => {
      if(tag.weight > 0) {
        tags.push(tag)
      } else {
        hiddenTags.push(tag)
      }
    })
    yield put({
      type: ActionTypes.TAGS_GET_OPTIONS_REQUEST_SUCCESS,
      payload: {tags, hiddenTags}
    });
  } catch(err) {
    console.log(err)
  }
}

export function* addTagToProject(action) {
  try {
    let url = `${API.apiUrlV2}/tags`
    let project = yield select(getSelectedProject)
    const selected = yield select(getSelected)
    project.tags = [...project.tags, action.payload.tag]
    yield put({
      type: ActionTypes.PROJECT_EDIT_SUCCESS,
      payload: project,
      key: selected
    })

    const response = yield call(request, url, {
      method: 'POST',
      payload: {
        tags: [action.payload.tag],
        project_id: action.payload.projectId
      },
      headers: {
        'Content-Type': 'application/json',
      }
    })

    yield put({
      type: ActionTypes.PROJECT_GET_DETAILS_SUCCESS,
      payload: response,
      key: `${response.slug}`
    })

    yield call(toast, 'success', 'Tags saved.')
  } catch(err) {
    console.log(err)
  }
}

export function* removeTagFromProject(action) {
  try {
    let url = `${API.apiUrlV2}/tags`
    let project = yield select(getSelectedProject)
    const selected = yield select(getSelected)

    const index = project.tags.indexOf(action.payload.tag)
    if(index > -1) {
      project.tags = [
        ...project.tags.slice(0, index),
        ...project.tags.slice(index + 1)
      ]
    }
    yield put({
      type: ActionTypes.PROJECT_EDIT_SUCCESS,
      payload: project,
      key: selected
    })

    const response = yield call(request, url, {
      method: 'DELETE',
      payload: {
        name: action.payload.tag,
        project_id: action.payload.projectId
      },
      headers: {
        'Content-Type': 'application/json',
      }
    })
    yield put({
      type: ActionTypes.PROJECT_GET_DETAILS_SUCCESS,
      payload: response,
      key: `${response.slug}`
    })


    yield call(toast, 'success', 'Tags saved.')

  } catch(err) {
    console.log(err)
  }
}


export function* followTag(action) {
  try {
    let url = `${API.apiUrlV2}/tags/follow`
    const authUser = yield select(getAuthUser)

    const payload = {
      tagId: action.tagId
    }
    Object.keys(payload).forEach(key => {
      if (!payload[key]) throw new Error('Could not follow this tag')
    })

    if(action.unfollow){
      ReactGA.event({
        category: 'Engagement',
        action: 'Unfollow',
        label: 'Unfollow Tag'
      });
    } else {
      ReactGA.event({
        category: 'Engagement',
        action: 'Follow',
        label: 'Follow Tag'
      });
    }

    const response = yield call(request, url, {
      method: action.unfollow ? 'DELETE' : 'POST',
      payload,
      headers: {
        'Content-Type': 'application/json',
      }
    })
    yield put({
      type: ActionTypes.TAGS_FOLLOW_SUCCESS,
      payload: response.tags_followed || []
    });
  } catch(err) {
    console.log(err)
  }
}

/**
 * User Sagas
 */
export default function* root() {
  yield all([
    takeLatest(ActionTypes.TAGS_GET_REQUEST, search),
    takeLatest(ActionTypes.TAGS_GET_OPTIONS_REQUEST, fetchTagsOptions),
    takeLatest(ActionTypes.TAGS_ADD_TO_PROJECT, addTagToProject),
    takeLatest(ActionTypes.TAGS_REMOVE_FROM_PROJECT, removeTagFromProject),
    takeLatest(ActionTypes.TAGS_FOLLOW_REQUEST, followTag),
  ])
}
