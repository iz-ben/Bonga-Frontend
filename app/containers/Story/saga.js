// import { take, call, put, select } from 'redux-saga/effects';

// Individual exports for testing
import { takeLatest,call, put } from 'redux-saga/effects';
import { GET_STORY_ACTION } from './constants';
import { getStoryError, getStorySuccess } from './actions';
import request from 'utils/request';
import { API_BASE } from 'utils/constants';
import { updateNetworkActivity } from './actions';

export function* fetchStory({id}) {
  //console.log(id);
  yield put(updateNetworkActivity(true));
  const headers = {
    method: 'GET',
    headers: {
      //Authorization: `Bearer ${auth.token()}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  };

  try {
    // Call our request helper (see 'utils/request')
    const req = yield call(request, `${API_BASE}/thread/${id}`, headers); //
    //console.log(req);
    yield put(getStorySuccess(req.data));
    yield put(updateNetworkActivity(false));
  } catch (err) {
    //console.log(err);
    yield put(getStoryError('Something went wrong'));
    yield put(updateNetworkActivity(false));
  }
}

export default function* storySaga() {
  yield takeLatest(GET_STORY_ACTION, fetchStory);
}
