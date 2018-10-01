/*
 *
 * Register reducer
 *
 */

import { fromJS } from 'immutable';
import {
  REGISTRATION_MESSAGE_ACTION,
  REGISTRATION_SUCCESSFUL_ACTION,
  UPDATE_FIELD_ACTION,
  UPDATE_FIELD_VALIDATION_ACTION,
} from './constants';

export const initialState = fromJS({
  name: '',
  email: '',
  phone: '',
  profession: '',
  avatar: null,
  validation: {
    name: false,
    email: false,
    phone: false,
    profession: false,
  },
  message: null,
  messageType: null,
});

function registerReducer(state = initialState, action) {
  const { validation } = state.toJS();
  switch (action.type) {
    case UPDATE_FIELD_ACTION:
      return state.set(action.name, action.value);
    case UPDATE_FIELD_VALIDATION_ACTION:
      return state.set('validation', {
        ...validation,
        [action.name]: action.value,
      });
    case REGISTRATION_SUCCESSFUL_ACTION:
      return state
        .set('name', '')
        .set('email', '')
        .set('phone', '')
        .set('profession', '')
        .set('avatar', '')
        .set('validation', {
          name: false,
          email: false,
          phone: false,
          profession: false,
        })
        .set('message', action.message.message)
        .set('messageType', action.message.type);
    case REGISTRATION_MESSAGE_ACTION:
      return state
        .set('message', action.message.message)
        .set('messageType', action.message.type);
    default:
      return state;
  }
}

export default registerReducer;
