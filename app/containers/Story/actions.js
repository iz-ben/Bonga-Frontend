/*
 *
 * Story actions
 *
 */

import {
  GET_STORY_ACTION,
  GET_STORY_ERROR_ACTION,
  GET_STORY_SUCCESS_ACTION,
  TYPE_TEXT_ACTION, UPDATE_NETWORK_ACTIVITY_ACTION,
  UPDATE_RECAPTCHA_ACTION,
} from './constants';

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


export const typeReplyText = ( content ) => {
  return {
    type: TYPE_TEXT_ACTION,
    content
  }
};

export const updateReplyRecaptcha = ( content ) => {
  return {
    type: UPDATE_RECAPTCHA_ACTION,
    content
  }
};
