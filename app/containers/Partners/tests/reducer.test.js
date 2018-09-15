import { fromJS } from 'immutable';
import partnersReducer from '../reducer';

describe('partnersReducer', () => {
  it('returns the initial state', () => {
    expect(partnersReducer(undefined, {})).toEqual(fromJS({}));
  });
});
