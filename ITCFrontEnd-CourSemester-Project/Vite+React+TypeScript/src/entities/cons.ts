export var tiLayer = 'https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png';
export var landGeoJSon = 'https://raw.githubusercontent.com/datasets/geo-boundaries-world-110m/master/countries.geojson'; // ./src/entities/countries.geojson
export var eventsListDates = 'https://api.russia-heroes.ru/api/objects'; // ./src/entities/objects.json
export var formApi = 'https://api.russia-heroes.ru/api/requests'; // ./src/entities/requests.json
export var eventsListTypes = 'https://api.russia-heroes.ru/api/event-types'; // ./src/entities/event-types.json
export var card = (id: number) => `https://api.russia-heroes.ru/api/objects/${id}`; // ./src/entities/object${id}.json
export const cards: string[] = Array.from({ length: 23 }, (_, i) => card(i + 1)); // https://api.russia-heroes.ru/docs
export var admin = 'https://api.russia-heroes.ru/api/admin/requests'