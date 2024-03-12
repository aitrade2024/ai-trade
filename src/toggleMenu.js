function toggleMenu() {
  const menuList = document.querySelector('.burger-menu');
  const html = document.querySelector('html');

  if (menuList.classList.contains('menu-open')) {
    menuList.classList.remove('menu-open');
    html.style.overflowY = 'auto';
  } else {
    menuList.classList.add('menu-open');
    html.style.overflowY = 'hidden';
  }
};
