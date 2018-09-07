import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the register state domain
 */

const selectRegisterDomain = state => state.get('register', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by Register
 */

const makeSelectRegister = () =>
  createSelector(selectRegisterDomain, substate => substate.toJS());

const makeSelectName = () =>
  createSelector(makeSelectRegister(), substate => substate.name);

const makeSelectEmail = () =>
  createSelector(makeSelectRegister(), substate => substate.email);

const makeSelectPhone = () =>
  createSelector(makeSelectRegister(), substate => substate.phone);

const makeSelectProfession = () =>
  createSelector(makeSelectRegister(), substate => substate.profession);

const makeSelectAvatar = () =>
  createSelector(makeSelectRegister(), substate => substate.avatar);

const makeSelectValidations = () =>
  createSelector(makeSelectRegister(), substate => substate.validation);

export default makeSelectRegister;
export {
  selectRegisterDomain,
  makeSelectPhone,
  makeSelectEmail,
  makeSelectName,
  makeSelectAvatar,
  makeSelectProfession,
  makeSelectValidations,
};
