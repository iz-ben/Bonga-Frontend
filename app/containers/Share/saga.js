// import { take, call, put, select } from 'redux-saga/effects';

// Individual exports for testing
import { takeLatest, call, put } from 'redux-saga/effects';
import request from 'utils/request';
import { API_BASE } from 'utils/constants';
import { GET_COMMENTS_ACTION, SUBMIT_STORY_ACTION } from './constants';
import {
  commentPostedSuccessfully,
  commentsFetchedError,
  commentsFetchedSuccessfully,
  updateNetworkActivity,
} from './actions';

export function* fetchComments({ page, tag }) {
  // console.log(page);
  yield put(updateNetworkActivity(true));
  const headers = {
    method: 'GET',
    headers: {
      // Authorization: `Bearer ${auth.token()}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };

  try {
    // Call our request helper (see 'utils/request')
    const req = yield call(
      request,
      `${API_BASE}/comments?page=${page}${tag ? `&tag=${tag}` : ``}`,
      headers,
    ); //
    yield put(updateNetworkActivity(false));
    // console.log(req);
    yield put(commentsFetchedSuccessfully(req.data, req.meta));
  } catch (err) {
    yield put(updateNetworkActivity(false));
    yield put(commentsFetchedError('Something went wrong'));
  }
}

export function* sendStory({ content, recaptcha, replyTo }) {
  // console.log(content, recaptcha, replyTo);
  const headers = {
    method: 'POST',
    headers: {
      // Authorization: `Bearer ${auth.token()}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      content,
      recaptcha,
      replyTo,
    }),
  };

  try {
    const req = yield call(request, `${API_BASE}/comments`, headers); //
    yield put(commentPostedSuccessfully(req.data));
    // console.log(req);
  } catch (err) {
    console.log(err);
  }
}

export default function* shareSaga() {
  yield [
    takeLatest(GET_COMMENTS_ACTION, fetchComments),
    takeLatest(SUBMIT_STORY_ACTION, sendStory),
  ];
}
