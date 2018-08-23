import { fromJS } from 'immutable';
import storyReducer from '../reducer';

describe('storyReducer', () => {
  it('returns the initial state', () => {
    expect(storyReducer(undefined, {})).toEqual(fromJS({}));
  });
});
