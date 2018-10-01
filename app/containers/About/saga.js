// import { take, call, put, select } from 'redux-saga/effects';

// Individual exports for testing
import { takeLatest, call, put } from 'redux-saga/effects';
import { SUBMIT_FORM_ACTION } from './constants';
import { API_BASE } from '../../utils/constants';
import request from '../../utils/request';
import { contactFormSentSuccessFully, validationErrors } from './actions';

export function* sendContactForm({ name, phone, email, comment }) {
  // console.log(name, phone, email, comment);
  const headers = {
    method: 'POST',
    // credentials: 'include',
    body: JSON.stringify({
      name,
      phone,
      email,
      comment,
    }),
    headers: {
      // Authorization: `Bearer ${auth.token()}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };
  try {
    // Call our request helper (see 'utils/request')
    const req = yield call(request, `${API_BASE}/contacts`, headers); //
    // console.log(req);
    yield put(contactFormSentSuccessFully(req.message));
  } catch (err) {
    // console.info(err, err.response);
    if (err.response && err.response.status && err.response.status === 422) {
      // console.log(err.data)
      yield put(validationErrors(err.data.errors));
    }
    // yield put(trackUpdateError(err));
  }
}

export default function* aboutSaga() {
  yield takeLatest(SUBMIT_FORM_ACTION, sendContactForm);
}
