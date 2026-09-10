/* Общий переключатель версий главной: плавающая кнопка + список всех вариантов.
   Подключается одной строкой на любой странице версии. */
(function(){
  var V=[
    {g:'Сайт',      items:[
      {u:'/',            n:'Текущий сайт',      d:'то, что сейчас на zipstring.ru'},
      {u:'/v2/',         n:'По брендбуку',      d:'фирменный стиль ZipString'}]},
    {g:'Серия 1 · направления', items:[
      {u:'/v3/01-editorial/',n:'01 Журнал'},{u:'/v3/02-bento/',n:'02 Бенто'},
      {u:'/v3/03-scrolly/', n:'03 Кино'},   {u:'/v3/04-brutal/',n:'04 Брутал'},
      {u:'/v3/05-swiss/',   n:'05 Сетка'},  {u:'/v3/06-arcade/',n:'06 Аркада'},
      {u:'/v3/07-glass/',   n:'07 Стекло'}, {u:'/v3/08-poster/',n:'08 Плакат'},
      {u:'/v3/09-shop/',    n:'09 Витрина'},{u:'/v3/10-kinetic/',n:'10 Кинетика'}]},
    {g:'Серия 2 · по скиллам', items:[
      {u:'/v4/11-clay/',    n:'11 Клей'},      {u:'/v4/12-hallmark/',n:'12 Манифест'},
      {u:'/v4/13-horizon/', n:'13 Горизонт'},  {u:'/v4/14-convert/', n:'14 Оффер'},
      {u:'/v4/15-reader/',  n:'15 Читальня'},  {u:'/v4/16-pult/',    n:'16 Пульт'},
      {u:'/v4/17-system/',  n:'17 Система'},   {u:'/v4/18-deck/',    n:'18 Дек'},
      {u:'/v4/19-clear/',   n:'19 Понятно'},   {u:'/v4/20-motion/',  n:'20 Движение'}]},
    {g:'Серия 3 · по референсам', items:[
      {u:'/v5/', n:'По рефам Refero', d:'десять референсов, один приём с каждого'}]}
  ];
  var path=location.pathname.replace(/index\.html$/,'');
  var flat=[]; V.forEach(function(s){s.items.forEach(function(i){flat.push(i)})});
  var cur=flat.filter(function(i){return i.u===path})[0];
  var idx=flat.indexOf(cur);

  var wrap=document.createElement('div'); wrap.className='vsw';
  wrap.innerHTML=
    '<button class="vsw-btn" aria-expanded="false" aria-controls="vswList">'+
      '<span class="vsw-dot"></span>'+
      '<span class="vsw-cur">'+(cur?cur.n:'Версии')+'</span>'+
      '<span class="vsw-count">'+(idx>=0?(idx+1)+' / '+flat.length:flat.length)+'</span>'+
    '</button>'+
    '<div class="vsw-panel" id="vswList" hidden>'+
      V.map(function(s){
        return '<div class="vsw-group"><h4>'+s.g+'</h4><ul>'+ s.items.map(function(i){
          return '<li><a href="'+i.u+'"'+(i.u===path?' class="on" aria-current="page"':'')+'>'+
            '<b>'+i.n+'</b>'+(i.d?'<i>'+i.d+'</i>':'')+'</a></li>'; }).join('')+'</ul></div>';
      }).join('')+
      '<div class="vsw-foot"><a href="/versions/">Все версии с превью →</a></div>'+
    '</div>';
  document.body.appendChild(wrap);

  var btn=wrap.querySelector('.vsw-btn'), panel=wrap.querySelector('.vsw-panel');
  function open(v){ panel.hidden=!v; btn.setAttribute('aria-expanded',String(v)); wrap.classList.toggle('is-open',v); }
  btn.addEventListener('click',function(){ open(panel.hidden); });
  document.addEventListener('click',function(e){ if(!wrap.contains(e.target)) open(false); });
  document.addEventListener('keydown',function(e){
    if(e.key==='Escape') open(false);
    if(e.altKey && (e.key==='ArrowRight'||e.key==='ArrowLeft') && idx>=0){   // Alt+← / Alt+→ — соседний вариант
      var n=(idx + (e.key==='ArrowRight'?1:-1) + flat.length) % flat.length;
      location.href=flat[n].u;
    }
  });
})();
