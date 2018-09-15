/*
 *
 * Story reducer
 *
 */

import { fromJS } from 'immutable';
import {
  GET_STORY_SUCCESS_ACTION,
  SUBMIT_REPLY_SUCCESS_ACTION,
  TYPE_TEXT_ACTION,
  UPDATE_NETWORK_ACTIVITY_ACTION,
  UPDATE_RECAPTCHA_ACTION,
} from './constants';

export const initialState = fromJS({
  story: null,
  replies: [],
  editorOpen: false,
  sorting: 'ASC',
  xhrActive: false,
  editorContent: {},
  recaptcha: null,
});

function storyReducer(state = initialState, action) {
  switch (action.type) {
    case GET_STORY_SUCCESS_ACTION:
      return state
        .set('story', action.story)
        .set('replies', action.story.replies);
    case SUBMIT_REPLY_SUCCESS_ACTION:
      return state
        .set('story', action.story)
        .set('replies', action.story.replies)
        .set('editorContent', {})
        .set('editorOpen', false);
    case UPDATE_NETWORK_ACTIVITY_ACTION:
      return state.set('xhrActive', action.active);
    case TYPE_TEXT_ACTION:
      return state.set('editorContent', { editor: action.content });
    case UPDATE_RECAPTCHA_ACTION:
      return state.set('recaptcha', action.content);

    default:
      return state;
  }
}

export default storyReducer;
