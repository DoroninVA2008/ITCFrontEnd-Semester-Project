const B = import.meta.env.VITE_API_BASE ?? ''

export var tiLayer = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Physical_Map/MapServer/tile/{z}/{y}/{x}'
export var landGeoJSon = 'https://raw.githubusercontent.com/datasets/geo-boundaries-world-110m/master/countries.geojson'
export var checkBack = `${B}/api/ping`
export var eventsListDates = `${B}/api/objects`
export var card = (id: number) => `${B}/api/objects/${id}`
export const cards: string[] = Array.from({ length: 23 }, (_, i) => card(i + 1))
export var formApi = `${B}/api/requests`
export var eventsListTypes = `${B}/api/event-types`
export var adminLogIn = `${B}/api/admin/login`
export var adminReFresh = `${B}/api/admin/refresh`
export var adminLogOut = `${B}/api/admin/logout`
export var adminList = `${B}/api/admin/requests`
export var adminCard = (id: number) => `${B}/api/admin/requests/${id}`
export const adminCards: string[] = Array.from({ length: 23 }, (_, i) => adminCard(i + 1))
export var adminReview = (id: number) => `${B}/api/admin/requests/${id}/review`
export const adminReviews: string[] = Array.from({ length: 1 }, (_, i) => adminReview(i + 1))
export var AddForm = (id: number) => `${B}/api/admin/requests/${id}/approve`
export var PublForm = (id: number) => `${B}/api/admin/requests/${id}/publish`
export var DelForm = (id: number) => `${B}/api/admin/requests/${id}/reject`
export var HisForm = `${B}/api/admin/history`
export var admins = `${B}/api/admin/admins`
export var DelAdmins = (id: number) => `${B}/api/admin/admins/${id}`
export var RolAdmins = (id: number) => `${B}/api/admin/admins/${id}/role`