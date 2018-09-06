/*
 *
 * Share actions
 *
 */

import {
  CLOSE_EDITOR_ACTION,
  DISPLAY_EDITOR_ACTION,
  GET_COMMENTS_ACTION,
  GET_COMMENTS_ERROR_ACTION,
  GET_COMMENTS_SUCCESSFUL_ACTION,
  POST_COMMENT_SUCCESSFUL_ACTION,
  RECAPTCHA_ERROR_ACTION,
  SUBMIT_STORY_ACTION,
  SUBMIT_STORY_VALIDATION_ERROR,
  TYPE_TEXT_ACTION,
  UPDATE_NETWORK_ACTIVITY_ACTION,
  UPDATE_RECAPTCHA_ACTION,
} from './constants';

export function updateNetworkActivity(active = false) {
  return {
    type: UPDATE_NETWORK_ACTIVITY_ACTION,
    active,
  };
}

export function getComments(page = 0, tag = null) {
  return {
    type: GET_COMMENTS_ACTION,
    page,
    tag,
  };
}

export function commentPostedSuccessfully(comment) {
  return {
    type: POST_COMMENT_SUCCESSFUL_ACTION,
    comment,
  };
}

export function commentsFetchedSuccessfully(comments, meta) {
  return {
    type: GET_COMMENTS_SUCCESSFUL_ACTION,
    comments,
    meta,
  };
}

export function commentsFetchedError(message) {
  return {
    type: GET_COMMENTS_ERROR_ACTION,
    message,
  };
}

export const submitStory = (content, recaptcha, replyTo = null) => {
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
    type: SUBMIT_STORY_ACTION,
    content,
    recaptcha,
    replyTo,
  };
};

export const typeText = content => ({
  type: TYPE_TEXT_ACTION,
  content,
});

export const updateRecaptcha = content => ({
  type: UPDATE_RECAPTCHA_ACTION,
  content,
});

export const closeEditor = () => ({
  type: CLOSE_EDITOR_ACTION,
});

export const displayEditor = () => ({
  type: DISPLAY_EDITOR_ACTION,
});
