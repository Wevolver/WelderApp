import { all, call, put, takeLatest, select } from 'redux-saga/effects'

import { ActionTypes } from '../constants/index'
import { API } from '../constants/api'
import { request } from '../modules/connect'

const getCategories = (state) => state.wevolverApp.categories.active

export function* search(action) {
  try {
    let url = `${API.apiUrlV2}/tags/categories`
    const categories = yield select(getCategories)
    if(categories.length === 0) {
      const response = yield call(fetch, url);
      // console.log(response)
      const responseBody = yield call(response.json.bind(response))
      // console.log(responseBody)
      yield put({
        type: ActionTypes.CATEGORIES_GET_SUCCESS,
        payload: responseBody
      });
    }
  } catch(err) {
    console.log(err)
  }
}

export default function* root() {
  yield all([
    takeLatest(ActionTypes.CATEGORIES_GET_REQUEST, search),
  ])
}
