import { userActionTypes } from './userActionTypes'
import { authActionTypes } from './authActionTypes'
import { projectActionTypes } from './projectActionTypes'
import { profileActionTypes } from './profileActionTypes'
import { fileActionTypes } from './fileActionTypes'
import { locationActionTypes } from './locationActionTypes'
import { searchActionTypes } from './searchActionTypes'
import { desktopActionTypes } from './desktopActionTypes'
import { tagsActionTypes } from './tagsActionTypes'
import { categoriesActionTypes } from './categoriesActionTypes'
import { wizardActionTypes } from './wizardActionTypes'
import { guideActionTypes } from './guideActionTypes'

export const ActionTypes = {
  ...userActionTypes,
  ...authActionTypes,
  ...projectActionTypes,
  ...profileActionTypes,
  ...fileActionTypes,
  ...locationActionTypes,
  ...searchActionTypes,
  ...desktopActionTypes,
  ...tagsActionTypes,
  ...categoriesActionTypes,
  ...wizardActionTypes,
  ...guideActionTypes,
}
