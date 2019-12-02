import { ActionTypes } from '../constants/index';

export const getCategories = () => {
  return {
    type: ActionTypes.CATEGORIES_GET_REQUEST
  };
}
