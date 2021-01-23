/* global KEEP */

KEEP.initModeToggle = () => {

  KEEP.utils.modeToggle = {

    modeToggleButton_dom: document.querySelector('.tool-dark-light-toggle'),
    iconDom: document.querySelector('.tool-dark-light-toggle i'),

    setItemUtil(modeClass, prefersColorScheme) {
      document.body.classList.toggle(modeClass);
      const isDark = document.body.className.indexOf(modeClass) === -1;

      if (isDark) {
        this.iconDom.className = 'fas fa-moon';
      } else {
        this.iconDom.className = 'fas fa-sun';
      }
      KEEP.styleStatus.isDark = isDark;
      KEEP.styleStatus.prefersColorScheme = prefersColorScheme;
      KEEP.setStyleStatus();
    },

    initModeStatus() {
      const styleStatus = KEEP.getStyleStatus();
      if (styleStatus) {
        if (styleStatus.prefersColorScheme === 'dark') {
          if (styleStatus.isDark) {
            document.body.classList.remove('light-mode');
            this.iconDom.className = 'fas fa-sun';
          } else {
            document.body.classList.add('light-mode');
            this.iconDom.className = 'fas fa-moon';
          }
        } else {

          if (styleStatus.isDark) {
            document.body.classList.remove('dark-mode');
            this.iconDom.className = 'fas fa-moon';
          } else {
            document.body.classList.add('dark-mode');
            this.iconDom.className = 'fas fa-sun';
          }

        }

      }
    },

    initModeToggleButton() {
      this.modeToggleButton_dom.addEventListener('click', () => {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
          this.setItemUtil('light-mode', 'dark');
        } else {
          this.setItemUtil('dark-mode', 'light');
        }
      });
    }
  }

  KEEP.utils.modeToggle.initModeStatus();
  KEEP.utils.modeToggle.initModeToggleButton();

};
