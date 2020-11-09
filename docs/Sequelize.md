# Работа с Sequelize

## Подключение к базе данных

1. Вызовите функцию `SPCreateSequelizeInstance`
2. Передайте в неё параметры объектом, они прописаны в `SequelizeCreateOptions` (и Typescript подскажет)
3. База данных будет подключена автоматически. `sync` и `alter`, при необходимости, нужно применить вручную

## Работа с базой данных

* Работа с модельками (начинаются с префикса `SP`) происходит через `Repository Mode`
* Для работы с моделькой необходимо инициализировать её как репозиторий через инстанс `sequelize`, полученный по
  инструкции выше

#### Вот так нельзя:

```typescript
import { SPUser, SPCreateSequelizeInstance } from '@wnm.development/fortnite-social-pass-backend-helpers'

const sequelize = await SPCreateSequelizeInstance({ ... })
await SPUser.create({ ... })
```

#### А вот так нужно:

```typescript
import { SPUser, SPCreateSequelizeInstance } from '@wnm.development/fortnite-social-pass-backend-helpers'

const sequelize = await SPCreateSequelizeInstance({ ... })
const userRepository = sequelize.getRepository(SPUser)
await userRepository.create({ ... })
```

* Подробное руководство о том, что такое Repository Mode, можно
  прочитать [тут](https://www.npmjs.com/package/sequelize-typescript#repository-mode)
