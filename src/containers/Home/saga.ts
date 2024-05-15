import { put, takeLatest, delay } from 'redux-saga/effects';
import * as actions from  './actions';

export default function* homeSaga() {
  yield takeLatest(actions.requestLocation, location);
}

function* location({ payload }: ReturnType<typeof actions.requestLocation>) {
  try {
    yield delay(1000);
    yield put(actions.requestLocationSuccess(payload));
  } catch (e) {
    yield put(actions.requestLocationFailed());
  }
}
