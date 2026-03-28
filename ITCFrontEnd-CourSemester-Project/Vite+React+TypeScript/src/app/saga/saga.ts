import { takeLatest, put, call } from 'redux-saga/effects'
import { PayloadAction } from '@reduxjs/toolkit'
import { api } from '../../entities/api.ts'
import { card } from './cons'

export interface FetchDataPayload {
  id?: number;
  url?: string;
}

export interface DataResponse {
  data: any;
}

const FETCH_DATA = 'FETCH_DATA'; export const FETCH_CARD_DATA = 'FETCH_CARD_DATA';
const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS'; export const FETCH_CARD_DATA_SUCCESS = 'FETCH_CARD_DATA_SUCCESS';
const FETCH_DATA_FAILURE = 'FETCH_DATA_FAILURE'; export const FETCH_CARD_DATA_FAILURE = 'FETCH_CARD_DATA_FAILURE';

function* fetchData(action: PayloadAction<FetchDataPayload>): Generator<any, void, DataResponse> {
  try {
    const response: DataResponse = yield call(api.fetchData, action.payload);

    yield put({
      type: FETCH_DATA_SUCCESS,
      payload: response.data
    });

  } catch (error: any) {
    yield put({
      type: FETCH_DATA_FAILURE,
      payload: error?.message || 'Unknown error'
    });
  }
}

function* fetchCardData(action: PayloadAction<number>): Generator<any, void, any> {
  try {
    const response: Response = yield call(fetch, card(action.payload));
    const data: any = yield call([response, 'json']);
    yield put({
      type: FETCH_CARD_DATA_SUCCESS,
      payload: data.object
    });
  } catch (error: any) {
    yield put({
      type: FETCH_CARD_DATA_FAILURE,
      payload: error?.message || 'Unknown error'
    });
  }
}

export function* watchFetchData(): Generator<any, void, any> {
  yield takeLatest(FETCH_DATA, fetchData);
}

export function* watchFetchCardData(): Generator<any, void, any> {
  yield takeLatest(FETCH_CARD_DATA, fetchCardData);
}