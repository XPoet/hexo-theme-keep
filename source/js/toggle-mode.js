/**
 * 日间/夜间 模式切换
 */
const modeToggleBtn = document.querySelector('.mode-toggle');
const iconDom = modeToggleBtn.querySelector('i');
const modeConfig = JSON.parse(localStorage.getItem('ils_x'));
if (modeConfig) {

    if (modeConfig.prefersColorScheme === 'dark') {

        if (modeConfig.isDark) {
            document.body.classList.remove('light-mode');
            iconDom.className = 'fa fa-lightbulb-o';
        } else {
            iconDom.className = 'fa fa-moon-o';
            document.body.classList.add('light-mode');
        }

    } else {

        if (modeConfig.isDark) {
            document.body.classList.remove('dark-mode');
            iconDom.className = 'fa fa-moon-o';
        } else {
            document.body.classList.add('dark-mode');
            iconDom.className = 'fa fa-lightbulb-o';
        }

    }

}

const setItemUtil = (modeClass, prefersColorScheme) => {
    document.body.classList.toggle(modeClass);
    const isDark = document.body.className.indexOf(modeClass) === -1;
    iconDom.className = isDark ? 'fa fa-moon-o' : 'fa fa-lightbulb-o';
    localStorage.setItem('ils_x', JSON.stringify(
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