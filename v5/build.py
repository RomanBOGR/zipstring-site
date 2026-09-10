#!/usr/bin/env python3
"""Генератор серии «по референсам»: разметка у всех одна, различается только CSS.
   Так сравнение честное — видно оформление, а не разный контент."""
import os, json

V = [
 dict(slug='22-zine',   name='Зин',            ref='The Pop Manifesto',  url='thepopmanifesto.com',
      took='Цветовые блоки-секции: каждый экран — своя насыщенная плашка, поверх чёрная типографика',
      font='<link href="https://fonts.googleapis.com/css2?family=Unbounded:wght@700;900&display=swap" rel="stylesheet">'),
 dict(slug='23-command',name='Командный центр',ref='Krea',               url='krea.ai',
      took='Почти чёрный холст, светящаяся белая типографика, карточки-метрики тонкой линией',
      font=''),
 dict(slug='24-arcade', name='Аркада-магазин', ref="FRANKY'S",           url='frankys-hats.com',
      took='8-битная витрина в тёмном окне: пиксельный шрифт, бумажные светлые поверхности',
      font='<link href="https://fonts.googleapis.com/css2?family=Pixelify+Sans:wght@400;700&display=swap" rel="stylesheet">'),
 dict(slug='25-gallery',name='Галерея',        ref='Apple MacBook',      url='apple.com',
      took='Галерейно-белый холст, заголовки 80–96px весом 700 занимают полэкрана до первой картинки',
      font=''),
 dict(slug='26-collage',name='Коллаж',         ref='TOMO',               url='tomoseattle.com',
      took='Тёплая бумага, кадры наклеены под углом, серифная типографика и коралловый акцент',
      font='<link href="https://fonts.googleapis.com/css2?family=PT+Serif:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">'),
 dict(slug='27-athletic',name='Атлетик',       ref='SAPGOODENERGY',      url='sapgoodenergy.com',
      took='Огромный воздух, чёрная типографика, ровно один горячий оранжевый акцент',
      font=''),
 dict(slug='28-pastel', name='Пастель',        ref='Recess',             url='takearecess.com',
      took='Мягкое небо, округлые формы, спокойный синий с коралловым — «продукт в облаках»',
      font='<link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;700;900&display=swap" rel="stylesheet">'),
 dict(slug='29-popart', name='Поп-арт',        ref='GT America',         url='gt-america.com',
      took='Белый холст, чистый синий и оранжево-красный, крупная графика как на винтажной упаковке',
      font='<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@500;800&display=swap" rel="stylesheet">'),
 dict(slug='30-bench',  name='Верстак',        ref='099.supply',         url='099.supply',
      took='Моноширинный шрифт во всём интерфейсе, техническая сетка и фильтры как в терминале',
      font='<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet">'),
]

