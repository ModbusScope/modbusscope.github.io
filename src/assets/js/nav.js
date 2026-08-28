(function () {
  var toggle = document.querySelector('.nav__toggle');
  var links = document.querySelector('.nav__links');
  if (!toggle || !links) return;

  toggle.addEventListener('click', function () {
    var open = links.classList.toggle('nav__links--open');
    toggle.setAttribute('aria-expanded', String(open));
  });

  links.addEventListener('click', function (event) {
    if (event.target.closest('.nav__link, .nav__cta')) {
      links.classList.remove('nav__links--open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
})();
