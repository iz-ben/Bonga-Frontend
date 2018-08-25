// import { take, call, put, select } from 'redux-saga/effects';

// Individual exports for testing
import { takeLatest,call, put } from 'redux-saga/effects';
import { GET_COMMENTS_ACTION } from './constants';
import request from 'utils/request';
import { API_BASE } from 'utils/constants';
import { commentsFetchedError, commentsFetchedSuccessfully, updateNetworkActivity } from './actions';

export function* fetchComments({page}) {
  //console.log(page);
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
    const req = yield call(request, `${API_BASE}/comments?page=${page}`, headers); //
    yield put(updateNetworkActivity(false));
    //console.log(req);
    yield put(commentsFetchedSuccessfully(req.data, req.meta));
  } catch (err) {
    yield put(updateNetworkActivity(false));
    yield put(commentsFetchedError('Something went wrong'));
  }
}

export default function* shareSaga() {
  yield takeLatest(GET_COMMENTS_ACTION, fetchComments );
}
