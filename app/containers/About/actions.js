/*
 *
 * About actions
 *
 */

import {
  CONTACT_FORM_RECEIVED_ACTION, CONTACT_FORM_REMOVE_MESSAGE_ACTION,
  DEFAULT_ACTION,
  DISPLAY_MODAL_ACTION,
  HIDE_MODAL_ACTION,
  SUBMIT_FORM_ACTION,
  UPDATE_FIELD_ACTION, VALIDATION_ERRORS_ACTION,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function displayModal() {
  return {
    type: DISPLAY_MODAL_ACTION,
  };
}

export function hideModal() {
  return {
    type: HIDE_MODAL_ACTION,
  };
}

export function updateField(name, value) {
  return {
    type: UPDATE_FIELD_ACTION,
    name,
    value
  };
}

export function submitContactForm(name, phone, email, comment) {
  return {
    type: SUBMIT_FORM_ACTION,
    name,
    phone,
    email,
    comment
  };
}

export function contactFormSentSuccessFully(message) {
  return {
    type:CONTACT_FORM_RECEIVED_ACTION,
    message
  }
}

export function removeMessage() {
  return {
    type:CONTACT_FORM_REMOVE_MESSAGE_ACTION,
    message
  }
}


export function validationErrors(errors) {
  return {
    type: VALIDATION_ERRORS_ACTION,
    errors
  };
}
