export var tiLayer = 'https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png';
export var landGeoJSon = 'https://raw.githubusercontent.com/datasets/geo-boundaries-world-110m/master/countries.geojson'; // ./src/entities/countries.geojson
export var checkBack = 'https://api.russia-heroes.ru/api/ping'; // ./src/entities/ping.json
export var eventsListDates = 'https://api.russia-heroes.ru/api/objects'; // ./src/entities/objects.json
export var card = (id: number) => `https://api.russia-heroes.ru/api/objects/${id}`; // ./src/entities/object${id}.json
export const cards: string[] = Array.from({ length: 23 }, (_, i) => card(i + 1)); // https://api.russia-heroes.ru/docs
export var formApi = 'https://api.russia-heroes.ru/api/requests'; // ./src/entities/requests.json
export var eventsListTypes = 'https://api.russia-heroes.ru/api/event-types'; // ./src/entities/event-types.json
export var adminLogIn = 'https://api.russia-heroes.ru/api/admin/login'; // ./src/entities/admin-login.json
export var adminReFresh = 'https://api.russia-heroes.ru/api/admin/refresh'; // ./src/entities/admin-refresh.json
export var adminLogOut = 'https://api.russia-heroes.ru/api/admin/logout'; // ./src/entities/admin-logout.json
export var adminList = 'https://api.russia-heroes.ru/api/admin/requests'; // ./src/entities/admin-requests.json
export var adminCard = (id: number) => `https://api.russia-heroes.ru/api/admin/requests/${id}`; // ./src/entities/admin-request${id}.json
export const adminCards: string[] = Array.from({ length: 23 }, (_, i) => adminCard(i + 1)); // https://api.russia-heroes.ru/api
export var adminReview = (id: number) => `https://api.russia-heroes.ru/api/admin/requests/${id}/review`; // ./src/entities/admin-request${id}-review.json
export const adminReviews: string[] = Array.from({ length: 1 }, (_, i) => adminReview(i + 1));
export var AddForm = (id: number) => `https://api.russia-heroes.ru/api/admin/requests/${id}/approve`; // ./src/entities/admin-request${id}-approve.json
export var PublForm = (id: number) => `https://api.russia-heroes.ru/api/admin/requests/${id}/publish`; // ./src/entities/admin-request${id}-publish.json
export var DelForm = (id: number) => `https://api.russia-heroes.ru/api/admin/requests/${id}/reject`; // ./src/entities/admin-request${id}-reject.json
export var HisForm = 'https://api.russia-heroes.ru/api/admin/history'; // ./src/entities/admin-history.json
export var admins = 'https://api.russia-heroes.ru/api/admin/admins'; // ./src/entities/admin-admins.json
export var DelAdmins = (id: number) => `https://api.russia-heroes.ru/api/admin/admins/${id}`; // ./src/entities/admin-admin${id}.json
export var RolAdmins = (id: number) => `https://api.russia-heroes.ru/api/admin/admins/${id}/role`; // ./src/entities/admin-admin${id}/role.json