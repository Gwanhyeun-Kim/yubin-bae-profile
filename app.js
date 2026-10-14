const menuButton = document.querySelector('.menu-button');
const drawer = document.querySelector('.drawer');
menuButton.addEventListener('click', () => {
  drawer.hidden = !drawer.hidden;
  menuButton.setAttribute('aria-expanded', String(!drawer.hidden));
});
drawer.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  drawer.hidden = true;
  menuButton.setAttribute('aria-expanded', 'false');
}));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    drawer.hidden = true;
    menuButton.setAttribute('aria-expanded', 'false');
  }
});
const years = [
  { value: '$0', caption: '2022', x: 20, y: 190 },
  { value: '$50M', caption: '2023', x: 161, y: 187 },
  { value: '$400M', caption: '2024', x: 303, y: 168 },
  { value: '$1.2B', caption: '2025', x: 444, y: 125 },
  { value: '$2.5B', caption: '2026', x: 585, y: 52 }
];
document.querySelectorAll('[data-index]').forEach(button => {
  button.addEventListener('click', () => {
    const year = years[Number(button.dataset.index)];
    document.querySelector('#chart-value').textContent = year.value;
    document.querySelector('#chart-year').textContent = year.caption;
    document.querySelector('#chart-marker').setAttribute('cx', year.x);
    document.querySelector('#chart-marker').setAttribute('cy', year.y);
    document.querySelectorAll('[data-index]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  });
});
let toastTimer;
function showToast(message) {
  const toast = document.querySelector('.toast');
  toast.textContent = message;
  toast.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { toast.hidden = true; }, 3500);
}
const shareDialog = document.querySelector('#share-dialog');
const shareInput = document.querySelector('#share-url');
async function shareProfile() {
  const url = new URL(location.href);
  url.hash = '';
  try {
    await navigator.clipboard.writeText(url.href);
    showToast('Profile link copied.');
  } catch {
    shareInput.value = url.href;
    shareDialog.showModal();
    shareInput.select();
  }
}
document.querySelector('#share').addEventListener('click', shareProfile);
document.querySelector('#header-share').addEventListener('click', shareProfile);
document.querySelector('#copy-link').addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(shareInput.value);
    shareDialog.close();
    showToast('Profile link copied.');
  } catch {
    shareInput.select();
    showToast('Select the address and copy it with ⌘C or Ctrl+C.');
  }
});
