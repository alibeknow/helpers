import { SPUser, SPUserDay } from '../models/users'
import { ISPTaskDays } from '../types/misc'

export function filterUserDays<T extends Pick<SPUserDay, 'day'> & { [key: string]: any }>
(user: Pick<SPUser, 'passType'> & { [key: string]: any }, days: T[]): T[] {
  return days.filter(day => {
    if (user.passType === 'SOCIAL') return true
    if (day.day !== ISPTaskDays.tue && day.day !== ISPTaskDays.sun) return true
    return false
  })
}
