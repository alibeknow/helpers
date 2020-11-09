import { Sequelize, SequelizeOptions } from 'sequelize-typescript'

interface SequelizeCreateOptions {
  host: SequelizeOptions['host']
  port: SequelizeOptions['port']
  database: SequelizeOptions['database']
  username: SequelizeOptions['username']
  password: SequelizeOptions['password']
  options?: Partial<Omit<SequelizeOptions, 'host' | 'port' | 'database' | 'username' | 'password'>>
}

/**
 * @description Creates sequelize instance without authenticate
 */
export function SPCreateRawSequelizeInstance(settings?: SequelizeCreateOptions): Sequelize {
  const {
    host,
    port,
    database,
    username,
    password,
    options = {},
  } = settings || {}

  return new Sequelize({
    host,
    port,
    database,
    username,
    password,
    dialect: 'postgres',
    logging: false,
    ...options,
    models: [`${ __dirname }/../models/**/*.model.ts`, `${ __dirname }/../models/**/*.model.js`],
    modelMatch: (filename, member) => {
      return 'SP' + filename.substring(0, filename.indexOf('.model')) === member
    },
    repositoryMode: true,
  })
}

/**
 * @description Creates empty sequelize instance for tests
 */
export async function SPCreateSequelizeInstance(): Promise<Sequelize>
/**
 * @description Creates sequelize instance with authenticate
 */
export async function SPCreateSequelizeInstance(settings: SequelizeCreateOptions): Promise<Sequelize | Error>
export async function SPCreateSequelizeInstance(settings?: SequelizeCreateOptions): Promise<Sequelize | Error> {
  const pg = await import('pg')
  pg.defaults.parseInt8 = true
  const sequelize = SPCreateRawSequelizeInstance(settings)

  if (settings?.host) {
    try {
      await sequelize.authenticate()
    }
    catch (e) {
      return e
    }
  }

  return sequelize
}
