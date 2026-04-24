import { HisForm } from '../../../entities/cons'
import { showErrorAlert } from '../admin-function/errorAlert'

type ActionType = 'rejected' | 'approved' | 'review'

const ACTION_LABEL: Record<ActionType, string> = {
  rejected: 'Отклонение заявки',
  approved: 'Одобрение заявки',
  review:   'Взята на проверку',
}

// бэк может вернуть как английский ключ, так и русскую строку
const ACTION_TYPE_MAP: Record<string, ActionType> = {
  approved:      'approved',
  rejected:      'rejected',
  review:        'review',
  'Одобрена':    'approved',
  'Одобрено':    'approved',
  'Отклонена':   'rejected',
  'Отклонено':   'rejected',
  'На проверке': 'review',
}

export interface LogEntry {
  id: string
  action: ActionType
  actionLabel: string
  requestTitle: string
  requestId: string
  comment: string
  adminLogin: string
  date: string
}

export interface FetchHistoryParams {
  q?: string
  page?: number
  limit?: number
}

export interface FetchHistoryResult {
  entries: LogEntry[]
  total: number
}

export const fetchHistory = async (params: FetchHistoryParams = {}): Promise<FetchHistoryResult> => {
  try {
    const query = new URLSearchParams()
    if (params.q)     query.set('q',     params.q)
    if (params.page)  query.set('page',  String(params.page))
    if (params.limit) query.set('limit', String(params.limit))

    const url = query.toString() ? `${HisForm}?${query}` : HisForm

    const response = await fetch(url, {
      method: 'GET',
      credentials: 'include',
    })
    if (!response.ok) {
      showErrorAlert(response.status)
      throw new Error(`HTTP ${response.status}`)
    }

    const json = await response.json()
    console.log('[fetchHistory] raw response:', json)

    const data: any[] = Array.isArray(json?.history) ? json.history
      : Array.isArray(json?.data)    ? json.data
      : Array.isArray(json?.results) ? json.results
      : Array.isArray(json?.items)   ? json.items
      : Array.isArray(json)          ? json
      : []

    const total: number = typeof json?.total === 'number' ? json.total : data.length

    const entries = data.map((item): LogEntry => {
      const action = ACTION_TYPE_MAP[item.action ?? ''] ?? 'review'
      return {
        id:           String(item.id),
        action,
        actionLabel:  ACTION_LABEL[action] ?? item.action ?? action,
        requestTitle: item.requestTitle  ?? item.request_title  ?? '',
        requestId:    String(item.requestId ?? item.request_id ?? ''),
        comment:      item.comment       ?? item.description    ?? '',
        adminLogin:   item.adminLogin    ?? item.admin_login    ?? item.moderator ?? '',
        date:         item.createdAt     ?? item.created_at     ?? item.date      ?? '',
      }
    })

    return { entries, total }
  } catch (err) {
    console.error('Ошибка загрузки истории:', err)
    return { entries: [], total: 0 }
  }
}
