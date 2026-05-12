export const apiServer = 'https://api.russia-heroes.ru' // import.meta.env.VITE_API_BASE ?? 
export var tiLayer = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Physical_Map/MapServer/tile/{z}/{y}/{x}'
export var landGeoJSon = 'https://raw.githubusercontent.com/datasets/geo-boundaries-world-110m/master/countries.geojson' // ./src/features/layer-position/countries.geojson
export var checkBack = `${apiServer}/api/ping`
export var eventsListDates = `${apiServer}/api/objects`
export var card = (id: number) => `${apiServer}/api/objects/${id}`
export const cards: string[] = Array.from({ length: 23 }, (_, i) => card(i + 1))
export var formApi = `${apiServer}/api/requests`
export var eventsListTypes = `${apiServer}/api/event-types`
export var adminLogIn = `${apiServer}/api/admin/login`
export var adminReFresh = `${apiServer}/api/admin/refresh`
export var adminLogOut = `${apiServer}/api/admin/logout`
export var adminList = `${apiServer}/api/admin/requests`
export var adminCard = (id: number) => `${apiServer}/api/admin/requests/${id}`
export const adminCards: string[] = Array.from({ length: 23 }, (_, i) => adminCard(i + 1))
export var adminReview = (id: number) => `${apiServer}/api/admin/requests/${id}/review`
export const adminReviews: string[] = Array.from({ length: 1 }, (_, i) => adminReview(i + 1))
export var AddForm = (id: number) => `${apiServer}/api/admin/requests/${id}/approve`
export var PublForm = (id: number) => `${apiServer}/api/admin/requests/${id}/publish`
export var DelForm = (id: number) => `${apiServer}/api/admin/requests/${id}/reject`
export var HisForm = `${apiServer}/api/admin/history`
export var admins = `${apiServer}/api/admin/admins`
export var DelEven = (id: number) => `${apiServer}/api/admin/requests/${id}/object`
export var UpdEven = (id: number) => `${apiServer}/api/admin/requests/${id}/object/coordinates`
export var DelAdmins = (id: number) => `${apiServer}/api/admin/admins/${id}`
export var RolAdmins = (id: number) => `${apiServer}/api/admin/admins/${id}/role`