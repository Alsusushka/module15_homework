const btn = document.querySelector('.j-btn-test');

btn.addEventListener('click', () => {
  if (btn.classList.contains('one')) {
    btn.classList.remove('one');
    btn.classList.add('two');
  } else if (btn.classList.contains('two')) {
    btn.classList.remove('two');
    btn.classList.add('one');
  }
});