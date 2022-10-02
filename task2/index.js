const btn = document.querySelector('.j-btn-test');

btn.addEventListener('click', () => {
  let clientHeight = document.documentElement.clientHeight;
  let clientWidth = document.documentElement.clientWidth;
  alert('Высота: ' + clientHeight + ', ' + 'ширина: ' + clientWidth)
});