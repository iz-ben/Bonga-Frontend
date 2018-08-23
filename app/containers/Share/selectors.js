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

export default makeSelectShare;
export { selectShareDomain };
