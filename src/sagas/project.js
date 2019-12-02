import { all, call, put, takeLatest, select } from 'redux-saga/effects'

import { ActionTypes } from '../constants/index'
import { API } from '../constants/api'
import { request } from '../modules/connect'
import { toast } from '../modules/toast';
import groupby from 'lodash.groupby'
import get from 'lodash.get'

const getProjects = (state) => state.wevolverApp.project
const getSelectedProject = (state) => state.wevolverApp.project[state.wevolverApp.project.selected]
const getSelected = (state) => state.wevolverApp.project.selected
const getLocation = (state) => state.wevolverApp.location
const getAuth = (state) => state.wevolverApp.auth
const getProjectMembers = (state) => state.wevolverApp.project.members
const getProjectOverviewForm = ({form}) => form.projectOverview

export function* getProjectDetails(action) {
  try {
    let projects = yield select(getProjects)

    let response = null
    if(projects[`${action.slug}`]) {
      response = projects[`${action.slug}`]
    } else {
      response = yield call( request, `${API.apiUrlV2}/project/${action.slug}`)
    }

    yield put({
      type: ActionTypes.PROJECT_GET_DETAILS_SUCCESS,
      payload: response,
      key: `${action.slug}`
    })

    yield put({
      type: ActionTypes.PROJECT_GET_TREE,
    })
  } catch (err) {
    yield put({
      type: ActionTypes.REDIRECT,
      payload: '/404',
    });
  }
}

export function* getProjectTree(action) {
  try {
    const projects = yield select(getProjects)
    const location = yield select(getLocation)
    const project = projects[`${location.userSlug}/${location.projectSlug}`]
    if(project){
      let response = yield call( request, `${API.welderUrl}/${location.userSlug}/${project.name}?path=${location.folderPath}&branch=${location.branch}`,
        {
          headers: {
            'Authorization': 'welder'
          }
        }
      );
      const enoughBlobs = response.tree.root.filter(x => x.type === 'blob').length > 0
      const thereIsFolder = !!response.tree.root.find(x => x.type === 'tree')
      response.tree.isVisible = enoughBlobs || thereIsFolder
      yield put({
        type: ActionTypes.PROJECT_GET_TREE_SUCCESS,
        payload: {...response.tree, lastCommitTime: response.lastCommitTime},
      });
    }
  } catch (err) {
    console.log(err)
  }
}

export function* getRelatedProjects(action) {
  try {
    let selected = yield select(getSelected)
    let response = yield call( request, `${API.apiUrlV2}/projects/related?tags=${action.tags.join(",")}&name=${encodeURIComponent(action.name)}`, {} );
    yield put({
      type: ActionTypes.PROJECT_GET_RELATED_SUCCESS,
      payload: response,
      selected
    });
  } catch (err) {
    console.log(err)
  }
}

export function* editProject(action) {
  try {
    let project = yield select(getSelectedProject)
    let formBody = Object.assign({}, action.payload)
    formBody.privacy = parseInt(formBody.privacy || project.privacy, 10)
    const response = yield call( request, `${API.apiUrlV2}/project/${project.user_slug}/${project.slug}`,
      {
        method: 'PUT',
        payload: formBody,
        headers: {
          'Content-Type': 'application/json',
        }
      }
    )

    const selected = yield select(getSelected)
    const newProject = Object.assign({}, project, response)
    yield put({
      type: ActionTypes.PROJECT_EDIT_SUCCESS,
      payload: newProject,
      key: selected
    })

    console.log(newProject)

    yield put({
      type: ActionTypes.PROJECT_GET_MEMBERS,
      project: newProject,
    })

    if(newProject['name'] !== project.name){
      yield put({
        type: ActionTypes.REDIRECT,
        payload: `/${newProject.user_slug}/${newProject.slug}/master/tree`
      })
    }
    const members = yield select(getProjectMembers)
    yield call(toast, 'success', 'Your project\'s settings were updated')
  } catch (err) {
    yield put({
      type: ActionTypes.PROJECT_EDIT_FAILURE,
    })
    yield call(toast, 'error', 'Your project\'s settings could not be updated')
    console.log(err)
  }
}

export function* createProject(action) {
  try {
    const authUser = yield select(getAuth)
    const wevolverAuth = JSON.parse(localStorage.getItem('WevolverAuth')) || {}
    const response = yield call(request, `${API.apiUrlV2}/projects`,
      {
        method: 'POST',
        payload: {
          project: action.data,
          user: {
            slug: authUser.slug,
            access_token: `Bearer ${wevolverAuth.access_token}`
          }
        },
        headers: {
          'Content-Type': 'application/json',
        }
      }
    )
    yield put({
      type: 'SET_MODAL_ID',
      id: null
    })

    yield put({
      type: ActionTypes.REDIRECT,
      payload: `/${response.user_slug}/${response.slug}/master/tree`
    })

    yield put({
      type: ActionTypes.PROJECT_CREATE_SUCCESS,
      payload: response
    })
  } catch (err) {
    let message = 'Your project could not be created'
    if(err.response && err.response.data && err.response.data.Message) {
      message = err.response.data.Message
    }
    yield put({
      type: ActionTypes.PROJECT_CREATE_FAILURE,
    })
    yield call(toast, 'error', message)
  }
}

