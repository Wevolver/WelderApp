import { all, call, put, takeLatest, select } from 'redux-saga/effects'

import { ActionTypes } from '../constants/index'
import { request } from '../modules/connect'
import { API } from '../constants/api'


export function* getDesktopParams(action) {
  try {
    const response = yield call(request, 'https://api.github.com/repos/wevolver/desktop2/releases/latest',
      {
        method: 'GET',
        headers: {
          'Authorization': 'github'
        },
      }
    );

    yield put({
      type: ActionTypes.GET_DESKTOP_PARAMS_SUCCESS,
      payload: response,
    })

  } catch(err) {
  }
}

export default function* root() {
  yield all([
    takeLatest(ActionTypes.GET_DESKTOP_PARAMS, getDesktopParams),
  ])
}
