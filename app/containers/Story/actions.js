/*
 *
 * Story actions
 *
 */

import {
  GET_STORY_ACTION,
  GET_STORY_ERROR_ACTION,
  GET_STORY_SUCCESS_ACTION,
  RECAPTCHA_ERROR_ACTION,
  SUBMIT_REPLY_ACTION,
  SUBMIT_REPLY_SUCCESS_ACTION,
  SUBMIT_STORY_VALIDATION_ERROR,
  TYPE_TEXT_ACTION,
  UPDATE_NETWORK_ACTIVITY_ACTION,
  UPDATE_RECAPTCHA_ACTION,
} from './constants';

export function getStory(id) {
  return {
    type: GET_STORY_ACTION,
    id,
  };
}

export function getStorySuccess(story) {
  return {
    type: GET_STORY_SUCCESS_ACTION,
    story,
  };
}

export function getStoryError(message) {
  return {
    type: GET_STORY_ERROR_ACTION,
    message,
  };
}

export function updateNetworkActivity(active = false) {
  return {
    type: UPDATE_NETWORK_ACTIVITY_ACTION,
    active,
  };
}

export const typeReplyText = content => ({
  type: TYPE_TEXT_ACTION,
  content,
});

export const updateReplyRecaptcha = content => ({
  type: UPDATE_RECAPTCHA_ACTION,
  content,
});

export const submitReply = (content, recaptcha, replyTo = null) => {
  // console.log(typeof text, text)
  if (content === '') {
    return {
      type: SUBMIT_STORY_VALIDATION_ERROR,
    };
  }
  // console.log(typeof recaptcha, recaptcha)

  if (recaptcha === '') {
    return {
      type: RECAPTCHA_ERROR_ACTION,
    };
  }
  // console.log(recatpcha)
  return {
    type: SUBMIT_REPLY_ACTION,
    content,
    recaptcha,
    replyTo,
  };
};

export const submitReplySuccessful = story => ({
  type: SUBMIT_REPLY_SUCCESS_ACTION,
  story,
});
