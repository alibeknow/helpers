import { SPUser } from '../../models'
import { ISPTaskCondition, ISPTaskDays, ISPTaskTwitchConditions, ISPTaskType } from './tasks'
import { FNStatsAllModesKeys, FNStatsItemsKeys } from '@wnm.development/fortnite-api'

export interface ISPUser {
  id: number
  epicUserId: string
  creatorId: number | null
  createdAt: string
  nickname: string
  passType: SPUser['passType']
  twitchUserId: string | null
  additionalTasks: ISPTask[]
  creatorTasks: ISPTask[]
  days: ISPUserDay[]
}

export interface ISPUserDay {
  id: number
  day: keyof typeof ISPTaskDays
  dayId: ISPTaskDays
  completed: boolean
  isClosedUntilSaturday: boolean
  isClosedBecauseOfPrevious: boolean
  tasks: ISPTask[]
}

export interface ISPTask {
  id: number
  name: string
  comment: string | null
  needed: number
  progress: number
  completed: boolean
  taskType: ISPTaskType
  conditionType: ISPTaskCondition['type']
  twitchCondition: ISPTaskTwitchConditions | null
  fortniteCondition: {
    modes: FNStatsAllModesKeys[]
    fields: FNStatsItemsKeys[]
  } | null
}
