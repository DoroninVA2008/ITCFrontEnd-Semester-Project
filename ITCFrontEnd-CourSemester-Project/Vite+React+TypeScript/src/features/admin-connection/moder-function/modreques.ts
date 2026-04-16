import { admins } from '../../../entities/cons'
import { Moderator, RoleType } from './modcard'

export const fetchModerators = async (): Promise<Moderator[]> => {
  try {
    const response = await fetch(admins, {
      method: 'GET',
      credentials: 'include',
    })
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    const json = await response.json()
    console.log('[fetchModerators] raw response:', json)
    const data: any[] = Array.isArray(json)
      ? json
      : Array.isArray(json?.data)
      ? json.data
      : Array.isArray(json?.admins)
      ? json.admins
      : Array.isArray(json?.results)
      ? json.results
      : Array.isArray(json?.items)
      ? json.items
      : []
    return data.map((item): Moderator => ({
      id: String(item.id),
      email: item.email ?? item.email_address ?? item.user_email ?? item.admin_email ?? '',
      login: item.login ?? item.username ?? item.admin_login ?? '',
      role: (item.role ?? item.role_type ?? item.roleType ?? 'admin') as RoleType,
      createdAt: item.created_at ?? item.createdAt ?? item.created_date ?? '',
    }))
  } catch (err) {
    console.error('Ошибка загрузки модераторов:', err)
    return []
  }
}
