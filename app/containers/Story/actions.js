/*
 *
 * Story actions
 *
 */

import { GET_STORY_ACTION, GET_STORY_ERROR_ACTION, GET_STORY_SUCCESS_ACTION } from './constants';
import { UPDATE_NETWORK_ACTIVITY_ACTION } from '../Share/constants';

export function getStory(id) {
  return {
    type: GET_STORY_ACTION,
    id
  };
}


export function getStorySuccess(story) {
  return {
    type: GET_STORY_SUCCESS_ACTION,
    story
  };
}

export function getStoryError(message) {
  return {
    type: GET_STORY_ERROR_ACTION,
    message
  };
}

export function updateNetworkActivity( active = false ) {
  return {
    type: UPDATE_NETWORK_ACTIVITY_ACTION,
    active
  };
}
