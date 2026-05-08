import { name, reducer, actions } from './slice'
import { formDesignInit } from './saga'
export { SuggestEventModal } from './ui/modal'
export { ContactModal } from './ui/contac'
export * from './selectors'
export type { ContactEventPayload } from '../form-dispatch/foreques'

export const FormDesign = {
  sagas: { init: formDesignInit },
  actions,
  reducer: { [name]: reducer },
}
