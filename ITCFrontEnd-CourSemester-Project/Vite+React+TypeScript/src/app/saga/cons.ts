export var tiLayer = 'https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png';
export var landGeoJSon = './src/features/layer-position/countries.geojson'; // https://raw.githubusercontent.com/datasets/geo-boundaries-world-110m/master/countries.geojson
export var eventsListDates = 'https://155-212-132-55.sslip.io/api/objects/get-objects-list'; // Для типов событии фильтров
export var formApi = 'https://155-212-132-55.sslip.io/api/requests/create-request'; // Для формы подачи заявки
export var eventsListTypes = 'https://155-212-132-55.sslip.io/api/objects/get-event-types-list'; // 
export var card = (id: number) => `https://155-212-132-55.sslip.io/api/objects/get-object-data/${id}`;
export const cards: string[] = Array.from({ length: 23 }, (_, i) => card(i + 1));