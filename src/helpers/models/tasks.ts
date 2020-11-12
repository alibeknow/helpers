import { Sequelize } from "sequelize-typescript";
import { Redis } from "ioredis";
import { ISPTask } from "@wnm.development/fortnite-social-pass-types";
import { SPTask, SPTwitchCreatorTask, SPUserTask } from "../../models";
import {
  FNStatsAllModesKeys,
  FNStatsItemsKeys,
  FNStatsModes,
  FNStatsTemporalModes
} from "@wnm.development/fortnite-api";

export class SPModelsHelperTasks {
  sequelize: Sequelize;
  redis: Redis;

  constructor(sequelize: Sequelize, redis: Redis) {
    this.sequelize = sequelize;
    this.redis = redis;
  }

  async createTaskFromModel(personalTask: SPUserTask | SPTwitchCreatorTask, task: SPTask): Promise<ISPTask> {
    let fields: FNStatsItemsKeys[] = [];
    let modes: FNStatsAllModesKeys[] = [];

    if (task.condition.type === "fortnite") {
      if (typeof task.condition.fields === "string") fields = [task.condition.fields];
      else fields = task.condition.fields;

      if (task.condition.modes === "all") modes = [
        ...Object.keys(FNStatsModes),
        ...Object.keys(FNStatsTemporalModes)
      ] as FNStatsAllModesKeys[];
      else if (typeof task.condition.modes === "string") modes = [task.condition.modes];
      else modes = task.condition.modes;
    }

    return {
      id: task.id,
      name: task.name,
      comment: task.comment,
      needed: task.needed,
      progress: personalTask.progress,
      completed: personalTask.completed,
      taskType: task.type,
      conditionType: task.condition.type,
      twitchCondition: task.condition.type === "twitch" ? task.condition.condition : null,
      fortniteCondition: task.condition.type === "fortnite" ? {
        fields,
        modes
      } : null
    };
  }
}
