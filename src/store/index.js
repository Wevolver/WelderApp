import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'
import wevolverApp from '../reducers'

import createHistory from 'history/createBrowserHistory'

import {routerReducer, routerMiddleware } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'
import rootSagas from '../sagas';
import { loadState, saveState } from './localStorage'

const history = createHistory()
const middleware = routerMiddleware(history)
const sagaMiddleware = createSagaMiddleware()
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configureStore(preloadedState) {
  
  let combinedMiddleware = [thunkMiddleware, sagaMiddleware, ...middleware]
  const store = createStore(
    combineReducers({
      wevolverApp,
      router: routerReducer,
      form: formReducer
    }),
    preloadedState,
    composeEnhancers(
    applyMiddleware(
      ...combinedMiddleware,
    ))
  )

  sagaMiddleware.run(rootSagas)
  
  return store
}