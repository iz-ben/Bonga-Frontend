/*
 *
 * Register actions
 *
 */

import {
  SUBMIT_REGISTRATION_ACTION,
  UPDATE_FIELD_ACTION,
  UPDATE_FIELD_VALIDATION_ACTION,
} from './constants';

export function updateField(name, value) {
  return {
    type: UPDATE_FIELD_ACTION,
    name,
    value,
  };
}

export function updateFieldValidation(name, value) {
  return {
    type: UPDATE_FIELD_VALIDATION_ACTION,
    name,
    value,
  };
}

export function submitRegistrationForm(data) {
  return {
    type: SUBMIT_REGISTRATION_ACTION,
    data,
  };
}
