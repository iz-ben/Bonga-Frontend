/*
 *
 * Register reducer
 *
 */

import { fromJS } from 'immutable';
import { UPDATE_FIELD_ACTION, UPDATE_FIELD_VALIDATION_ACTION } from './constants';

export const initialState = fromJS({
  name:'',
  email:'',
  phone:'',
  profession:'',
  avatar:null,
  validation:{
    name:false,
    email:false,
    phone:false,
    profession:false,
  }
});

function registerReducer(state = initialState, action) {
  const validation = state.toJS().validation;
  switch (action.type) {
    case UPDATE_FIELD_ACTION:
      return state.set(action.name, action.value);
    case UPDATE_FIELD_VALIDATION_ACTION:
      return state.set('validation', {...validation, [action.name]:action.value});
    default:
      return state;
  }
}

export default registerReducer;
