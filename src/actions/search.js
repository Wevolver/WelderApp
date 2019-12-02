import { ActionTypes } from '../constants/index'

export const search = (page, next, tags, limit, hiddenTags, source) => {
  return {
    type: ActionTypes.SEARCH,
    page,
    next,
    tags,
    limit,
    source,
    hiddenTags
  }
}


export const onSiteSearch = (query) => {
  return {
    type: ActionTypes.ON_SITE_SEARCH,
    query
  }
}