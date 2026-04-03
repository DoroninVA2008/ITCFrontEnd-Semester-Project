export var tiLayer = 'https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png';
export var landGeoJSon = 'https://raw.githubusercontent.com/datasets/geo-boundaries-world-110m/master/countries.geojson'; // ./src/entities/countries.geojson
export var eventsListDates = 'https://api.russia-heroes.ru/api/objects'; // ./src/entities/objects.json
export var formApi = 'https://api.russia-heroes.ru/api/requests'; // ./src/entities/requests.json
export var eventsListTypes = 'https://api.russia-heroes.ru/api/event-types'; // ./src/entities/event-types.json
export var card = (id: number) => `https://api.russia-heroes.ru/api/objects/${id}`; // ./src/entities/object${id}.json
export const cards: string[] = Array.from({ length: 23 }, (_, i) => card(i + 1)); // https://api.russia-heroes.ru/docs
export var adminLogIn = 'https://api.russia-heroes.ru/api/admin/login';
export var adminReFresh = 'https://api.russia-heroes.ru/api/admin/refresh';
export var adminLogOut = 'https://api.russia-heroes.ru/api/admin/logout';
export var adminList = 'https://api.russia-heroes.ru/api/admin/requests'; // ./src/entities/admin-requests.json
export var adminCard = (id: number) => `https://api.russia-heroes.ru/api/admin/requests/${id}`; // ./src/entities/admin-requests.json
export const adminCards: string[] = Array.from({ length: 23 }, (_, i) => adminCard(i + 1));
export var admins = 'https://api.russia-heroes.ru/api/admin/admins';
export var DelAdmins = (id: number) => `https://api.russia-heroes.ru/api/admin/admins/${id}`;