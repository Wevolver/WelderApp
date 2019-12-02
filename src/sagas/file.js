import { all, call, put, takeLatest, select } from 'redux-saga/effects'
import { ActionTypes } from '../constants/index'
import { request } from '../modules/connect'
import { API } from '../constants/api';
import { toast } from '../modules/toast'

const fileDownload = require('js-file-download');

const getSelectedProject = (state) => state.wevolverApp.project[state.wevolverApp.project.selected]
const getUploadFormValues = (state) => state.form.uploadFiles
const getCreateTextValues = (state) => state.form.createTextFiles
const getLocation = (state) => state.wevolverApp.location
const getAuth = (state) => state.wevolverApp.auth
const getTree = (state) => state.wevolverApp.tree
const getFiles = (state) => state.wevolverApp.files

export function* getFileHistory(action) {
  try {
    const location = yield select(getLocation)
    const project = yield select(getSelectedProject)
    const permissions = localStorage.getItem('WelderPermissions')
    const url = `${API.welderUrl}/${location.userSlug}/${project.name}/readhistory?type=file&path=${location.folderPath}&branch=master&permissions=${permissions}&page_size=500`
    let response = yield call( request, url,
      {
        headers: {
          'Authorization': 'welder'
        }
      }
    )
    yield put({
      type: ActionTypes.FILE_GET_HISTORY_SUCCESS,
      payload: response.history,
      path: `${location.folderPath}`
    })
  } catch (err) {
    console.log(err)
  }
}


export function* getProjectFile(action) {
  try {
    let oid = ''
    const location = yield select(getLocation)
    const tree = yield select(getTree)
    let project = yield select(getSelectedProject)
    if (action.oid !== 'latest') oid = `&oid=${action.oid}`
    const permissions = localStorage.getItem('WelderPermissions')
    let fileUrl = `${API.welderUrl}/${location.userSlug}/${project.name}/readfile?path=${action.path}&branch=${location.branch}&permissions=${permissions}${oid}`
    let lfsUrl = `${API.welderUrl}/${location.userSlug}/${project.name}/info/lfs/objects/batch`

    let selectedTreeNode = null

    Object.keys(tree).forEach(key => {
      for(let index in tree[key]) {
        const node = tree[key][index]
        if(node.folder_path == location.folderPath) selectedTreeNode = node
      }
    })

    if(selectedTreeNode) {
      if (selectedTreeNode.lfs) {
        let lfsResponse = yield call( request, lfsUrl,
          {
            method: 'POST',
            payload: {
              operation: 'download',
              objects: [
                {
                  oid: selectedTreeNode.lfs.split(':')[1],
                  size: selectedTreeNode.size
                }
              ]
            }
          }
        )
        fileUrl = lfsResponse.objects[0].actions.download.href
      }

      let response = yield call( request, fileUrl,
        {
          s3: !!selectedTreeNode.lfs,
          responseType:'arraybuffer',
          headers: {
            'Authorization': 'welder'
          }
        }
      )
      yield put({
        type: ActionTypes.FILE_GET_SUCCESS,
        payload: response,
        path: `${location.userSlug}:${location.projectSlug}:${action.path}`,
        oid: action.oid,
      })
      if(action.download) {
        yield put({
          type: ActionTypes.FILE_DOWNLOAD
        })
      }
    } else {
      let response = yield call( request, fileUrl,
        {
          responseType:'arraybuffer',
          headers: {
            'Authorization': 'welder'
          }
        }
      )
      yield put({
        type: ActionTypes.FILE_GET_SUCCESS,
        payload: response,
        path: `${location.userSlug}:${location.projectSlug}:${action.path}`,
        oid: action.oid,
      })
    }
  } catch (err) {
    console.log(err)
  }
}

export function* uploadFiles(action) {
  try {
    const form = yield select(getUploadFormValues)
    const project = yield select(getSelectedProject)
    const location = yield select(getLocation)
    const authenticatedUser = yield select(getAuth)
    const permissions = localStorage.getItem('WelderPermissions')
    const auth = JSON.parse(localStorage.getItem('WevolverAuth'))
    let path = action.modalPath ? action.modalPath : location.folders.concat([""]).join('/')
    if(path && !path.endsWith("/")){
      path += "/"
    }
    const data = new FormData()
    for(let x=0;x<form.values.files.length;x++) {
      data.append('file'+x, form.values.files[x])
    }
    data.append('commit_message', form.values.message)
    data.append('email', authenticatedUser.name)
    data.append('user_name', authenticatedUser.name)
    let newFolderPath = form.values.newFolderName ? form.values.newFolderName.split('/').filter(x => x).concat([""]) : []
    newFolderPath = newFolderPath.map(name => name.trim())
    data.append('path', `${path}${newFolderPath.length > 0 ? newFolderPath.join('/') : ''}`)
    data.append('is_welder', true)

    if(form && form.values && form.values.files) {
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
      yield put({
        type: ActionTypes.PROJECT_INVALIDATE_TREE,
      })
      yield put({
        type: 'SET_MODAL_ID',
        id: null
      })
      yield call(toast, 'success', 'Your file(s) were uploaded')
    }
  } catch (err) {
    console.log(err)
    yield call(toast, 'error', 'Your file(s) could not be uploaded')
  }
}

