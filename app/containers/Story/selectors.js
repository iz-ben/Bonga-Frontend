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

export default makeSelectStory;
export { selectStoryDomain };
