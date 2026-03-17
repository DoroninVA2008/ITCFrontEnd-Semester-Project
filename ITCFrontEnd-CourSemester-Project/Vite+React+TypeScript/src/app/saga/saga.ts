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
export var landGeoJSon = 'https://raw.githubusercontent.com/datasets/geo-boundaries-world-110m/master/countries.geojson'; // ./src/features/layers/countries.geojson
export var eventsListDates = 'https://155-212-132-55.sslip.io/api/objects/get-objects-list'; // Для типов событии фильтров
export var formApi = 'https://155-212-132-55.sslip.io/api/requests/create-request'; // Для формы подачи заявки
export var eventsListTypes = 'https://155-212-132-55.sslip.io/api/objects/get-event-types-list'; // 
export var card1 = 'https://155-212-132-55.sslip.io/api/objects/get-object-data/1';
export var card2 = 'https://155-212-132-55.sslip.io/api/objects/get-object-data/2';
export var card3 = 'https://155-212-132-55.sslip.io/api/objects/get-object-data/3';
export var card4 = 'https://155-212-132-55.sslip.io/api/objects/get-object-data/4';
export var card5 = 'https://155-212-132-55.sslip.io/api/objects/get-object-data/5';
export var card6 = 'https://155-212-132-55.sslip.io/api/objects/get-object-data/6';
export var card7 = 'https://155-212-132-55.sslip.io/api/objects/get-object-data/7';
export var card8 = 'https://155-212-132-55.sslip.io/api/objects/get-object-data/8';
export var card9 = 'https://155-212-132-55.sslip.io/api/objects/get-object-data/9';
export var card10 = 'https://155-212-132-55.sslip.io/api/objects/get-object-data/10';
export var card11 = 'https://155-212-132-55.sslip.io/api/objects/get-object-data/11';
export var card12 = 'https://155-212-132-55.sslip.io/api/objects/get-object-data/12';
export var card13 = 'https://155-212-132-55.sslip.io/api/objects/get-object-data/13';
export var card14 = 'https://155-212-132-55.sslip.io/api/objects/get-object-data/14';
export var card15 = 'https://155-212-132-55.sslip.io/api/objects/get-object-data/15';
export var card16 = 'https://155-212-132-55.sslip.io/api/objects/get-object-data/16';
export var card17 = 'https://155-212-132-55.sslip.io/api/objects/get-object-data/17';
export var card18 = 'https://155-212-132-55.sslip.io/api/objects/get-object-data/18';
export var card19 = 'https://155-212-132-55.sslip.io/api/objects/get-object-data/19';
export var card20 = 'https://155-212-132-55.sslip.io/api/objects/get-object-data/20';
export var card21 = 'https://155-212-132-55.sslip.io/api/objects/get-object-data/21';
export var card22 = 'https://155-212-132-55.sslip.io/api/objects/get-object-data/22';
export var card23 = 'https://155-212-132-55.sslip.io/api/objects/get-object-data/23';
export const cards = [
  card1, card2, card3, card4, card5, card6,
  card7, card8, card9, card10, card11, card12,
  card13, card14, card15, card16, card17, card18,
  card19, card20, card21, card22, card23
]

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