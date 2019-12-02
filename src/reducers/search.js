import { ActionTypes } from '../constants/index';

const initialState = {
  1: {
    next: 'first'
  },
  siteSearchQuery: '',
  siteSearchResults: [],
  siteSearchQueryLoading: false,
  siteSearchQueryNoResults: false,
}
const search = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SEARCH_SUCCESS:
      let results = {
        [action.page]: {
          results: action.payload
        }
      }
      if(action.next) {
        results[action.page + 1] = {
            next: action.next
          }
      }
      return Object.assign({}, state, results)
    case '@@router/LOCATION_CHANGE':
      return initialState
    case ActionTypes.ON_SITE_SEARCH:
      return Object.assign({}, state, {
        siteSearchQuery: action.query,
        siteSearchQueryLoading: true,
      })
    case ActionTypes.ON_SITE_SEARCH_SUCCESS:
    return Object.assign({}, state, {
      siteSearchResults: action.payload,
      siteSearchQueryLoading: false,
      siteSearchQueryNoResults: false
    })
    case ActionTypes.ON_SITE_SEARCH_FAIL:
    return Object.assign({}, state, {
      siteSearchQueryNoResults: true,
      siteSearchQueryLoading: false,
    })
    default:
      return state
  }
}

export default search
