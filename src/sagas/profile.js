import { all, call, put, takeLatest, takeEvery, select } from 'redux-saga/effects';
import { API } from '../constants/api';
import { ActionTypes } from '../constants/index';
import { request } from '../modules/connect';

const getUser = (state) => state.wevolverApp.user
const getAuth = (state) => state.wevolverApp.auth

export function* getProjects(action) {
  try {
    const user = yield select(getUser)
    const response = yield call( request, `${API.apiUrlV2}/projects?oid=${user[action.userSlug]._id}&legacy_id=${user[action.userSlug].legacy_id}&skip=${0}&limit=${action.limit || 0}`,
      {
        method: 'GET',
      }
    );

    let projects = response.projects
    projects.forEach(project => {
        project.link = `/${project.user_slug}/${project.slug}/master/tree`
    })
    yield put({
      type: ActionTypes.PROFILE_GET_USER_PROJECTS_SUCCESS,
      payload: projects || [],
      count: response.totalCount || null
    });
  } catch (err) {
  }
}

export function* getFollowedProjects(action) {
  try {
    const auth = yield select(getAuth)
    const user = yield select(getUser)
    const selectedUser = action.selectedUser
    const response = yield call(request, `${API.apiUrlV2}/bookmarks/${user[selectedUser].legacy_id || 0}?limit=${action.limit || 2}&oid=${user[selectedUser]._id}`)
    response.forEach(follow => {
        follow.project.link = `/${follow.project.user_slug}/${follow.project.slug}/master/tree`
    })
    let followed_ids = []
    let response_set = []
    response.forEach(function (value) {
      if(followed_ids.indexOf(value['_id']['$oid']) < 0){
        response_set.push(value)
      }
      followed_ids.push(value['_id']['$oid'])
    });

    yield put({
      type: ActionTypes.PROFILE_GET_FOLLOWED_SUCCESS,
      payload: response_set
    })
  } catch (err) {
    console.log(err)
  }
}

export function* getUsersComments(action) {
  try {
    const user = yield select(getUser)
    const selectedUser = action.selectedUser
    const skip = action.skip || 0
    const response = yield call( request, `${API.apiUrlV2}/user/comments/${user[selectedUser].legacy_id}?skip=${skip}&oid=${user[selectedUser]._id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      }
    )
    yield put({
      type: ActionTypes.PROFILE_GET_COMMENTS_SUCCESS,
      payload: response,
      page: `page${skip}`
    })
  } catch (err) {
    console.log(err)
  }
}

export function* getUserProfile(action){
  const user = yield select(getUser)
  // const userSlug = action.userSlug
  // console.log(user[action.userSlug])
  let response = yield call( request, `${API.apiUrlV2}/users/${user[action.userSlug].slug}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    }
  )


  response['slug'] = user[user.selected].slug
  yield put({
    type: ActionTypes.PROFILE_GET_USER_SUCCESS,
    payload: response
  })
}

/**
 * User Sagas
 */
export default function* root() {
  yield all([
    takeLatest(ActionTypes.PROFILE_GET_USER, getUserProfile),
    takeEvery(ActionTypes.PROFILE_GET_USER_PROJECTS, getProjects),
    takeLatest(ActionTypes.PROFILE_GET_FOLLOWED, getFollowedProjects),
    takeEvery(ActionTypes.PROFILE_GET_COMMENTS, getUsersComments),
  ]);
}
