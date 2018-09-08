import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the partners state domain
 */

const selectPartnersDomain = state => state.get('partners', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by Partners
 */

const makeSelectPartners = () =>
  createSelector(selectPartnersDomain, substate => substate.toJS());

export default makeSelectPartners;
export { selectPartnersDomain };
