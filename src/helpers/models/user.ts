import { Sequelize } from 'sequelize-typescript'
import { Redis } from 'ioredis'
import { SPTask, SPTwitchCreatorTask, SPUser, SPUserDay, SPUserTask } from '../../models'
import type { SPModelsHelper } from './index'
import { FindOptions, WhereOptions } from 'sequelize'
import { ISPTaskDays, ISPUser, ISPUserDay } from '@wnm.development/fortnite-social-pass-types'
import { SPFilterUserDays, SPGetCurrentDay } from '../user'
import { SPEndDate, SPStartDate } from '../constants'

export class SPModelsHelperUser {
  sequelize: Sequelize
  redis: Redis
  user: SPUser
  instance: SPModelsHelper

  constructor(sequelize: Sequelize, redis: Redis, user: SPUser, instance: SPModelsHelper) {
    this.sequelize = sequelize
    this.redis = redis
    this.user = user
    this.instance = instance
  }

  static getUserRelationsFindOptions(sequelize: Sequelize): FindOptions {
    return {
      order: [
        [{ model: sequelize.getRepository(SPUserDay), as: 'days' }, 'day', 'ASC'],
        [{ model: sequelize.getRepository(SPUserTask), as: 'tasks' }, 'id', 'ASC'],
      ],
      include: [
        sequelize.getRepository(SPUserTask),
        sequelize.getRepository(SPUserDay),
      ],
    }
  }

  static findUserWithRelations(user: SPUser | number, sequelize: Sequelize, findOptions: WhereOptions = {}): Promise<SPUser> {
    return sequelize.getRepository(SPUser).findOne(
      {
        ...SPModelsHelperUser.getUserRelationsFindOptions(sequelize),
        where: {
          id: typeof user === 'number' ? user : user.id,
          ...findOptions,
        },
      },
    )
  }

  getUserRelationsFindOptions(): FindOptions {
    return {
      order: [
        [{ model: this.sequelize.getRepository(SPUserDay), as: 'days' }, 'day', 'ASC'],
        [{ model: this.sequelize.getRepository(SPUserTask), as: 'tasks' }, 'id', 'ASC'],
      ],
      include: [
        this.sequelize.getRepository(SPUserTask),
        this.sequelize.getRepository(SPUserDay),
      ],
    }
  }

  findUserWithRelations(user: SPUser | number, findOptions: WhereOptions = {}): Promise<SPUser> {
    return this.sequelize.getRepository(SPUser).findOne(
      {
        ...this.getUserRelationsFindOptions(),
        where: {
          id: typeof user === 'number' ? user : user.id,
          ...findOptions,
        },
      },
    )
  }

  private async createUserDays(tasks: SPTask[]): Promise<ISPUserDay[]> {
    let currentDay: null | SPUserDay = null
    const filteredDays = SPFilterUserDays(this.user, this.user.days)
    for (const day of filteredDays) {
      if (day.completed) continue
      if ((day.day === ISPTaskDays.sun || day.day === ISPTaskDays.sat) && SPGetCurrentDay() < 5) continue

      currentDay = day
      break
    }

    const days: ISPUserDay[] = []
    for (let i = 0; i < filteredDays.length; i++) {
      const day = filteredDays[i]

      const dayTasks: [SPUserTask, SPTask][] = this.user.tasks.filter(x => x.dayId === day.id).map(task => {
        const originalTask = tasks.find(x => x.id === task.taskId)
        if (!originalTask) throw new Error('Original task not found in createUserDays in createUserFromModel')

        return [task, originalTask]
      })

      days.push({
        id: day.id,
        day: ISPTaskDays[day.day] as keyof typeof ISPTaskDays,
        dayId: day.day,
        completed: day.completed,
        isClosedBecauseOfPrevious: !day.completed && currentDay?.id !== day.id,
        isClosedUntilSaturday: (day.day === ISPTaskDays.sun || day.day === ISPTaskDays.sat) && SPGetCurrentDay() < 5,
        tasks: await Promise.all(dayTasks.map(tasks => this.instance.tasks.createTaskFromModel(...tasks))),
      })
    }

    return days
  }

  async createUserFromModel(ignoreMissingRelations = false): Promise<ISPUser> {
    if (!this.user.tasks || !this.user.days) {
      if (!ignoreMissingRelations) throw new Error('SPDay or SPUserTask are missing in passed user in SPModelsHelperUser. You have to include them')
      else {
        const newUser = await this.findUserWithRelations(this.user)
        if (!newUser) throw new Error('User not found in SPModelsHelperUser')
        this.user = newUser
      }
    }

    const [tasks, creators] = await Promise.all([
      this.instance.redis.getTasks(),
      this.instance.redis.getCreators(),
    ])

    const creator = creators.find(x => x.id === this.user.id)

    const additionalTasks: [SPUserTask, SPTask][] = this.user.tasks.filter(x => !x.dayId).map(task => {
      const originalTask = tasks.find(x => x.id === task.taskId)
      if (!originalTask) throw new Error('Original task not found in additional tasks in createUserFromModel')

      return [task, originalTask]
    })

    const creatorTasks: [SPTwitchCreatorTask, SPTask][] = creator?.tasks.map(task => {
      const originalTask = tasks.find(x => x.id === task.taskId)
      if (!originalTask) throw new Error('Original task not found in creator tasks in createUserFromModel')

      return [task, originalTask]
    }) || []

    return {
      id: this.user.id,
      isFortniteAccountClosed: this.user.isFortniteAccountClosed,
      epicUserId: this.user.epicUserId,
      creatorId: this.user.creatorId,
      createdAt: this.user.createdAt,
      nickname: this.user.nickname,
      passType: this.user.passType,
      twitchUserId: this.user.twitchUserId,
      additionalTasks: await Promise.all(additionalTasks.map(tasks => this.instance.tasks.createTaskFromModel(...tasks))),
      creatorTasks: await Promise.all(creatorTasks.map(tasks => this.instance.tasks.createTaskFromModel(...tasks))),
      days: await this.createUserDays(tasks),
      startDateEvent: SPStartDate.getTime(),
      endDateEvent: SPEndDate.getTime(),
    }
  }
}
