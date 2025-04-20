
// Mobile Menu Toggle
const btn = document.getElementById('mobileMenuBtn');
const menu = document.getElementById('mobileMenu');

btn.addEventListener('click', () => {
    menu.classList.toggle('hidden');
});

const themeToggleBtn = document.getElementById('themeToggle');
const iconElements = document.querySelectorAll('img[data-light][data-dark]');

function applyTheme(theme) {
    const isDark = theme === 'dark';
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem('theme', theme);

    // Swap icons
    iconElements.forEach(icon => {
        icon.src = isDark ? icon.dataset.dark : icon.dataset.light;
    });
}

// Toggle on button click
themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
});

// Load stored theme on startup
window.addEventListener('DOMContentLoaded', () => {
    const saved = localStorage.getItem('theme') || 'light';
    applyTheme(saved);
});
