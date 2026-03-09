import { takeLatest, put, call } from 'redux-saga/effects'
import { PayloadAction } from '@reduxjs/toolkit'

interface FetchDataPayload {
  id: number;
}

interface DataResponse {
  data: any;
}

const FETCH_DATA = 'FETCH_DATA';
const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS';
const FETCH_DATA_FAILURE = 'FETCH_DATA_FAILURE';

export var tiLayer = 'https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png';
export var landGeoJSon = './src/features/layers/countries.geojson'; // https://raw.githubusercontent.com/datasets/geo-boundaries-world-110m/master/countries.geojson
export var eventsListTypes = 'https://155-212-132-55.sslip.io/api/objects/get-objects-list';
export var eventsListDates = 'http://155.212.132.55:7666/api/objects/get-objects-list';
export var formApi = 'https://155-212-132-55.sslip.io/api/requests/create-request';

const api = {
  fetchData: async (payload: FetchDataPayload): Promise<DataResponse> => {
    const response = await fetch(`/api/data/${payload.id}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  }
};

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

export function* watchFetchData(): Generator<any, void, any> {
  yield takeLatest(FETCH_DATA, fetchData);
}