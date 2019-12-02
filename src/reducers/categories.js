import { ActionTypes } from '../constants/index';

const categories = (state = { active: [], loading: true}, action) => {
  switch (action.type) {
    case ActionTypes.CATEGORIES_GET_REQUEST:
      return Object.assign({}, state, {loading: true})
    case ActionTypes.CATEGORIES_GET_SUCCESS:
      return Object.assign({}, state, {active: action.payload, loading: false})
    default:
      return state
  }
}

export default categories
