(function () {
  function activateNav(root) {
    root.querySelectorAll('.nav__link').forEach(function (link) {
      var target;
      try {
        target = new URL(link.href, location.href);
      } catch (e) {
        return;
      }
      if (target.origin === location.origin && target.pathname === location.pathname) {
        link.classList.add('nav__link--active');
        link.setAttribute('aria-current', 'page');
      }
    });
  }

  function wireToggle(root) {
    var toggle = root.querySelector('.nav__toggle');
    var links = root.querySelector('.nav__links');
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
  }

  function include(url, hostId, onLoaded) {
    var host = document.getElementById(hostId);
    if (!host) return;

    fetch(url)
      .then(function (response) {
        if (!response.ok) throw new Error(response.status + ' ' + response.statusText);
        return response.text();
      })
      .then(function (html) {
        host.innerHTML = html;
        if (onLoaded) onLoaded(host);
      })
      .catch(function (error) {
        console.error('include.js: failed to load ' + url, error);
      });
  }

  include('/partials/header.html', 'site-header', function (host) {
    wireToggle(host);
    activateNav(host);
  });
  include('/partials/footer.html', 'site-footer');
})();
