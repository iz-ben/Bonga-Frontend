/*
 *
 * Share actions
 *
 */

import {
  DEFAULT_ACTION,
  GET_COMMENTS_ACTION,
  GET_COMMENTS_ERROR_ACTION,
  GET_COMMENTS_SUCCESSFUL_ACTION, UPDATE_NETWORK_ACTIVITY_ACTION,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function updateNetworkActivity( active = false ) {
  return {
    type: UPDATE_NETWORK_ACTIVITY_ACTION,
    active
  };
}

export function getComments(page = 0) {
  return {
    type: GET_COMMENTS_ACTION,
    page
  };
}



export function commentsFetchedSuccessfully( comments, meta ) {
  return {
    type: GET_COMMENTS_SUCCESSFUL_ACTION,
    comments,
    meta
  };
}

export function commentsFetchedError( message ) {
  return {
    type: GET_COMMENTS_ERROR_ACTION,
    message
  };
}
