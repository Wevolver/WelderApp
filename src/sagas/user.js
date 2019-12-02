import { all, call, put, takeLatest, select, takeEvery } from 'redux-saga/effects';
import React from 'react'
import get from 'lodash/get'

import { ActionTypes } from '../constants/index';
import { API } from '../constants/api';
import { request } from '../modules/connect';
import { toast } from '../modules/toast';

const getLocation = (state) => state.wevolverApp.location
const getRegistrationForm = (state) => state.form.userRegister.values
const getFetchedUsers = (state) => state.wevolverApp.user.fetched
const getAuth = (state) => state.wevolverApp.auth

export function* getUser(action) {
  try {

    const response = yield call(request, `${API.apiUrlV2}/users/${action.userSlug}`)
    yield put({
      type: ActionTypes.USER_GET_SUCCESS,
      payload: response,
    });
  } catch(err) {
    // yield put({
    //   type: ActionTypes.REDIRECT,
    //   payload: '/404',
    // })
  }
}

export function* getUserWithPk(action) {
  try {
    const response = yield call(request, `${API.apiUrlV2}/users/${action.pk}`)

    yield put({
      type: ActionTypes.USER_GET_WITH_PK_SUCCESS,
      key: action.pk,
      payload: response,
    });
  
  } catch(err) {

  }
}

export function* followUser(action) {
  try {
    const auth = yield select(getAuth)

    let newFollowers = get(action.user, 'followers') || []
    if(newFollowers.indexOf(auth._id) < 0) newFollowers.push({$oid: auth._id})
    const newUser = Object.assign({}, action.user, { followers: newFollowers })
    yield put({
      type: ActionTypes.USER_FOLLOW_SUCCESS,
      payload: newUser
    })
    const response = yield call(request, `${API.apiUrlV2}/users/${action.user._id}/follow`, {
      method: 'POST',
      payload: {}
    })

  } catch(err) {
    console.log(err)
    yield call(toast, 'error', 'Could not follow user.')
  }
}

export function* unfollowUser(action) {
  try {
    const auth = yield select(getAuth)

    let newFollowers = get(action.user, 'followers') || []
    newFollowers = newFollowers.filter(follower => {
      if(follower.$oid && follower.$oid === auth._id) return false
      if(follower === auth.pk) return false
      return true
    })
    const newUser = Object.assign({}, action.user, { followers: newFollowers })

     yield put({
      type: ActionTypes.USER_UNFOLLOW_SUCCESS,
      payload: newUser
    })

    const response = yield call(request, `${API.apiUrlV2}/users/${action.user._id}/follow`, {
      method: 'DELETE',
      payload: {}
    })
   
  } catch(err) {
    console.log(err)
    yield call(toast, 'error', 'Could not unfollow user.')
  }
}
/**
 * User Sagas
 */
export default function* root() {
  yield all([
    takeLatest(ActionTypes.USER_GET_REQUEST, getUser),
    takeEvery(ActionTypes.USER_GET_WITH_PK_REQUEST, getUserWithPk),
    // takeLatest(ActionTypes.USER_REGISTER, registerUser),
    takeLatest(ActionTypes.USER_FOLLOW_REQUEST, followUser),
    takeLatest(ActionTypes.USER_UNFOLLOW_REQUEST, unfollowUser)
  ]);
}
