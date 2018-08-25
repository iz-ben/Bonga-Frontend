import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the story state domain
 */

const selectStoryDomain = state => state.get('story', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by Story
 */

const makeSelectStory = () =>
  createSelector(selectStoryDomain, substate => substate.toJS());

const makeSelectACtiveStory = ()=>
  createSelector(makeSelectStory(), substate => substate.story);

const makeSelectReplies = ()=>
  createSelector(makeSelectStory(), substate => substate.replies);

const makeSelectNetworkActive = ()=>
  createSelector(makeSelectStory(), substate => substate.xhrActive);


export default makeSelectStory;
export {
  selectStoryDomain,
  makeSelectACtiveStory,
  makeSelectReplies,
  makeSelectNetworkActive
};
