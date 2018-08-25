/*
 *
 * Story reducer
 *
 */

import { fromJS } from 'immutable';
import { GET_STORY_SUCCESS_ACTION } from './constants';
import { UPDATE_NETWORK_ACTIVITY_ACTION } from '../Share/constants';

export const initialState = fromJS({
  story:null,
  replies:[],
  editorOpen:false,
  sorting:'ASC',
  xhrActive:false
});

function storyReducer(state = initialState, action) {
  switch (action.type) {
    case GET_STORY_SUCCESS_ACTION:
      return state
        .set('story', action.story)
        .set('replies', action.story.replies);
    case UPDATE_NETWORK_ACTIVITY_ACTION:
      return state.set('xhrActive', action.active);
    default:
      return state;
  }
}

export default storyReducer;
