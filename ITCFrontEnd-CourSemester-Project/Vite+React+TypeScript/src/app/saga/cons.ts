export var tiLayer = 'https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png';
export var landGeoJSon = 'https://raw.githubusercontent.com/datasets/geo-boundaries-world-110m/master/countries.geojson'; // ./src/features/layer-position/countries.geojson
export var eventsListDates = 'https://api.russia-heroes.ru/api/objects'; // Для типов событии фильтров
export var formApi = 'https://api.russia-heroes.ru/api/requests'; // Для формы подачи заявки
export var eventsListTypes = 'https://api.russia-heroes.ru/api/event-types'; // https://api.russia-heroes.ru/docs
export var card = (id: number) => `https://api.russia-heroes.ru/api/objects/${id}`;
export const cards: string[] = Array.from({ length: 23 }, (_, i) => card(i + 1));