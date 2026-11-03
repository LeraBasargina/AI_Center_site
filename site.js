(() => {
  const menu = document.querySelector('.menu-toggle');
  const nav = document.getElementById('siteNav');
  function closeMenu() { nav.classList.remove('is-open'); menu.setAttribute('aria-expanded', 'false'); }
  menu.addEventListener('click', () => { const open = nav.classList.toggle('is-open'); menu.setAttribute('aria-expanded', String(open)); });
  nav.addEventListener('click', e => { if(e.target.closest('a')) closeMenu(); });
  document.addEventListener('keydown', e => { if(e.key === 'Escape') closeMenu(); });
  const skip = document.createElement('a'); skip.href = '#projects'; skip.className = 'skip-link'; skip.textContent = 'Перейти к проектам'; document.body.prepend(skip);
  const top = document.createElement('a'); top.href = '#home'; top.className = 'back-top'; top.setAttribute('aria-label', 'Вернуться к началу страницы'); top.textContent = '↑'; document.body.append(top);
  const lightbox = document.getElementById('lightbox');
  lightbox.setAttribute('role', 'dialog'); lightbox.setAttribute('aria-label', 'Просмотр медиа'); lightbox.setAttribute('aria-modal','true');
  let previousFocus;
  new MutationObserver(() => {
    if(lightbox.classList.contains('open')) { previousFocus = document.activeElement; document.getElementById('lbClose').focus(); }
    else if(previousFocus) previousFocus.focus();
  }).observe(lightbox, {attributes:true, attributeFilter:['class']});
  lightbox.addEventListener('keydown', e => {
    if(e.key !== 'Tab') return;
    const buttons = [...lightbox.querySelectorAll('button:not([disabled])')].filter(x => x.getClientRects().length);
    const first = buttons[0], last = buttons[buttons.length - 1];
    if(e.shiftKey && document.activeElement === first) { last.focus(); e.preventDefault(); }
    else if(!e.shiftKey && document.activeElement === last) { first.focus(); e.preventDefault(); }
  });
})();
