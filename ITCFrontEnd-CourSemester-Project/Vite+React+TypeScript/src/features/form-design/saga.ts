import { takeLatest, put, call, select } from 'redux-saga/effects'
import { actions } from './slice'
import { submitContactForm } from '../form-dispatch/foreques'
import { selectEventPayload, selectEmail, selectTelegram } from './selectors'
import { formApi } from '../../entities/cons'
import type { ContactEventPayload } from '../form-dispatch/foreques'

function* handleSubmitForm(): Generator<any, void, any> {
  try {
    const eventPayload: ContactEventPayload = yield select(selectEventPayload)
    const email: string = yield select(selectEmail)
    const telegram: string = yield select(selectTelegram)

    if (!eventPayload) {
      yield put(actions.submitFailure('Данные события не найдены'))
      return
    }

    yield call(submitContactForm, formApi, eventPayload, email, telegram)
    yield put(actions.submitSuccess())
  } catch (err) {
    const msg = err instanceof Error ? err.message : ''
    if (!msg || msg.includes('NetworkError') || msg.includes('Failed to fetch')) {
      yield put(actions.submitFailure('Не удалось подключиться к серверу. Возможно, архив слишком большой или проблема с соединением.'))
    } else {
      yield put(actions.submitFailure(`Не удалось отправить заявку: ${msg}`))
    }
  }
}

export function* formDesignInit(): Generator<any, void, any> {
  yield takeLatest(actions.submitRequest.type, handleSubmitForm)
}
