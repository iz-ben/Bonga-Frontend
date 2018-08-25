/*
 *
 * Share reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION, GET_COMMENTS_SUCCESSFUL_ACTION, UPDATE_NETWORK_ACTIVITY_ACTION } from './constants';
import { removeDuplicates } from '../../utils/arrayUtil';
import { animateScroll as scroll } from 'react-scroll';

export const initialState = fromJS({
  stories:[],
  visibleItems:[],
  editorOpen:false,
  xhrActive:false,
  pages:0,
  order:'DESC',
  currentPage:1,
  from:0,
  to:0

});

function shareReducer(state = initialState, action) {
  const stories = state.toJS().stories;

  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case GET_COMMENTS_SUCCESSFUL_ACTION:
      scroll.scrollToTop(0);
      return state
        .set('stories', removeDuplicates([...stories, ...action.comments], 'id'))
        .set('visibleItems', removeDuplicates([...action.comments], 'id'))
        .set('pages', Math.ceil(action.meta.total/action.meta.per_page))
        .set('from', action.comments[action.comments.length-1].time)
        .set('to', action.comments[0].time)
        .set('currentPage', action.meta.current_page - 1);
    case UPDATE_NETWORK_ACTIVITY_ACTION:
      return state.set('xhrActive', action.active);
    default:
      return state;
  }
}

export default shareReducer;
