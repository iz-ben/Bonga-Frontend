import { fromJS } from 'immutable';
import shareReducer from '../reducer';

describe('shareReducer', () => {
  it('returns the initial state', () => {
    expect(shareReducer(undefined, {})).toEqual(fromJS({}));
  });
});