export function* revertCommit(action) {
  try {
    const project = yield select(getSelectedProject)
    const authUser = yield select(getAuth)
    const location = yield select(getLocation)

    const url = `${API.welderUrl}/${location.userSlug}/${project.name}/revert?branch=${action.commit}`
    yield call( request, url,
      {
        method: 'POST',
        payload: {
          'is_welder': true
        },
        headers: {
         'Authorization': 'welder'
        }
      }
    )

    yield put({
      type: 'SET_MODAL_ID',
      id: null
    })

    yield put({
      type: ActionTypes.REDIRECT,
      payload: `/${project.user_slug}/${project.slug}/master/tree`
    })

    yield call(toast, 'success', 'Successfully reverted revision')

  } catch (err) {
    console.log(err)
  }
}

export function* forkProject(action) {
  try {
    const authUser = yield select(getAuth)
    const response = yield call(request, `${API.apiUrlV2}/fork/${encodeURIComponent(action.data.user_slug)}/${action.data.name}`,
      {
        method: 'POST',
        payload: {
          user: {
            slug: authUser.slug
          }
        },
        headers: {
          'Content-Type': 'application/json',
        }
      }
    )

    yield put({
      type: 'SET_MODAL_ID',
      id: null
    })

  } catch (err) {
    console.log(err)
  }
}

export function* deleteProject(action) {
  try {
    const project = yield select(getSelectedProject)
    const authUser = yield select(getAuth)
    const response = yield call(request, `${API.apiUrlV2}/project/${project.user_slug}/${project.slug}`,
      {
        method: 'DELETE',
        payload: {
          project: action.data,
          user: {
            slug: authUser.slug
          }
        },
        headers: {
          'Content-Type': 'application/json',
        }
      }
    )

    yield put({
      type: 'SET_MODAL_ID',
      id: null
    })

    yield put({
      type: ActionTypes.REDIRECT,
      payload: `/profile/${project.user_slug}`
    })

    yield put({
      type: ActionTypes.PROFILE_GET_USER_PROJECTS
    })
    yield call(toast, 'success', 'Your project was deleted.')
  } catch (err) {
    yield call(toast, 'error', 'Your project could not be deleted.')
  }
}

export function* searchMembers(action) {
  try {
    const response = yield call(request, `${API.apiUrlV2}/search/users?name=${action.payload}&page_size=4`)
    console.log(response)
     yield put({
      type: ActionTypes.PROJECT_SEARCH_MEMBERS_SUCCESS,
      payload: response || []
    })
  } catch(err) {
    console.log(err)
  }
}

export function* getMembers(action) {
  try {
    console.log(action);
    const members = action.project.members
    let detailedMembers = yield all(members.map(member => call(request, `${API.apiUrlV2}/users/${member.id.$oid}`) ));
    detailedMembers.forEach(detailedMember => {
      members.forEach(member => {
        if(member.id === detailedMember.pk) {
          detailedMember.permission = member.permission
          detailedMember.deleted = member.deleted
        }
      })
    })

    yield put({
      type: ActionTypes.PROJECT_GET_MEMBERS_SUCCESS,
      payload: detailedMembers
    })
  } catch(err) {
    console.log(err)
  }
}

export function* getProjectHistory(action) {
  try {
    const projects = yield select(getProjects)
    const location = yield select(getLocation)
    const project = projects[`${location.userSlug}/${location.projectSlug}`]
    const branch = action.payload.branch || 'master'
    const pageSize = action.payload.pageSize ? action.payload.pageSize : (branch === 'master' ? '6' : '1')
    const page = action.payload.page || '0'
    if(project) {
      const response = yield call( request, `${API.welderUrl}/${location.userSlug}/${project.name}/readhistory?branch=${branch}&page=${page}&page_size=${pageSize}&path=&type=commits`,
      {
        method: 'GET',
        headers: {
          'Authorization': 'welder'
        }
      })

      yield put({
        type: ActionTypes.PROJECT_GET_HISTORY_SUCCESS,
        payload: {...response, projectKey: `${location.userSlug}/${location.projectSlug}`, branch}
      })
    }
  } catch(err) {
    console.log(err)
  }
}

