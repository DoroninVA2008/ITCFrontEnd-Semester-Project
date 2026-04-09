import { adminReview } from '../../entities/cons'

export const submitMarkerReview = async (
  // id: string | number,
  lat: number,
  lng: number,
  eventTypeId: number
): Promise<void> => {// const numId = typeof id === 'string' ? parseInt(id, 1) : id;
  const response = await fetch(adminReview(1), {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ lat, lng, event_type: eventTypeId }),
  })
  if (!response.ok) {
    throw new Error(`submitMarkerReview failed: ${response.status}`)
  }
}