export function* createText(action) {
  try {
    const form = yield select(getCreateTextValues)
    const project = yield select(getSelectedProject)
    const location = yield select(getLocation)
    const authenticatedUser = yield select(getAuth)
    const permissions = localStorage.getItem('WelderPermissions')
    const auth = JSON.parse(localStorage.getItem('WevolverAuth'))
    console.log(action.modalPath);
    let path = action.modalPath || action.modalPath === "" ? action.modalPath : location.folders.concat([""]).join('/')
    if(path && !path.endsWith("/")){
      path += "/"
    }

    const data = new FormData()
    data.append(form.values.newFileName+".wevolver", new File([""], form.values.newFileName+".wevolver"))
    data.append('commit_message', "Text file created")
    data.append('email', authenticatedUser.name)
    data.append('user_name', authenticatedUser.name)
    data.append('path', `${path}`)
    data.append('is_welder', true)

    if(form && form.values && form.values.newFileName) {
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
      yield put({
        type: ActionTypes.PROJECT_INVALIDATE_TREE,
      })
      yield put({
        type: 'SET_MODAL_ID',
        id: null
      })
      yield call(toast, 'success', 'Your file was created')
      yield put({
        type: ActionTypes.REDIRECT,
        payload: `/${location.userSlug}/${location.projectSlug}/${location.branch}/blob/${path}${form.values.newFileName}.wevolver`
      })

    }
  } catch (err) {
    console.log(err)
    yield call(toast, 'error', 'Your file could not be created')
  }
}

export function* downloadFile() {
  try {
    let oid = "latest"
    let files = yield select(getFiles)
    const location = yield select(getLocation)
    const tree = yield select(getTree)
    const path = `${location.userSlug}:${location.projectSlug}:${location.folderPath}`
    if(!files[path]) {
      yield put({
        type: ActionTypes.FILE_GET,
        path: location.folderPath,
        oid,
        download: true
      })
      files = yield select(getFiles)
    } else {
      fileDownload(files[path][oid], location.folderPath);
      yield put({
        type: ActionTypes.FILE_DOWNLOAD_SUCCESS,
      })
    }
    // }
  } catch (err) {
    console.log(err)
  }
}

export function* deleteFile(action) {
  try {
    const project = yield select(getSelectedProject)
    const location = yield select(getLocation)
    const authenticatedUser = yield select(getAuth)
    const permissions = localStorage.getItem('WelderPermissions')
    const auth = JSON.parse(localStorage.getItem('WevolverAuth'))
    const data = {"files": location.folderPath, "user_name": authenticatedUser.name, 'is_welder': true}

    const url = `${API.welderUrl}/${location.userSlug}/${project.name}/deletefiles?branch=master`
    yield call( request, url,
      {
        method: 'POST',
        payload: data,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
          'Authorization': 'welder'
        }
      }
    )
    yield put({
      type: ActionTypes.REDIRECT,
      payload: `/${location.userSlug}/${location.projectSlug}/${location.branch}/tree`
    })
    yield put({
      type: ActionTypes.PROJECT_INVALIDATE_TREE,
    })
    yield call(toast, 'success', 'Your file(s) were deleted')
  } catch (err) {
    yield call(toast, 'error', 'Your file(s) could not be deleted')
    console.log(err)
  }
}

/**
 * User Sagas
 */
export default function* root() {
  yield all([
    takeLatest(ActionTypes.FILE_GET_HISTORY, getFileHistory),
    takeLatest(ActionTypes.FILE_GET, getProjectFile),
    takeLatest(ActionTypes.FILE_UPLOAD, uploadFiles),
    takeLatest(ActionTypes.FILE_CREATE_TEXT, createText),
    takeLatest(ActionTypes.FILE_DOWNLOAD, downloadFile),
    takeLatest(ActionTypes.FILE_DELETE, deleteFile),
  ])
}
