// import { take, call, put, select } from 'redux-saga/effects';

// Individual exports for testing
import { takeLatest, call, put, } from 'redux-saga/effects';
import { API_BASE } from 'utils/constants';
import request from 'utils/request';
import { SUBMIT_REGISTRATION_ACTION } from './constants';

export function* sendToServer({data}) {
  const headers = {
    method: 'POST',
    // credentials: 'include',
    body: JSON.stringify(data),
    headers: {
      //Authorization: `Bearer ${auth.token()}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  };
  console.log(headers);
}

export default function* registerSaga() {
  yield takeLatest(SUBMIT_REGISTRATION_ACTION, sendToServer)
}
