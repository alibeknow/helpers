# Contributing Guide

* Всё, что вы экспортируйте через `export`, должно начинаться с префикса `SP`, например: `export const SPStartDate`
* Всё, что вы экспортируйте, должно быть экспортировано через `index.ts` в соответствующей папке
    * Например, все файлы в папке `models/users` экспортированы в `index.ts` в той же папке
    * Все папки в `models` экспортированы в `index.ts`
    * Сама папка `models` экспортирована в `src/index.ts`
* Нигде в этой библиотеке не используйте `export default`
* Не забывайте повышать версию в `package.json` при пуше
* Не используйте `snake_case` и `kebab-case`, если это не необходимо