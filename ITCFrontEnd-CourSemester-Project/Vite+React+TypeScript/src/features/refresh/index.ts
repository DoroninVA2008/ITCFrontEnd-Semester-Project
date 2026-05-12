import { name, reducer, actions } from './slice'
import { authInit } from './saga'

export const Auth = {
    sagas: {
        init: authInit
    },
    actions,
    reducer: {
        [name]: reducer
    }
}