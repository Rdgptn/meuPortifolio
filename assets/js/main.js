(function () {
  var raiz = document.documentElement,
    btn = document.getElementById('tema');
  try {
    var salvo = localStorage.getItem('tema');
    if (salvo) raiz.setAttribute('data-theme', salvo);
  } catch (e) {}
  var menu = document.getElementById('menu'),
    nav = document.getElementById('nav');
  function fechar() {
    nav.classList.remove('aberto');
    menu.setAttribute('aria-expanded', 'false');
    menu.textContent = '☰';
    menu.setAttribute('aria-label', 'Abrir menu');
  }
  menu.addEventListener('click', function () {
    var abre = !nav.classList.contains('aberto');
    nav.classList.toggle('aberto', abre);
    menu.setAttribute('aria-expanded', abre);
    menu.textContent = abre ? '✕' : '☰';
    menu.setAttribute('aria-label', abre ? 'Fechar menu' : 'Abrir menu');
  });
  nav.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') fechar();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') fechar();
  });
  if ('IntersectionObserver' in window) {
    var links = {};
    nav.querySelectorAll('a').forEach(function (a) {
      links[a.getAttribute('href').slice(1)] = a;
    });
    var obs = new IntersectionObserver(
      function (itens) {
        itens.forEach(function (i) {
          if (i.isIntersecting) {
            Object.keys(links).forEach(function (k) {
              links[k].classList.remove('ativo');
            });
            if (links[i.target.id]) links[i.target.id].classList.add('ativo');
          }
        });
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    document.querySelectorAll('main section[id]').forEach(function (sec) {
      obs.observe(sec);
    });
  }
  btn.addEventListener('click', function () {
    var escuro =
      raiz.getAttribute('data-theme') === 'dark' ||
      (!raiz.getAttribute('data-theme') && matchMedia('(prefers-color-scheme: dark)').matches);
    var novo = escuro ? 'light' : 'dark';
    raiz.setAttribute('data-theme', novo);
    try {
      localStorage.setItem('tema', novo);
    } catch (e) {}
  });
})();
