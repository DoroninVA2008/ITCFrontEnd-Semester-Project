export interface ContactEventPayload {
  name: string;
  date: string;
  description: string;
  eventType: string;
  zipFile?: File | null;
}

const getEventTypeId = (value: string): number | null => {
  if (value === 'political') return 1
  if (value === 'military') return 2
  return null
}

const toIsoDate = (value: string): string | null => {
  const parts = value.split('.')
  if (parts.length !== 3) return null
  const [ddStr, mmStr, yyyyStr] = parts
  const day = Number(ddStr)
  const month = Number(mmStr)
  const year = Number(yyyyStr)
  if (
    !Number.isInteger(day) ||
    !Number.isInteger(month) ||
    !Number.isInteger(year)
  ) return null
  if (year < 862 || year > 2026) return null
  if (month < 1 || month > 12) return null
  const daysInMonth = new Date(year, month, 0).getDate()
  if (day < 1 || day > daysInMonth) return null
  const yyyy = String(year).padStart(4, '0')
  const mm = String(month).padStart(2, '0')
  const dd = String(day).padStart(2, '0')
  return `${yyyy}-${mm}-${dd}`
}

export const submitContactForm = async (
  formApiUrl: string,
  eventPayload: ContactEventPayload,
  email: string,
  telegram: string,
): Promise<void> => {
  const eventDate = toIsoDate(eventPayload.date)
  if (!eventDate) {
    alert('Некорректная дата. Используйте формат ДД.ММ.ГГГГ!')
    return
  }

  const eventTypeId = getEventTypeId(eventPayload.eventType)
  if (!eventTypeId) {
    alert('Некорректный тип события.')
    return
  }

  const MAX_FILE_SIZE = 350 * 1024 * 1024 // 350 МБ
  if (eventPayload.zipFile && eventPayload.zipFile.size > MAX_FILE_SIZE) {
    alert('Необходим сайт в ZIP-архиве с размером менее 350 МБ. Внутри архива в корне или на первом уровне вложенности должен быть index.html.')
    return
  }

  const formData = new FormData()
  formData.append('title', eventPayload.name)
  formData.append('description', eventPayload.description)
  if (eventPayload.zipFile) {
    formData.append('archive', eventPayload.zipFile)
  }
  formData.append('email', email)
  formData.append('telegramUsername', telegram)
  formData.append('eventDate', eventDate)
  formData.append('eventTypeId', String(eventTypeId))

  const res = await fetch(formApiUrl, {
    method: 'POST',
    body: formData,
    headers: {
      'Accept': 'application/json',
    },
  })

  if (!res.ok) {
    let serverMessage = ''
    try {
      const errBody = await res.json()
      serverMessage = errBody?.message || errBody?.error || JSON.stringify(errBody)
    } catch {
      serverMessage = await res.text().catch(() => '')
    }
    throw new Error(serverMessage || `HTTP error! status: ${res.status}`)
  }

  const data = await res.json()
  if (data.message !== 'success') {
    throw new Error('Unexpected response format')
  }
}
