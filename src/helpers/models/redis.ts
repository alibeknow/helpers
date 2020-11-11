import { Model, Sequelize } from 'sequelize-typescript'
import { Redis } from 'ioredis'
import { SPEmote, SPTask, SPTwitchCreator, SPTwitchCreatorTask } from '../../models'
import { getCreatorsKey, getEmotesKey, getTasksKey, getUserKey } from '../redis-keys'
import { ISPUser } from '../../types/misc/models'

interface GetKeyFromRedisOptions<T extends Record<string, any> | any[]> {
  key: string
  getFunction: (sequelize: Sequelize) => Promise<T>
  cacheForMinutes?: number
}

export class SPModelsHelperRedis {
  sequelize: Sequelize
  redis: Redis

  constructor(sequelize: Sequelize, redis: Redis) {
    this.sequelize = sequelize
    this.redis = redis
  }

  async getDataFromRedis<T extends Record<string, any> | any[]>({
                                                                  key,
                                                                  cacheForMinutes = 5,
                                                                  getFunction,
                                                                }: GetKeyFromRedisOptions<T>): Promise<T> {
    const writeDateKey = `${ key }:i-write-date`
    const data = await this.redis.get(key)
    const writeDate = await this.redis.get(writeDateKey)

    if (!data || (writeDate && new Date().getTime() - new Date(+writeDate).getTime() > 1000 * 60 * cacheForMinutes)) {
      let dbData = await getFunction(this.sequelize)
      if (dbData instanceof Model) dbData = dbData.toJSON() as T
      else if (Array.isArray(dbData)) {
        dbData = dbData.map((data) => {
          if (typeof data === 'object' && data instanceof Model) data = data.toJSON()

          return data
        }) as T
      }

      await this.redis.set(key, JSON.stringify(dbData))
      await this.redis.set(writeDateKey, new Date().getTime().toString())

      return dbData
    }

    return JSON.parse(data)
  }

  getTasks(): Promise<SPTask[]> {
    return this.getDataFromRedis({
      key: getTasksKey(),
      getFunction: (sequelize) => sequelize?.getRepository(SPTask).findAll({ order: [['id', 'ASC']] }),
    })
  }

  getEmotes(): Promise<SPEmote[]> {
    return this.getDataFromRedis({
      key: getEmotesKey(),
      getFunction: (sequelize) => sequelize?.getRepository(SPEmote).findAll({ order: [['id', 'ASC']] }),
    })
  }

  getCreators(): Promise<SPTwitchCreator[]> {
    return this.getDataFromRedis({
      key: getCreatorsKey(),
      getFunction: (sequelize) => sequelize?.getRepository(SPTwitchCreator).findAll({
        include: [sequelize.getRepository(SPTwitchCreatorTask)],
        order: [['id', 'ASC'], [{ model: sequelize.getRepository(SPTwitchCreatorTask), as: 'tasks' }, 'id', 'ASC']],
      }),
    })
  }

  async getUserFromRedis(userId: number): Promise<ISPUser | null> {
    const user = await this.redis.get(getUserKey(userId))
    if (user) return JSON.parse(user)

    return null
  }

  async setUserToRedis(user: ISPUser): Promise<void> {
    await this.redis.set(getUserKey(user.id), JSON.stringify(user))
  }
}
