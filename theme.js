(function() {
  const storedTheme = localStorage.getItem('pageper_theme') || 'light';
  // agregar un elemento data-theme para el css
  //NOTE: for some reason, the mimetype converts this to querySelector(body), and that caused the whole thing to not work
  //document.documentElement.setAttribute('data-theme', storedTheme);
  document.querySelector("html").setAttribute('data-theme', storedTheme);
  document.documentElement.style.backgroundColor = '#191919';
})();
