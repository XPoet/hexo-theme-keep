/**
 * 日间/夜间 模式切换
 */
const localStorageKey = 'MAGIC'
const modeToggleBtn = document.querySelector('.mode-toggle');
const iconDom = modeToggleBtn.querySelector('i');
const articleContent = document.querySelector('.main-content');
const modeConfig = JSON.parse(localStorage.getItem(localStorageKey));
if (modeConfig) {

    if (modeConfig.prefersColorScheme === 'dark') {

        if (modeConfig.isDark) {
            document.body.classList.remove('light-mode');
            articleContent.classList.remove('night-code-theme');
            iconDom.className = 'fa fa-lightbulb-o';
        } else {
            iconDom.className = 'fa fa-moon-o';
            document.body.classList.add('light-mode');
            articleContent.classList.add('night-code-theme');
        }

    } else {

        if (modeConfig.isDark) {
            document.body.classList.remove('dark-mode');
            articleContent.classList.remove('night-code-theme');
            iconDom.className = 'fa fa-moon-o';
        } else {
            document.body.classList.add('dark-mode');
            iconDom.className = 'fa fa-lightbulb-o';
            articleContent.classList.add('night-code-theme');
        }

    }

}

const setItemUtil = (modeClass, prefersColorScheme) => {
    document.body.classList.toggle(modeClass);
    const isDark = document.body.className.indexOf(modeClass) === -1;

    if (isDark) {
        iconDom.className = 'fa fa-moon-o';
        articleContent.classList.remove('night-code-theme');
    } else {
        iconDom.className = 'fa fa-lightbulb-o';
        articleContent.classList.add('night-code-theme');
    }
    localStorage.setItem(localStorageKey, JSON.stringify(
        {
            prefersColorScheme: prefersColorScheme,
            isDark: isDark
        }
    ));


};

modeToggleBtn.addEventListener('click', function (e) {

    if (
        window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
        setItemUtil('light-mode', 'dark');
    } else {
        setItemUtil('dark-mode', 'light');
    }

});
