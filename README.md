## HTML Coding Environment

### Описание

CVS:
- git

Cборка билдов верстки:
- Node и NPM
- Gulp
- browser-sync - сервер с поддержкой livereload
- gulp-autoprefixer - для автоматического добавления необходимых вендорных префиксов в стилях CSS

Препроцессинг CSS, HTML, JS, изображений:
- gulp-rigger - сбор файлов
- gulp-sass - SCSS (SASS)
- gulp-uglify - сжатие JS
- gulp-clean-css - для сжатия CSS
- gulp-imagemin - для сжатия изображений без потери качества

Структура следующая:
- ./build - собранная верстка
- ./src - исходные файлы
  - ./css
      - ./main.scss - основной файл
  - ./img
  - ./fonts
  - ./js
      - ./main.js - основной файл
  - ./templates - шаблоны, подключаемые в страницы с помошью gulp-rigger
  - *.html - множество страниц


### Установка

1. Установить Node. https://nodejs.org/en/download/package-manager/
2. Установить Gulp

    ```bash
    $ npm install -g gulp
    ```

3. Установить зависимости

    ```bash
    $ cd path/to/repository
    $ npm install
    ```

4. Можно запускать! Верстка будет доступна по `http://localhost:9000`

    ```bash
    $ gulp
    ```

### Команды

- `gulp` - запускает `build`, `server` и `watch` сервер для разработки
- `gulp build` - готовит билд в `./build`
- `gulp clean` - очищает директорию `./build`
- другие команды из файла gulpfile.js в корне репозитория