TPL = """<!DOCTYPE html><html lang="ru"><head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>ZipString — {name}</title><meta name="robots" content="noindex">
<meta name="description" content="Вариант главной ZipString по референсу {ref}">
{font}
<link rel="stylesheet" href="/v5/base.css"><link rel="stylesheet" href="style.css?v=1">
<link rel="stylesheet" href="/switch.css?v=1">
</head><body>
<!-- Референс: {ref} ({url}). Взято: {took} -->
<div class="refbar">Референс: <b>{ref}</b> · {url} <span>{took}</span></div>

<header class="nav">
  <a class="logo" href="/versions/"><img src="/v2/assets/logo-blue.svg" alt="ZipString" width="528" height="188"></a>
  <nav><a href="#product">Продукт</a><a href="#tricks">Трюки</a><a href="#buy">Купить</a></nav>
  <a href="#buy" class="btn btn-sm">Купить</a>
</header>

<main>
<section class="hero">
  <div class="hero-txt">
    <p class="eyebrow">Мировой бестселлер · 4+</p>
    <h1>Нить летит,<br><em>рука ведёт</em></h1>
    <p class="lead">Закольцованная нить разгоняется до 65 км/ч и держится в воздухе, повторяя движение руки. Первый трюк — за пять минут.</p>
    <div class="row">
      <a href="#buy" class="btn">Выбрать модель</a>
      <a href="#tricks" class="btn btn-ghost">Смотреть трюки</a>
    </div>
  </div>
  <figure class="hero-media">
    <video autoplay muted loop playsinline preload="auto" poster="/assets/img/poster/hero-v5.jpg"><source src="/assets/video/style-infinity.mp4" type="video/mp4"></video>
  </figure>
</section>

<section class="facts" id="product">
  <div><b>65 км/ч</b><span>разгон петли</span></div>
  <div><b>100+</b><span>трюков в библиотеке</span></div>
  <div><b>2 000 000+</b><span>устройств продано</span></div>
  <div><b>1 год</b><span>гарантия дистрибьютора</span></div>
</section>

<section class="shop" id="buy">
  <h2>Две модели</h2>
  <div class="cards">
    <article class="card">
      <div class="card-pic"><img src="/v2/assets/product-original.webp" alt="ZipString Original" width="1298" height="900" loading="lazy"></div>
      <h3>Original</h3>
      <p>Три сменные нити, зарядка USB-C. Красный или синий корпус.</p>
      <div class="card-foot"><span class="price">2 290 ₽</span><a href="/pages/original/" class="btn btn-sm">Подробнее</a></div>
    </article>
    <article class="card">
      <div class="card-pic"><img src="/v2/assets/product-aracna.webp" alt="ZipString Aracna" width="272" height="900" loading="lazy"></div>
      <h3>Aracna</h3>
      <p>Пять нитей, возврат нити и крепление на предплечье.</p>
      <div class="card-foot"><span class="price">3 690 ₽</span><a href="/pages/aracna/" class="btn btn-sm">Подробнее</a></div>
    </article>
  </div>
</section>

<section class="tricks" id="tricks">
  <div class="tricks-head"><h2>Трюки</h2><a href="/pages/tricks/" class="btn btn-ghost btn-sm">Вся библиотека</a></div>
  <div class="tricks-grid">
    <figure><video muted loop playsinline preload="none" data-src="/assets/video/trick-01.mp4" poster="/assets/img/poster/trick-01.jpg"></video><figcaption>Лук и стрела</figcaption></figure>
    <figure><video muted loop playsinline preload="none" data-src="/assets/video/trick-03.mp4" poster="/assets/img/poster/trick-03.jpg"></video><figcaption>Вихрь</figcaption></figure>
    <figure><video muted loop playsinline preload="none" data-src="/assets/video/trick-04.mp4" poster="/assets/img/poster/trick-04.jpg"></video><figcaption>Брызги</figcaption></figure>
    <figure><video muted loop playsinline preload="none" data-src="/assets/video/trick-08.mp4" poster="/assets/img/poster/trick-08.jpg"></video><figcaption>Портал</figcaption></figure>
  </div>
</section>

<section class="life">
  <h2>Где угодно</h2>
  <div class="life-grid">
    <img src="/v2/assets/life-jump.webp" alt="Во дворе" width="1400" height="787" loading="lazy">
    <img src="/v2/assets/life-beach.webp" alt="На прогулке" width="1400" height="787" loading="lazy">
    <img src="/v2/assets/life-curly.webp" alt="Дома" width="1400" height="787" loading="lazy">
  </div>
</section>

<section class="cta">
  <h2>Запускай. Удивляй.</h2>
  <p>Оригинал с гарантией — у официального дистрибьютора.</p>
  <div class="row"><a href="/pages/products/" class="btn">Все продукты</a><a href="/pages/tricks/" class="btn btn-ghost">100+ трюков</a></div>
</section>
</main>

<footer class="ftr">ООО «Бэйби Опт Груп» · официальный дистрибьютор ZipString в России · ТР ТС 008/2011</footer>

<script>
  var io=new IntersectionObserver(function(e){{e.forEach(function(x){{if(!x.isIntersecting)return;var v=x.target;
    if(!v.src){{ v.src=v.dataset.src;
      v.addEventListener('loadedmetadata',function(){{ if(v.duration) v.currentTime=v.duration*0.35; }});
      v.addEventListener('timeupdate',function(){{ if(v.duration&&(v.currentTime>v.duration*0.8||v.currentTime<v.duration*0.3)) v.currentTime=v.duration*0.35; }});
      v.play().catch(function(){{}}); }} io.unobserve(v)}})}},{{rootMargin:'250px'}});
  document.querySelectorAll('video[data-src]').forEach(function(v){{io.observe(v)}});
  var hv=document.querySelector('.hero-media video');
  if(hv) hv.addEventListener('loadedmetadata',function(){{ if(hv.duration) hv.currentTime=hv.duration*0.3; }});
</script>
<script src="/switch.js?v=2" defer></script>
</body></html>
"""

for v in V:
    os.makedirs('v5/'+v['slug'], exist_ok=True)
    open('v5/%s/index.html' % v['slug'],'w',encoding='utf-8').write(TPL.format(**v))
print('страниц собрано:', len(V))
open('v5/variants.json','w',encoding='utf-8').write(json.dumps(V, ensure_ascii=False, indent=1))
