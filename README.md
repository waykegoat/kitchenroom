# КУХНИ ДЕЛИЯ — Конструктор кухни

Веб-приложение для проектирования кухни: создание комнаты произвольной формы,
расстановка мебели на 2D-плане с эффектом объёма, расчёт сметы и сохранение
проектов в аккаунт.

## Стек

- Vue 3 (`<script setup>`) + TypeScript (strict)
- Vite, Pinia, Vue Router
- Хранение данных — `localStorage` (без бэкенда)

## Запуск

```bash
npm install
npm run dev          # дев-сервер
npm run build        # сборка (vue-tsc + vite build)
npm run type-check   # только проверка типов
```

## Возможности

- **Комната**: прямоугольная, Г-образная и П-образная форма с настраиваемым
  вырезом; размеры в сантиметрах, авторасчёт площади.
- **Каталог мебели**: нижние/верхние модули, пеналы, техника, мойки, острова —
  перетаскивание на план или двойной клик. У каждого типа свой SVG-вид сверху.
- **Редактирование объекта**: размеры, материал (6 отделок), поворот,
  дублирование, удаление, порядок слоёв (выше/ниже/на самый верх/низ).
- **Привязка**: к сетке, к стенам и встык к соседним модулям. Пересечения
  подсвечиваются и учитывают ярус (нижние и верхние шкафы не конфликтуют).
- **Отмена/повтор**: `Ctrl+Z` / `Ctrl+Y`, а также `Delete` и `Ctrl+D`.
- **Виды**: «План» (сверху) и «Объём» (псевдо-3D наклон).
- **Аккаунт**: простая локальная авторизация; проекты сохраняются per-user.
  Текущая работа автоматически восстанавливается из черновика.
- **Примеры**: галерея из 10 готовых планировок, открываются в конструкторе.
- **Экспорт**: изображение плана (PNG) и печать/PDF плана со сметой.

## Структура

```
src/
├── components/
│   ├── auth/          AuthForm · AuthDialog
│   ├── common/        AppHeader · AppFooter · BaseButton · BaseModal
│   ├── home/          HeroSection · FeatureList · ExampleKitchenCard · …
│   └── constructor/   ConstructorCanvas · CatalogPanel · InspectorSidebar ·
│                      FurnitureGlyph · KitchenPlanThumbnail · ExportDocument · …
├── composables/       use-svg-point · use-plan-export · use-estimate
├── data/              furniture-catalog · material-finishes · example-kitchens
├── pages/             HomePage · ExamplesPage · ConstructorPage · NotFoundPage
├── services/          auth-storage · project-storage
├── stores/            auth · room · furniture · editor · history · project
├── types/             kitchen-types
└── utils/             plan-geometry · room-outline · furniture-tier · format-price
```

## Архитектурные заметки

- SVG-холст использует `viewBox` в сантиметрах, координаты экрана переводятся
  через `getScreenCTM().inverse()` — масштаб подстраивается под контейнер сам.
- Геометрия (привязка, пересечения, форма комнаты) вынесена в чистые функции
  в `utils/`; сторы хранят только состояние, компоненты — представление.
- История правок построена на снимках состояния с дебаунсом и сравнением,
  поэтому отмена/повтор не плодят лишних шагов.
