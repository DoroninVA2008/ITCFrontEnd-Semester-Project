export interface Request {
  id: string
  title: string
  date: string
  status: string
  description: string
  eventDate: string
  eventType: string
  telegram: string
  email: string
}

export const mockRequests: Request[] = [
  {
    id: 'APP-001',
    title: 'Битва при Бородино',
    date: '15 марта 2026, 10:30',
    status: 'published',
    description: 'Крупнейшее сражение Отечественной войны 1812 года между русской армией под командованием генерала М. И. Кутузова и французской армией Наполеона I Бонапарта.',
    eventDate: '7 Сентября 1812',
    eventType: 'Битва',
    telegram: '@KCTowner',
    email: 'History@mail.com',
  },
  {
    id: 'APP-002',
    title: 'Ледовое побоище',
    date: '18 мар. 2026, 14:15',
    status: 'review',
    description: 'Сражение на Чудском озере в 1242 году между новгородским войском под предводительством князя Александра Невского и ливонскими рыцарями.',
    eventDate: '5 Апреля 1242',
    eventType: 'Битва',
    telegram: '@HistoryFan',
    email: 'fan@mail.com',
  },
  {
    id: 'APP-003',
    title: 'Полтавская битва',
    date: '19 мар. 2026, 9:45',
    status: 'review',
    description: 'Решающее сражение Великой Северной войны, в котором армия Петра I разгромила шведские войска Карла XII.',
    eventDate: '8 Июля 1709',
    eventType: 'Битва',
    telegram: '@PetrFan',
    email: 'peter@mail.com',
  },
  {
    id: 'APP-004',
    title: 'Куликовская битва',
    date: '20 мар. 2026, 11:20',
    status: 'published',
    description: 'Сражение между объединённым русским войском под командованием московского великого князя Дмитрия Донского и войском темника Золотой Орды Мамая.',
    eventDate: '8 Сентября 1380',
    eventType: 'Битва',
    telegram: '@DmitryFan',
    email: 'dmitry@mail.com',
  },
  {
    id: 'APP-005',
    title: 'Восстание декабристов',
    date: '20 мар. 2026, 16:30',
    status: 'rejected',
    description: 'Попытка государственного переворота, совершённая 14 декабря 1825 года группой дворян-офицеров на Сенатской площади в Санкт-Петербурге.',
    eventDate: '14 Декабря 1825',
    eventType: 'Восстание',
    telegram: '@DecemberFan',
    email: 'dec@mail.com',
  },
]