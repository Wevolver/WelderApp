import { all, call, put, takeLatest, select } from 'redux-saga/effects'
import { ActionTypes } from '../constants/index'
import { request } from '../modules/connect'
import { API } from '../constants/api';
import { toast } from '../modules/toast'

const getSelectedProject = (state) => state.wevolverApp.project[state.wevolverApp.project.selected]
const getLocation = (state) => state.wevolverApp.location
const getAuth = (state) => state.wevolverApp.auth

export function* uploadGuide(action) {
  try {
    const project = yield select(getSelectedProject)
    const location = yield select(getLocation)
    const authenticatedUser = yield select(getAuth)
    const permissions = localStorage.getItem('WelderPermissions')
    const auth = JSON.parse(localStorage.getItem('WevolverAuth'))
    const path = location.folders.concat([""]).join('/')
    const data = new FormData()

    data.append('file0', action.file)
    data.append('commit_message', 'uploading guide')
    data.append('email', authenticatedUser.name)
    data.append('user_name', authenticatedUser.name)

    let newFolderPath = action.path ? action.path.split('/').filter(x => x).concat([""]) : []
    newFolderPath = newFolderPath.map(name => name.trim())
    let dataPath = ""
    if(!action.path){
      dataPath = `${path}${newFolderPath.length > 0 ? newFolderPath.join('/') : ''}`
    } else {
      dataPath = `${newFolderPath.length > 0 ? newFolderPath.join('/') : ''}`
    }
    data.append('path', dataPath)
    data.append('is_welder', true)
    if(action.file) {
      const url = `${API.welderUrl}/${location.userSlug}/${project.name}/upload?branch=master`
      yield call( request, url,
        {
          method: 'POST',
          payload: data,
          headers: {
           'Authorization': 'welder'
          }
        }
      )
      if(!action.stepChange){
        yield put({
          type: ActionTypes.PROJECT_INVALIDATE_TREE,
        })
      }
      yield put({
        type: 'SET_MODAL_ID',
        id: null
      })
      yield put({
        type: ActionTypes.GUIDE_UPLOAD_SUCCESS,
      })
      yield put({
        type: ActionTypes.REDIRECT,
        payload: `/${location.userSlug}/${location.projectSlug}/master/blob/${dataPath}Assembly Guide.assembly`
      })
      yield call(toast, 'success', 'Your guide was saved')
    }
  } catch (err) {
    console.log(err)
      yield put({
        type: ActionTypes.GUIDE_UPLOAD_FAILURE,
      })
    yield call(toast, 'error', 'Your guide could not be saved')
  }
}

export default function* root() {
  yield all([
    takeLatest(ActionTypes.GUIDE_UPLOAD, uploadGuide),
  ])
}
