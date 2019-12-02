import { all, call, put, takeLatest, select } from 'redux-saga/effects'

import { ActionTypes } from '../constants/index'
import { API } from '../constants/api'
import { request } from '../modules/connect'
import { toast } from '../modules/toast';

const getAuth = (state) => state.wevolverApp.auth

export function* createWizardProject(action) {
  try {
    const authUser = yield select(getAuth)
    const wevolverAuth = JSON.parse(localStorage.getItem('WevolverAuth')) || {}
    const projectForm = {
      description: action.data.description,
      name: action.data.name,
      picture: action.data.picture,
      privacy: action.data.privacy,
      license: action.data.license.value,
    }

    const response = yield call(request, `${API.apiUrlV2}/projects`,
      {
        method: 'POST',
        payload: {
          project: projectForm,
          user: {
            slug: authUser.slug,
          }
        },
        headers: {
          'Content-Type': 'application/json',
        }
      }
    )
    let url = `${API.apiUrlV2}/tags`

    let tags = []
    let hiddenTags = []

    if(action.careables){
      tags = ["careables", "careables featured"]
      hiddenTags = ["careables", "careables featured"]
    }
    data = {
      "tags": tags,
      "hiddenTags": hiddenTags,
      "weight": 2,
      "is_welder": 'true',
      "project_id": response._id.$oid
    }
    for (var tag of action.data.tags) {
      data['tags'].push(tag.value)
    }
    yield call( request, url,
      {
        method: 'POST',
        payload: data,
        headers: {
         'Authorization': 'welder'
        }
      }
    )
    let data = new FormData()
    yield put({
      type: ActionTypes.PROJECT_GET_DETAILS_SUCCESS,
      payload: response,
      key: `${response.user_slug + '/' + response.slug}`
    })
    yield put({
      type: ActionTypes.PROJECT_CREATE_SUCCESS,
      payload: response
    })
    yield put({
      type: ActionTypes.WIZARD_CREATE_PROJECT_SUCCESS,
    })
  } catch(err) {
    let message = 'Your project could not be created'
    if(err.response && err.response.data && err.response.data.Message) {
      message = err.response.data.Message
    }
    yield call(toast, 'error', message)
    yield put({
      type: ActionTypes.PROJECT_CREATE_FAILURE,
    })
  }
}
/**
 * Wizard Sagas
 */
export default function* root() {
  yield all([
    takeLatest(ActionTypes.WIZARD_CREATE_PROJECT, createWizardProject),
  ])
}
