import { combineReducers } from 'redux'
import modals from './modals'
import user from './user'
import auth from './auth'
import profile from './profile'
import project from './project'
import tree from './tree'
import files from './files'
import location from './location'
import search from './search'
import desktop from './desktop'
import tags from './tags'
import categories from './categories'
import guide from './guide'
import comments from './comments'

const wevolverApp = combineReducers({
  modals,
  categories,
  auth,
  profile,
  project,
  tree,
  files,
  user,
  location,
  search,
  desktop,
  tags,
  guide,
  comments,
})

export default wevolverApp
