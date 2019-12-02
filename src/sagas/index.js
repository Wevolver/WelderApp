import { all, fork } from 'redux-saga/effects'

import auth from './auth'
import profile from './profile'
import project from './project'
import user from './user'
import file from './file'
import guide from './guide'
import search from './search'
import desktop from './desktop'
import tags from './tags'
import categories from './categories'
import wizard from './wizard'
/**
 * rootSaga
 */
export default function* root() {
  yield all([
    fork(auth),
    fork(user),
    fork(profile),
    fork(project),
    fork(file),
    fork(guide),
    fork(search),
    fork(desktop),
    fork(tags),
    fork(categories),
    fork(wizard),
  ]);
}
