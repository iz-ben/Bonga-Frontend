/*
 *
 * About reducer
 *
 */

import { fromJS } from 'immutable';
import {
  CONTACT_FORM_RECEIVED_ACTION, CONTACT_FORM_REMOVE_MESSAGE_ACTION,
  DEFAULT_ACTION,
  DISPLAY_MODAL_ACTION,
  HIDE_MODAL_ACTION,
  UPDATE_FIELD_ACTION,
  VALIDATION_ERRORS_ACTION,
} from './constants';

export const initialState = fromJS({
  modalOpen:false,
  name:'',
  phone:'',
  email:'',
  comment:'',
  errors:[],
  xhrActive:false,
  message:''
});

function aboutReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case DISPLAY_MODAL_ACTION:
      return state.set('modalOpen', true);
    case HIDE_MODAL_ACTION:
      return state
        .set('modalOpen', false)
        .set('message','');
    case UPDATE_FIELD_ACTION:
      return state.set(action.name, action.value);
    case VALIDATION_ERRORS_ACTION:
      return state.set('errors', action.errors);
    case CONTACT_FORM_RECEIVED_ACTION:
      return state
        .set('errors', [])
        .set('name','')
        .set('phone','')
        .set('email','')
        .set('comment','')
        .set('message', action.message);
    case CONTACT_FORM_REMOVE_MESSAGE_ACTION:
      return state.set('message','');
    default:
      return state;
  }
}

export default aboutReducer;
