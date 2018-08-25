import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the share state domain
 */

const selectShareDomain = state => state.get('share', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by Share
 */

const makeSelectShare = () =>
  createSelector(selectShareDomain, substate => substate.toJS());

const makeSelectStories = ()=>
  createSelector(makeSelectShare(),  substate => substate.stories);

const makeSelectVisibleItems = ()=>
  createSelector(makeSelectShare(),  substate => substate.visibleItems);

const makeSelectEditorOpen = ()=>
  createSelector(makeSelectShare(),  substate => substate.editorOpen);

const makeSelectPages = ()=>
  createSelector(makeSelectShare(),  substate => substate.pages);

const makeSelectNetworkActive = ()=>
  createSelector(makeSelectShare(),  substate => substate.xhrActive);

const makeSelectCurrentPage = ()=>
  createSelector(makeSelectShare(),  substate => substate.currentPage);

const makeSelectComment = (id)=>
  createSelector(makeSelectShare(),  substate => substate.stories.find(story=>story.id===id));

export default makeSelectShare;
export {
  selectShareDomain,
  makeSelectStories,
  makeSelectEditorOpen,
  makeSelectPages,
  makeSelectNetworkActive,
  makeSelectComment,
  makeSelectVisibleItems,
  makeSelectCurrentPage
};
