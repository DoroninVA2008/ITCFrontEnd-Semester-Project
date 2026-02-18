export enum EventType {
    Battle = 1,
    Tragedy = 2
}

export interface EventObject {
    id: number;
    title: string;
    description: string;
    latitude: string;
    longitude: string;
    eventDate: string;
    eventType: EventType;
    previewUrlImage: string;
}

interface ApiResponse {
    objects: EventObject[];
}

type Coordinates = [number, number];

const API_URL = 'https://155-212-132-55.sslip.io/api/objects/get-objects-list'; // http://155.212.132.55:7666/api/objects/get-objects-list

class EventsDataService {
    private static instance: EventsDataService;
    private _events: EventObject[] = [];
    private _eventsPosition: Map<string, Coordinates> = new Map();
    private _isLoaded = false;
    private _loadingPromise: Promise<void> | null = null;

    private constructor() {}

    static getInstance(): EventsDataService {
        if (!EventsDataService.instance) {
            EventsDataService.instance = new EventsDataService();
        }
        return EventsDataService.instance;
    }

    get events(): EventObject[] {
        return this._events;
    }

    get eventsPosition(): Map<string, Coordinates> {
        return this._eventsPosition;
    }

    get isLoaded(): boolean {
        return this._isLoaded;
    }

    async loadData(): Promise<void> {
        if (this._isLoaded) {
            return;
        }

        if (this._loadingPromise) {
            return this._loadingPromise;
        }

        this._loadingPromise = this.fetchData();
        return this._loadingPromise;
    }

    private async fetchData(): Promise<void> {
        try {
            console.log('Загрузка данных с сервера...');
            
            // Добавляем таймаут и заголовки для CORS
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 секунд таймаут
            
            const response = await fetch(API_URL, {
                method: 'POST',
                signal: controller.signal,
                mode: 'cors',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            
            clearTimeout(timeoutId);
            
            if (!response.ok) {
                throw new Error(`HTTP ошибка! Статус: ${response.status} - ${response.statusText}`);
            }
            
            const data: ApiResponse = await response.json();
            
            if (data?.objects && Array.isArray(data.objects)) {
                this._events = data.objects;
                this._eventsPosition.clear();
                
                this._events.forEach((event) => {
                    const lat = parseFloat(event.latitude);
                    const lng = parseFloat(event.longitude);

                    if (!isNaN(lat) && !isNaN(lng)) {
                        this._eventsPosition.set(event.id.toString(), [lat, lng]);
                    } else {
                        console.warn(
                            `[EventsDataService] Не удалось распарсить координаты для события ID: ${event.id}, ` +
                            `Title: "${event.title}", Координаты: (${event.latitude}, ${event.longitude})`
                        );
                    }
                });
                
                this._isLoaded = true;
                console.log(`✅ Загружено событий: ${this._events.length}`);
            } else {
                throw new Error('Нет данных в ответе сервера или неверный формат');
            }
        } catch (error) {
            console.error('❌ [EventsDataService] Ошибка при загрузке данных:', error);
            this._isLoaded = false;
            
            // Пробуем загрузить резервные данные (если есть)
            await this.loadBackupData();
            
            throw error;
        } finally {
            this._loadingPromise = null;
        }
    }


    // Добавляем метод для загрузки резервных данных
    private async loadBackupData(): Promise<void> {
        try {
            // Пробуем загрузить из локального файла как запасной вариант
            const backupResponse = await fetch('./src/features/events/evenlists.json');
            if (backupResponse.ok) {
                const backupData = await backupResponse.json();
                if (backupData?.objects) {
                    this._events = backupData.objects;
                    this._eventsPosition.clear();
                    
                    this._events.forEach((event) => {
                        const lat = parseFloat(event.latitude);
                        const lng = parseFloat(event.longitude);
                        if (!isNaN(lat) && !isNaN(lng)) {
                            this._eventsPosition.set(event.id.toString(), [lat, lng]);
                        }
                    });
                    
                    this._isLoaded = true;
                    console.log('✅ Загружены резервные данные');
                }
            }
        } catch (backupError) {
            console.log('❌ Нет резервных данных');
        }
    }

    getEventPosition(eventId: number): Coordinates | undefined {
        return this._eventsPosition.get(eventId.toString());
    }

    getEventById(eventId: number): EventObject | undefined {
        return this._events.find(event => event.id === eventId);
    }
}

export const eventsDataService = EventsDataService.getInstance();
export const EventsPosition = eventsDataService.eventsPosition;
