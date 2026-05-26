import { name, reducer, actions } from './slice'
import { authInit } from './saga'
import { selectors } from './selectors'

export const LogOutFeature = {
    sagas: {
        init: authInit
    },
    actions,
    reducer: {
        [name]: reducer
    },
    selectors
}