const Events = 'http://155.212.132.55:7666/api/objects/get-event-types-list'; // ./src/pages/map/events/evenlists.json

const headers = {
    'Content-Type': 'application/json',
};

interface EventType {
  id: number;
  name: string;
  description: string;
  latitude?: number;
  longitude?: number;
  country?: string;
  // Добавляем возможные поля из API
  location?: string;
  coordinates?: string;
  lat?: number;
  lng?: number;
  position?: any;
}

export const eventsAPI = {
    getAll: async (): Promise<EventType[]> => {
        try {
            console.log('Запрос к:', Events);
            const response = await fetch(Events, { headers });
            console.log('Статус ответа:', response.status);
            
            if (!response.ok) {
                throw new Error(`Ошибка HTTP: ${response.status}`);
            }
            
            const data = await response.json();
            console.log('Получены данные:', data);
            
            // Обрабатываем данные в зависимости от структуры ответа
            return processEventsData(data);
        } catch (error) {
            console.error('Ошибка при получении данных:', error);
            return [];
        }
    },
};

// Функция для обработки данных из API
const processEventsData = (data: any): EventType[] => {
    if (!data) return [];
    
    // Если данные - массив объектов
    if (Array.isArray(data)) {
        return data.map((item, index) => ({
            id: item.id || index,
            name: item.name || item.title || item.eventName || `Событие ${index + 1}`,
            description: item.description || item.details || item.info || 'Нет описания',
            
            // Пробуем извлечь координаты из разных возможных полей
            latitude: extractLatitude(item),
            longitude: extractLongitude(item),
            country: item.country || item.location || item.place || 'Неизвестно',
            
            // Сохраняем оригинальные данные для отладки
            ...item
        }));
    }
    
    // Если данные - объект с массивом внутри
    if (data.events || data.data || data.items) {
        return processEventsData(data.events || data.data || data.items);
    }
    
    console.warn('Неизвестный формат данных:', data);
    return [];
};

// Функции для извлечения координат из разных форматов
const extractLatitude = (item: any): number | undefined => {
    if (item.latitude !== undefined) return item.latitude;
    if (item.lat !== undefined) return item.lat;
    if (item.coordinates?.lat !== undefined) return item.coordinates.lat;
    if (item.position?.latitude !== undefined) return item.position.latitude;
    if (item.location?.latitude !== undefined) return item.location.latitude;
    
    // Пробуем парсить строку координат
    if (item.coordinates && typeof item.coordinates === 'string') {
        const coords = item.coordinates.split(',');
        if (coords.length >= 2) {
            return parseFloat(coords[0].trim());
        }
    }
    
    return undefined;
};

const extractLongitude = (item: any): number | undefined => {
    if (item.longitude !== undefined) return item.longitude;
    if (item.lng !== undefined) return item.lng;
    if (item.lon !== undefined) return item.lon;
    if (item.coordinates?.lng !== undefined) return item.coordinates.lng;
    if (item.coordinates?.lon !== undefined) return item.coordinates.lon;
    if (item.position?.longitude !== undefined) return item.position.longitude;
    if (item.location?.longitude !== undefined) return item.location.longitude;
    
    // Пробуем парсить строку координат
    if (item.coordinates && typeof item.coordinates === 'string') {
        const coords = item.coordinates.split(',');
        if (coords.length >= 2) {
            return parseFloat(coords[1].trim());
        }
    }
    
    return undefined;
};