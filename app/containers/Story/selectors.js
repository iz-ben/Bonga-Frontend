import { createSelector } from 'reselect';
import { initialState } from './reducer';
import makeSelectShare from '../Share/selectors';

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

const makeSelectReplyEditorContent = ()=>
  createSelector(makeSelectStory(),  substate => substate.editorContent);

const makeSelectReplyRecaptcha = ()=>
  createSelector(makeSelectStory(),  substate => substate.recaptcha);


export default makeSelectStory;
export {
  selectStoryDomain,
  makeSelectACtiveStory,
  makeSelectReplies,
  makeSelectNetworkActive,
  makeSelectReplyRecaptcha,
  makeSelectReplyEditorContent
};
