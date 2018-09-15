/*
 *
 * Share reducer
 *
 */

import { fromJS } from 'immutable';
import {
  CLOSE_EDITOR_ACTION,
  DEFAULT_ACTION,
  GET_COMMENTS_SUCCESSFUL_ACTION,
  POST_COMMENT_SUCCESSFUL_ACTION,
  TYPE_TEXT_ACTION,
  UPDATE_NETWORK_ACTIVITY_ACTION,
  UPDATE_RECAPTCHA_ACTION,
} from './constants';
import { removeDuplicates } from 'utils/arrayUtil';
import { animateScroll as scroll } from 'react-scroll';

export const initialState = fromJS({
  stories: [],
  visibleItems: [],
  editorOpen: false,
  xhrActive: false,
  pages: 0,
  order: 'DESC',
  currentPage: 1,
  from: 0,
  to: 0,
  editorContent: {},
  recaptcha: null,
  editorActive: false,
});

function shareReducer(state = initialState, action) {
  const stories = state.toJS().stories;
  const visibleItems = state.toJS().visibleItems;

  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case GET_COMMENTS_SUCCESSFUL_ACTION:
      scroll.scrollToTop(0);
      return state
        .set(
          'stories',
          removeDuplicates([...stories, ...action.comments], 'id'),
        )
        .set('visibleItems', removeDuplicates([...action.comments], 'id'))
        .set('pages', Math.ceil(action.meta.total / action.meta.per_page))
        .set(
          'from',
          action.comments.length
            ? action.comments[action.comments.length - 1].time
            : 0,
        )
        .set('to', action.comments.length ? action.comments[0].time : 0)
        .set('currentPage', action.meta.current_page - 1);
    case UPDATE_NETWORK_ACTIVITY_ACTION:
      return state.set('xhrActive', action.active);
    case TYPE_TEXT_ACTION:
      // return state;
      // console.log('editorContent', action.content);
      return state.set('editorContent', { editor: action.content });
    case UPDATE_RECAPTCHA_ACTION:
      return state.set('recaptcha', action.content);
    case POST_COMMENT_SUCCESSFUL_ACTION:
      return state
        .set('stories', [action.comment, ...stories])
        .set('visibleItems', [action.comment, ...visibleItems])
        .set('editorContent', {})
        .set('editorActive', false);
    case CLOSE_EDITOR_ACTION:
      return state.set('editorActive', false);
    default:
      return state;
  }
}

export default shareReducer;
