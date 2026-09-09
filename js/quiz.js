/* Тест «Твой ZIP-стиль и фирменный трюк».
   По ТЗ результат определяется ТОЛЬКО ответом на 3-й вопрос —
   остальные вопросы на итог не влияют. */
(function () {
  var quiz = document.getElementById('quiz');
  if (!quiz) return;

  var RESULT_Q = 2; // индекс вопроса, который решает результат

  var QUESTIONS = [
    ['Как ты обычно проводишь свободное время?', [
      'Бегаю, прыгаю и не могу сидеть на месте',
      'Провожу время с друзьями',
      'Отдыхаю с телефоном или планшетом',
      'Занимаюсь спортом, танцами или единоборствами',
      'Придумываю что-то новое, мастерю или рисую']],
    ['Какая суперсила пригодилась бы тебе больше всего?', [
      'Умение лазать по стенам и прыгать между зданиями',
      'Молниеносная скорость и мгновенная реакция',
      'Невидимость и умение оставаться незаметным',
      'Сверхсила и невероятная выносливость',
      'Ум и изобретательность']],
    ['ZipString впервые у тебя в руках. С чего начнёшь?', [
      'Сразу выберу самый крутой трюк и начну осваивать его по инструкции!',
      'Посмотрю, как это делают другие, и попробую повторить',
      'Просто покручу ZipString в руках и позапускаю нить',
      'Позову друга, чтобы придумать совместный трюк',
      'Начну изучать, как устроен ZipString и как работают трюки']],
    ['Какой девиз тебе ближе?', [
      'Смело пробуй новое!',
      'Лучше попробовать, чем сомневаться!',
      'Спокойствие — моя суперсила!',
      'Вместе веселее!',
      'Если делать, то идеально!']],
    ['Какой у тебя ритм жизни?', [
      'Активный — я всегда в движении, меня сложно догнать!',
      'Организованный — у меня всё по плану, но всегда есть место для активности',
      'Спокойный — я люблю комфорт и никуда не спешу',
      'Командный — мне нравится делать всё вместе с друзьями',
      'Творческий — легко меняю планы и придумываю новое']]
  ];

  var RESULTS = [
    { type: 'Прыгун',          trick: 'Зип-флип',      slug: 'flip',
      note: 'Ты не сидишь на месте и берёшься за самое эффектное сразу. Зип-флип — твой.' },
    { type: 'Исследователь',   trick: 'Шаг-поворот',   slug: 'step',
      note: 'Ты смотришь, разбираешь и повторяешь лучше оригинала. Шаг-поворот — твой.' },
    { type: 'Спокойный',       trick: 'Бесконечность', slug: 'infinity',
      note: 'Тебе важен сам процесс, а не гонка. Бесконечность — твой.' },
    { type: 'Командный игрок', trick: 'Турбокольцо',   slug: 'turbo',
      note: 'Всё интереснее вдвоём и втроём. Турбокольцо — твой.' },
    { type: 'Изобретатель',    trick: 'Крутой вираж',  slug: 'curve',
      note: 'Ты сначала понимаешь, как это работает, потом делаешь. Крутой вираж — твой.' }
  ];

  var LETTERS = ['А', 'Б', 'В', 'Г', 'Д'];

  var screens  = { intro: id('quizIntro'), form: id('quizForm'), result: id('quizResult') };
  var elQ      = id('quizQuestion'),
      elOpts   = id('quizOptions'),
      elStep   = id('quizStep'),
      elBar    = id('quizBar'),
      elBack   = id('quizBack'),
      elVideo  = id('quizVideo');

  var answers = [];
  var current = 0;

  function id(x) { return document.getElementById(x); }

  function show(name) {
    for (var k in screens) screens[k].classList.toggle('is-active', k === name);
    var loop = id('quizLoop');
    if (loop) loop.hidden = (name === 'result'); // на результате свой ролик
  }

  function renderQuestion() {
    var q = QUESTIONS[current];
    elStep.textContent = (current + 1) + ' / ' + QUESTIONS.length;
    elBar.style.width = ((current + 1) / QUESTIONS.length * 100) + '%';
    elQ.textContent = q[0];
    elBack.hidden = current === 0;
    elOpts.innerHTML = '';
    q[1].forEach(function (text, i) {
      var b = document.createElement('button');
      b.className = 'quiz-option' + (answers[current] === i ? ' is-picked' : '');
      b.type = 'button';
      b.innerHTML = '<span class="quiz-letter">' + LETTERS[i] + '</span><span>' + text + '</span>';
      b.addEventListener('click', function () { pick(i); });
      elOpts.appendChild(b);
    });
    var first = elOpts.querySelector('button');
    if (first) first.focus();
  }

  function pick(i) {
    answers[current] = i;
    if (current < QUESTIONS.length - 1) {
      current++;
      renderQuestion();
    } else {
      renderResult();
    }
  }

  function renderResult() {
    var r = RESULTS[answers[RESULT_Q]] || RESULTS[0];
    id('quizType').textContent = '«' + r.type + '»';
    id('quizTrick').textContent = r.trick;
    id('quizNote').textContent = r.note;
    // src ставится только выбранному ролику — остальные четыре не грузятся никогда
    elVideo.poster = '/assets/img/poster/style-' + r.slug + '.jpg';
    elVideo.src = '/assets/video/style-' + r.slug + '.mp4';
    elVideo.play().catch(function () {});
    show('result');
    quiz.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // Декоративный ролик сбоку грузится только там, где он реально виден:
  // на мобильном .quiz-loop скрыт, и качать его незачем.
  // Пока src не подключён, рамка не показывается — иначе на месте ролика пустой блок.
  var wide = window.matchMedia('(min-width: 901px)');
  var still = window.matchMedia('(prefers-reduced-motion: reduce)');
  function mountLoop() {
    if (!wide.matches || still.matches) return;
    var box = id('quizLoop');
    box.classList.add('is-on');
    box.querySelectorAll('.quiz-loop-video').forEach(function (v) {
      if (v.src) return;
      v.poster = v.dataset.poster;
      v.src = v.dataset.src;
      v.play().catch(function () {});
    });
  }
  mountLoop();
  wide.addEventListener('change', mountLoop); // окно расширили — ролик появляется

  id('quizStart').addEventListener('click', function () {
    answers = []; current = 0;
    show('form');
    renderQuestion();
  });

  elBack.addEventListener('click', function () {
    if (current > 0) { current--; renderQuestion(); }
  });

  id('quizAgain').addEventListener('click', function () {
    elVideo.pause(); elVideo.removeAttribute('src'); elVideo.load();
    answers = []; current = 0;
    show('form');
    renderQuestion();
  });
})();
