import { FNStatsItemsKeys, FNStatsModesKeys } from '@wnm.development/fortnite-api'

export type ISPTaskType = 'community-goal' | 'additional' | 'creator-pass'
export type ISPTaskDays = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun'

export type ISPTaskTwitchConditions =
  | 'linkAccount'
  | 'followCreator'
  | 'followFortnite'
  | 'watchCreator30'
  | 'watchCreator60'
  | 'writeComment'
  | 'buyCreatorChallenge'
  | 'sendEmote'
  | 'subscribeCreator'
  | 'watchGoal'

export type ISPTaskCondition =
  | { type: 'twitch', condition: ISPTaskTwitchConditions }
  | { type: 'fortnite', modes: FNStatsModesKeys | FNStatsModesKeys[] | 'all', fields: FNStatsItemsKeys | FNStatsItemsKeys[] }
