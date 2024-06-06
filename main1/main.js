const container = document.getElementById('container');
const themeToggleBtn = document.getElementById('btn');
const iconSun = document.getElementById('icon-sun');
const iconMoon = document.getElementById('icon-moon');
const body = document.body;

if (sessionStorage.getItem('theme')) {
    document.documentElement.classList.add('dark');
    iconSun.classList.add('hidden');
    iconMoon.classList.remove('hidden');
}

themeToggleBtn.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark');
    iconSun.classList.toggle('hidden');
    iconMoon.classList.toggle('hidden');

    if (document.documentElement.classList.contains('dark')) {
        sessionStorage.setItem('theme', 'dark');
    } else {
        sessionStorage.removeItem('theme');
    }
});


