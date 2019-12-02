import { all, call, put, takeLatest, select } from 'redux-saga/effects';
import React from 'react'

import { ActionTypes } from '../constants/index';
import { API } from '../constants/api';
import { request, isLoggedIn } from '../modules/connect';
import { toast } from '../modules/toast';
import { heapEvent } from '../modules/heap'
import auth from '../modules/auth'
import get from 'lodash/get'
/**
 * Login
 */

const getLoginForm = (state) => { return state.form.login ? state.form.login.values : {}}
const getPasswordResetForm = (state) => { return state.form.passwordReset ? state.form.passwordReset.values : {}}
const getAuthUser = (state) => { return state.wevolverApp.auth }
const getBookmarkLocation = (state) => { return state.wevolverApp.project.bookmarkLocation }
const getLocation = (state) => { return state.wevolverApp.location }

/**
 * Logout
 */
export function* logout() {
  localStorage.removeItem('WevolverAuth')
  try {
    yield put({
      type: ActionTypes.AUTH_LOGOUT_SUCCESS,
    });
  } catch (err) {
    yield put({
      type: ActionTypes.AUTH_LOGOUT_FAILURE,
      payload: err,
    });
  }
}

export function* getUser(action) {
  try {
    const bookmarkLocation = yield select(getBookmarkLocation)
    const response = yield call(request, `${API.apiUrlV2}/users/${action.user.email}`)
    localStorage.setItem('wevolverUser', JSON.stringify(response));
    auth.setUserId(response._id)
    yield put({
      type: ActionTypes.AUTH_GET_USER_SUCCESS,
      payload: Object.assign({}, {isAuthenticated: true}, action.user, response),
    });
    heapEvent.identify(response.email)
    let redirectTo = null
    if(bookmarkLocation) redirectTo = bookmarkLocation
    if(action.afterLogin) {
      let message = <div>You are logged in as <a href={`/profile/${response.slug}`}>{response.first_name}</a></div>
      yield call(toast, 'success', message, { autoClose: !action.afterRegister })
    }
    if (redirectTo) {
      yield put({
        type: ActionTypes.REDIRECT,
        payload: redirectTo,
      });
    }
  } catch(err) {
    console.log(err.message)
    if(err.message === 'Not logged in') {
      yield put({
        type: ActionTypes.AUTH_LOGOUT_REQUEST,
      });
    }
  }
}


export function* patchUser(action) {
  try {
    const authUser = yield select(getAuthUser)
    Object.keys(action.userObject).forEach((key) => (action.userObject[key] === "") && delete action.userObject[key]);
    let location = action.userObject.location;
    let apiV2UserObject = action.userObject
    delete action.userObject['location']
  
    apiV2UserObject['location'] = location
    const response2 = yield call(request, `${API.apiUrlV2}/users/${action.userId}`, {
      method: 'PUT',
      payload: {
        email: authUser.email,
        bio: apiV2UserObject.bio,
        notify_toggle: apiV2UserObject.notify_toggle,
        accepts_cookies: apiV2UserObject.accepts_cookies,
        profession: apiV2UserObject.profession,
        website: apiV2UserObject.website,
        picture: apiV2UserObject.picture,
        linkedin: apiV2UserObject.linkedin,
        facebook: apiV2UserObject.facebook,
        instagram: apiV2UserObject.instagram,
        twitter: apiV2UserObject.twitter,
        location: apiV2UserObject.location
      },
    })
    yield put({
      type: ActionTypes.AUTH_PATCH_USER_SUCCESS,
      payload: Object.assign({}, {}, response2),
    });
    if(!(action.userObject.accepts_cookies && !authUser.accepts_cookies)){
      yield call(toast, 'success', 'Your profile was updated.')
    }
    let redirectTo = `/profile/${authUser.slug}`
    yield put({
      type: ActionTypes.REDIRECT,
      payload: redirectTo,
    });
  } catch(err) {
    console.log(err)
    yield call(toast, 'error', 'Your profile could not be updated.')
  }
}

export function* resetPassword(action) {
  try {
    const loginForm = yield select(getLoginForm);
    const email = loginForm.email
    const options = {
      method: 'POST',
      payload: {email}
    }
    yield call(request, `${API.resetUrl}`, options)
    yield call(toast, 'success', `Reset email sent to ${email}`)
  } catch(err) {
    console.log(err)
    yield call(toast, 'error', err.message)
  }
}

export function* newPassword(action) {
  try {
    const passwordResetForm = yield select(getPasswordResetForm)
    const {
      uuid,
      token
    } = action.payload
    const options = {
      method: 'POST',
      payload: {
        new_password1: passwordResetForm.new_password,
        new_password2: passwordResetForm.confirm_password,
      }
    }
    yield call(request, `${API.resetUrl}${uuid}/${token}/`, options)
    yield put({
      type: ActionTypes.AUTH_NEW_PASSWORD_SUCCESS,
    });
    yield put({
      type: ActionTypes.REDIRECT,
      payload: '/',
    });
    yield call(toast, 'success', 'Your password was reset.')
  } catch(err) {
    console.log(err)
    yield call(toast, 'error', 'Your password could not be reset.')
  }
}


export function* createAuthUser(action) {
  try {
    const options = {
      method: 'POST',
      payload: action.payload || {},
    }
    const response = yield call(request, `${API.apiUrlV2}/users`, options)
    localStorage.setItem('wevolverUser', JSON.stringify(response));
    auth.setUserId(response._id)
    yield put({
      type: ActionTypes.AUTH_GET_USER_SUCCESS,
      payload: Object.assign({}, {isAuthenticated: true}, response),
    });
    if (response.isNewUser) {
      const message = <div>Welcome! Click <a href={`/profile/${response.slug}`}>here</a> to see your profile</div>
      yield call(toast, 'success', message, { autoClose: false })
    }
  } catch(err) {
    console.log(err)
    yield call(toast, 'error', 'Your password could not be reset.')
  }
}
/**
 * User Sagas
 */
export default function* root() {
  yield all([
    takeLatest(ActionTypes.AUTH_LOGOUT_REQUEST, logout),
    takeLatest(ActionTypes.AUTH_LOGIN_FAILURE, logout),
    takeLatest(ActionTypes.AUTH_GET_USER_REQUEST, getUser),
    takeLatest(ActionTypes.AUTH_PATCH_USER_REQUEST, patchUser),
    takeLatest(ActionTypes.AUTH_RESET_PASSWORD_REQUEST, resetPassword),
    takeLatest(ActionTypes.AUTH_NEW_PASSWORD_REQUEST, newPassword),
    takeLatest(ActionTypes.AUTH_CREATE_USER_REQUEST, createAuthUser)
  ]);
}
