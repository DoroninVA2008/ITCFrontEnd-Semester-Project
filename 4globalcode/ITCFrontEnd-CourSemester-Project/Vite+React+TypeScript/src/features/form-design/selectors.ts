import { RootState } from '../../app/store'

export const selectName = (state: RootState) => state.formDesign.name
export const selectDate = (state: RootState) => state.formDesign.date
export const selectDescription = (state: RootState) => state.formDesign.description
export const selectEventType = (state: RootState) => state.formDesign.eventType
export const selectEventTypeLabel = (state: RootState) => state.formDesign.eventTypeLabel
export const selectZipFile = (state: RootState) => state.formDesign.zipFile
export const selectEventName = (state: RootState) => state.formDesign.eventName
export const selectEventPayload = (state: RootState) => state.formDesign.eventPayload
export const selectShowContactModal = (state: RootState) => state.formDesign.showContactModal
export const selectEmail = (state: RootState) => state.formDesign.email
export const selectTelegram = (state: RootState) => state.formDesign.telegram
export const selectIsSubmitting = (state: RootState) => state.formDesign.isSubmitting
export const selectSubmitDone = (state: RootState) => state.formDesign.submitDone
export const selectError = (state: RootState) => state.formDesign.error
export const selectIsSuccessOpen = (state: RootState) => state.formDesign.isSuccessOpen

export const selectIsMainFormValid = (state: RootState): boolean => {
  const { name, date, description, eventType, zipFile } = state.formDesign
  return (
    name.trim() !== '' &&
    date.trim() !== '' &&
    description.trim() !== '' &&
    eventType !== null &&
    zipFile !== null
  )
}

export const selectIsContactFormValid = (state: RootState): boolean => {
  const { email, telegram } = state.formDesign
  return email.includes('@') && email.trim() !== '' && telegram.trim() !== ''
}
