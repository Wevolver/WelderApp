import { all, call, put, takeEvery, select, takeLatest } from 'redux-saga/effects'

import { ActionTypes } from '../constants/index'
import { API } from '../constants/api'
import { request } from '../modules/connect'

const getQueryResults = (state) => state.wevolverApp.search

export function* search(action) {
  try {
    const page = action.page || 1
    if(action.next) {
      let query = []
      if(action.next && action.next !== 'first') query.push(`next=${action.next}`)
      if(action.tags) query.push(`tags=${action.tags}`)
      if(action.hiddenTags) query.push(`hiddenTags=${action.hiddenTags}`)
      if(action.limit) query.push(`limit=${action.limit}`)
      let url = `${API.apiUrlV2}/search` //`${API.apiUrlV2}/search?next=${action.next}`
      if(query.length > 0) url += `?${query.join('&')}`
      const response = yield call(request, url)
      const next = response.length === 9 ? response[response.length - 1]._id.$oid : undefined
      yield put({
        type: ActionTypes.SEARCH_SUCCESS,
        payload: response,
        page,
        next
      })
    }
  } catch(err) {
    console.log(err)
  }
}

export function* searchSite(action) {
  try {
    let url = `${API.apiUrlV2}/query`
    const cachedQueryResults = JSON.parse(localStorage.getItem('searchCache')) || {}
    let payload = []

    if(cachedQueryResults[action.query]) {
      payload = cachedQueryResults[action.query]
    } else {
      const response = yield call(request, url,
        {
          method: 'POST',
          payload: {
            query: action.query,
            user: 'test'
          },
          headers: {
            'Content-Type': 'application/json',
          }
        }
      )
      payload = response
      const newCachedQueryResults = Object.assign({},cachedQueryResults, {[action.query]: response})
      localStorage.setItem('searchCache', JSON.stringify(newCachedQueryResults))
    }

    yield put({
      type: ActionTypes.ON_SITE_SEARCH_SUCCESS,
      payload: payload,
    })
  } catch(err) {
    yield put({
      type: ActionTypes.ON_SITE_SEARCH_FAIL,
    })
    console.log(err)
  }
}
/**
 * User Sagas
 */
export default function* root() {
  yield all([
    takeEvery(ActionTypes.SEARCH, search),
    takeLatest(ActionTypes.ON_SITE_SEARCH, searchSite)
  ])
}
