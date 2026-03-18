import { takeLatest, put, call } from 'redux-saga/effects'
import { PayloadAction } from '@reduxjs/toolkit'

interface FetchDataPayload {
  id?: number;
  url?: string;
}

interface DataResponse {
  data: any;
}

export var tiLayer = 'https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png';
export var landGeoJSon = 'https://raw.githubusercontent.com/datasets/geo-boundaries-world-110m/master/countries.geojson'; // ./src/features/layers/countries.geojson
export var eventsListDates = 'https://155-212-132-55.sslip.io/api/objects/get-objects-list'; // Для типов событии фильтров
export var formApi = 'https://155-212-132-55.sslip.io/api/requests/create-request'; // Для формы подачи заявки
export var eventsListTypes = 'https://155-212-132-55.sslip.io/api/objects/get-event-types-list'; // 
export const card = (id: number) => `https://155-212-132-55.sslip.io/api/objects/get-object-data/${id}`;
export const cards: string[] = Array.from({ length: 23 }, (_, i) => card(i + 1));

const FETCH_DATA = 'FETCH_DATA'; export const FETCH_CARD_DATA = 'FETCH_CARD_DATA';
const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS'; export const FETCH_CARD_DATA_SUCCESS = 'FETCH_CARD_DATA_SUCCESS';
const FETCH_DATA_FAILURE = 'FETCH_DATA_FAILURE'; export const FETCH_CARD_DATA_FAILURE = 'FETCH_CARD_DATA_FAILURE';

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