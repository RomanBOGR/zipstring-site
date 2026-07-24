# Карта ассетов ZipString

Медиа-банк бренда — скрап `zipstring.com` (27.04.2026). Живёт локально в
`assets/zipstring-media/` (2.3 ГБ, **в git не коммитим** — см. `.gitignore`).

## Как пользоваться

Файлы в `videos/` и `photos/` названы хэшами. Работать через:
- **`named/`** — 168 симлинков с человеческими именами → `../videos/<хэш>.mp4`.
  Пример: `named/root.mp4`, `named/zipster-tricks__42.mp4`.
- **`slug_map.tsv`** — `хэш \t слаг \t файл` (286 строк, включая варианты битрейтов).
- **`vid_index.txt`**, **`photo_index.txt`** — плоские индексы.
- **`pages.txt`** (196 URL) — карта страниц исходного сайта, откуда что взято.

Битрейты: HD-1080p / HD-720p / SD-480p — один ролик в нескольких версиях.
Для сайта брать 720p (баланс вес/качество), 1080p — для hero.

## Видео — 168 роликов по смыслу (`named/`)

| Категория | Кол-во | Что это | Куда на сайте |
|---|---|---|---|
| `zipster-tricks` | 101 | Библиотека трюков | `pages/tricks/` |
| `root` | 25 | Главная — hero, демо продукта | `index.html` |
| `holiday-bundles-lander` | 13 | Промо-наборы, сезонное | лендинги/акции |
| `zipstring-aracna` | 6 | Aracna — вебшутер | `pages/aracna/` |
| `free-string-pack` | 6 | Промо сменных струн | продукты/апселл |
| `copy-of-…-the-original` | 5 | Original — демо | `pages/original/` |
| `zipstring-instructions` | 3 | Инструкции Original/Luma | `pages/instructions/` |
| `stephen-tiktok-subscribe` | 3 | UGC/инфлюенсер (1080p) | соцдоказательство |
| `how-to-use-zipstring-aracna` | 2 | Инструкция Aracna | `pages/instructions-aracna/` |
| прочее | — | `luma-lightning-pack`, `chameleon-string-pack`, `psycho-pack`, `string-pack`, `best-deals`, `product-launch-subscribe` | продукты/паки |

⚠️ Прямого `zipstring-luma` в `named/` нет — Luma-демо лежит под `root__*` и
паками (`luma-lightning-pack`). При разборе для страницы Luma смотреть превью.

## Фото — 545 файлов (`photos/` + `library/photos/`)

Осмысленные имена (не хэш):
- **Продукт Original:** `Original_1..8_Large`, `All_5_zipstring_original…`, `aqua_original…`
- **Продукт Luma:** `Luma_1..8_Large`, `Luma_vs_knockoff` (сравнение с подделкой), `LumaLightningPack`
- **Продукт Aracna:** `aracna_v2_brand_new`, `aracna_v2_glow_in_dark`, `aracna_v2_launch_retract`,
  `aracna_v2_infographic`, `aracna_v2_the_ultimate_web_shooter`
- **Инфографика/USP:** `Artboard_*`, `Asset_*`, `PT01..05` (product tour), `MAIN`
- **Лайфстайл:** `DSC010xx` серия, `Family_at_theme_park`, `Grandma_picture`, `Keychains_Together`
- **Люди/UGC:** `Austin_and_Stephen`, `Headshot_Review`
- **Награды/бейджи:** `Awards_2`, `Badge_90_day`, `90_day_money_back`, `Best_gift`

## Маркетинговые смыслы — соцдоказательство (пресс-логотипы)

Бренд засветился в медиа — готовые логотипы для блока «как о нас пишут»:
`Dude_Perfect`, `American_Broadcasting_Company` (ABC), `Good-Housekeeping`,
`NYP_New_York_Post`, `NYTF` (NY Toy Fair), `British_toy_and_hobby`, `Kickstarter`.

Плюс: продукт вырос из **Kickstarter** (краудфандинг) — история для «о бренде».

## Что дальше (фаза 1)

- [ ] `docs/brand-brief.md` — позиционирование, тон, аудитория, USP каждого SKU
- [ ] `data/products.csv` — Original / Luma / Aracna + паки струн: артикул, цена, USP
- [ ] Отобрать финальный набор для сайта (сейчас картинки хотлинкаются с CDN — заменить на локальные)
