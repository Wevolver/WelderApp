import { ActionTypes } from '../constants/index';

export const wizardCreateProject = (data, careables) => {
  return {
    type: ActionTypes.WIZARD_CREATE_PROJECT,
    data,
    careables
  }
}
