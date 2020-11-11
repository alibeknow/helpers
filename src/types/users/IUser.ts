import { ITwitchAuth } from './ITwitchAuth'

enum passType {
  'SOCIAL',
  'FAN',
}

export interface IUser {
  id: number;
  epicUserId: string;
  twitchUserId: string;
  selectedCreator: Creator;
  passType: passType;
  emotes: Emotes[];
  tasksProgress: Tasks;
}

export interface Emotes {
  id: number;
  code: string;
}

export interface Creator {
  id: number;
  twitchUserId: string;
  login: string;
  token: ITwitchAuth;
  urlToken: string;
  gameId: number;
}

export interface Tasks {
  mondayTasks: IncludedTasks;
  tuesdayTasks: IncludedTasks;
  wednesdayTasks: IncludedTasks;
  thursdayTasks: IncludedTasks;
  fridayTasks: IncludedTasks;
  saturdayTasks: IncludedTasks;
  sundayTasks: IncludedTasks;
  communityGoalTasks: IncludedTasks;
}

interface IncludedTasks {
  twitch: number;
  fortnite: number;
}

export interface ICountUsers {
  count: ICountUsersAr[];
}

export interface ICountUsersAr {
  creator_id: number | null;
  counts: number;
}
