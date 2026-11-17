(function () {
  'use strict';
  var root = document.documentElement;
  var themeButton = document.querySelector('[data-theme-toggle]');
  try {
    var saved = localStorage.getItem('majda-portfolio-theme');
    if (saved === 'dark' || saved === 'light') root.dataset.theme = saved;
  } catch (e) { /* Private browsing may disable storage. */ }
  function refreshThemeLabel() {
    if (!themeButton) return;
    var dark = root.dataset.theme === 'dark';
    themeButton.setAttribute('aria-label', dark ? 'Activer le mode clair' : 'Activer le mode sombre');
    themeButton.setAttribute('title', dark ? 'Mode clair' : 'Mode sombre');
  }
  refreshThemeLabel();
  if (themeButton) themeButton.addEventListener('click', function () {
    var next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    root.dataset.theme = next;
    try { localStorage.setItem('majda-portfolio-theme', next); } catch (e) {}
    refreshThemeLabel();
  });

  var menuButton = document.querySelector('[data-menu-toggle]');
  var menu = document.querySelector('[data-mobile-nav]');
  function setMenu(open) {
    if (!menu || !menuButton) return;
    menu.setAttribute('aria-hidden', String(!open));
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
  }
  if (menuButton && menu) {
    menuButton.addEventListener('click', function () {setMenu(menu.getAttribute('aria-hidden') === 'true');});
    menu.querySelectorAll('a').forEach(function (link) {link.addEventListener('click', function () {setMenu(false);});});
    document.addEventListener('keydown', function (event) {if(event.key === 'Escape') setMenu(false);});
    document.addEventListener('click', function (event) {
      if (menu.getAttribute('aria-hidden') === 'false' && !menu.contains(event.target) && !menuButton.contains(event.target)) setMenu(false);
    });
    window.addEventListener('resize', function () {if (window.innerWidth > 760) setMenu(false);});
  }

  var dlg = document.querySelector('#image-lightbox');
  if (dlg && typeof dlg.showModal === 'function') {
    document.querySelectorAll('[data-lightbox-image]').forEach(function (button) {
      button.addEventListener('click', function () {
        var img = dlg.querySelector('img');
        var caption = dlg.querySelector('[data-lightbox-caption]');
        img.src = button.dataset.lightboxImage;
        img.alt = button.querySelector('img').alt;
        caption.textContent = button.dataset.lightboxTitle || 'Capture du projet';
        dlg.showModal();
      });
    });
    var closeButton = dlg.querySelector('[data-close-lightbox]');
    if (closeButton) closeButton.addEventListener('click', function () {dlg.close();});
    dlg.addEventListener('click', function (event) {if (event.target === dlg) dlg.close();});
  }
})();
