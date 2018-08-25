import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the about state domain
 */

const selectAboutDomain = state => state.get('about', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by About
 */

const makeSelectAbout = () =>
  createSelector(selectAboutDomain, substate => substate.toJS());

const makeSelectDialogState = ()=>
  createSelector(makeSelectAbout(), substate => substate.modalOpen);

const makeSelectName = ()=>
  createSelector(makeSelectAbout(), substate => substate.name);

const makeSelectEmail = ()=>
  createSelector(makeSelectAbout(), substate => substate.email);

const makeSelectPhone = ()=>
  createSelector(makeSelectAbout(), substate => substate.phone);

const makeSelectComment = ()=>
  createSelector(makeSelectAbout(), substate => substate.comment);

const makeSelectErrors = ()=>
  createSelector(makeSelectAbout(), substate => substate.errors);

const makeSelectMessage = ()=>
  createSelector(makeSelectAbout(), substate => substate.message);

export default makeSelectAbout;
export {
  selectAboutDomain,
  makeSelectDialogState,
  makeSelectName,
  makeSelectEmail,
  makeSelectPhone,
  makeSelectComment,
  makeSelectErrors,
  makeSelectMessage
};
