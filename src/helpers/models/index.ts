import { Redis } from 'ioredis'
import { Sequelize } from 'sequelize-typescript'
import { SPModelsHelperUser } from './user'
import { SPUser } from '../../models'
import { SPModelsHelperRedis } from './redis'
import { SPModelsHelperTasks } from './tasks'

export class SPModelsHelper {
  #sequelize: Sequelize
  #redis: Redis

  constructor(sequelize: Sequelize, redis: Redis) {
    this.#sequelize = sequelize
    this.#redis = redis
  }

  get redis() {
    return new SPModelsHelperRedis(this.#sequelize, this.#redis)
  }

  get tasks() {
    return new SPModelsHelperTasks(this.#sequelize, this.#redis)
  }

  user(user: SPUser) {
    return new SPModelsHelperUser(this.#sequelize, this.#redis, user, this)
  }
}