export function* followProject(action) {
  try {
    yield put({
      type: ActionTypes.PROJECT_FOLLOW_SUCCESS,
    })
    const project = yield select(getSelectedProject)
    const auth = yield select(getAuth)
    const formBody = {
      project_id: action.projectOid
    }
    const response = yield call( request, `${API.apiUrlV2}/bookmarks/${auth.legacy_id || 0}?oid=${auth._id}`,
      {
        method: 'POST',
        payload: formBody,
        headers: {
          'Content-Type': 'application/json',
        }
      }
    )
    const selected = yield select(getSelected)
    const bookmark_count = project.bookmark_count || 0
    yield put({
      type: ActionTypes.PROJECT_EDIT_SUCCESS,
      payload: Object.assign({}, project, {bookmarked: true, bookmark_count: bookmark_count + 1}),
      key: selected
    })
  } catch (err) {
    console.log(err)
  }
}

export function* unfollowProject(action) {
  try {
    yield put({
      type: ActionTypes.PROJECT_UNFOLLOW_SUCCESS,
    })
    const project = yield select(getSelectedProject)
    const auth = yield select(getAuth)
    const formBody = {
      project_id: action.projectOid
    }

    const response = yield call( request, `${API.apiUrlV2}/bookmarks/${auth.legacy_id || 0}`,
      {
        method: 'DELETE',
        payload: formBody,
        headers: {
          'Content-Type': 'application/json',
        }
      }
    )
    const selected = yield select(getSelected)
    const bookmark_count = project.bookmark_count || 0
    yield put({
      type: ActionTypes.PROJECT_EDIT_SUCCESS,
      payload: Object.assign({}, project, {bookmarked: false, bookmark_count: bookmark_count ? bookmark_count - 1 : 0}),
      key: selected
    })
  } catch (err) {
    console.log(err)
  }
}

export function* submitComment(action) {
  try {
    let project = yield select(getSelectedProject)
    if(action.comment && action.comment.text) {
      const response = yield call( request, `${API.apiUrlV2}/comments/${project._id.$oid}`,
        {
          method: 'POST',
          payload: {
            comment: action.comment
          },
          headers: {
            'Content-Type': 'application/json',
          }
        }
      )
      yield put({
        type: ActionTypes.PROJECT_SUBMIT_COMMENT_SUCCESS,
        payload: {...response, new: true},
        discussing: project._id.$oid
      })
    }
  } catch (err) {
    console.log(err)
  }
}

export function* getComments(action) {
  try {
    // let project = yield select(getSelectedProject)
    const response = yield call( request, `${API.apiUrlV2}/comments/${action.discussing}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      }
    )
    const groupedComments = groupby(response, item => {
      const value = get(item, 'parentItem.$oid')
      if (!value) return 'root';
      return value;
    })
    const selected = yield select(getSelected)
    yield put({
      type: ActionTypes.PROJECT_GET_COMMENTS_SUCCESS,
      payload: groupedComments,
      discussing: action.discussing
    })
  } catch (err) {
    console.log(err)
  }
}

export function* editOverview(action) {
  try {
    const formValues = yield select(getProjectOverviewForm)
    const selected = yield select(getSelected)
    if(formValues.values) {
      const response = yield call( request, `${API.apiUrlV2}/project/${action.projectId}/overview`,
        {
          method: 'POST',
          payload: formValues.values,
        }
      )
      yield put({
        type: ActionTypes.PROJECT_EDIT_OVERVIEW_SUCCESS,
        payload: response,
        key: selected
      })
    }
    yield call(toast, 'success', 'Changes saved')
  } catch(err) {
    yield call(toast, 'error', 'Something went wrong while saving the project. Please try again.')
    console.log(err)
  }
}


/**
 * User Sagas
 */
export default function* root() {
  yield all([
    takeLatest(ActionTypes.PROJECT_GET_DETAILS, getProjectDetails),
    takeLatest(ActionTypes.PROJECT_GET_TREE, getProjectTree),
    takeLatest(ActionTypes.PROJECT_GET_RELATED, getRelatedProjects),
    takeLatest(ActionTypes.PROJECT_EDIT, editProject),
    takeLatest(ActionTypes.PROJECT_CREATE, createProject),
    takeLatest(ActionTypes.PROJECT_FORK, forkProject),
    takeLatest(ActionTypes.PROJECT_DELETE, deleteProject),
    takeLatest(ActionTypes.PROJECT_SEARCH_MEMBERS, searchMembers),
    takeLatest(ActionTypes.PROJECT_GET_MEMBERS, getMembers),
    takeLatest(ActionTypes.PROJECT_GET_HISTORY, getProjectHistory),
    takeLatest(ActionTypes.PROJECT_REVERT_COMMIT, revertCommit),
    takeLatest(ActionTypes.PROJECT_FOLLOW, followProject),
    takeLatest(ActionTypes.PROJECT_UNFOLLOW_REQUEST, unfollowProject),
    takeLatest(ActionTypes.PROJECT_SUBMIT_COMMENT, submitComment),
    takeLatest(ActionTypes.PROJECT_GET_COMMENTS, getComments),
    takeLatest(ActionTypes.PROJECT_EDIT_OVERVIEW, editOverview)
  ])
}
