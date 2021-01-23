KEEP.initModeToggle = () => {

  KEEP.utils.modeToggle = {

    localStorageKey: 'KEEP',
    modeToggleButton_dom: document.querySelector('.tool-dark-light-toggle'),
    iconDom: document.querySelector('.tool-dark-light-toggle i'),
    articleContent: document.querySelector('.main-content'),

    setItemUtil(modeClass) {
      const isDark = document.body.className.indexOf('light-mode') === -1;
      let currentScheme = "";
      if (isDark) {
        this.enableLightMode();
        currentScheme = "light";
      } else {
        this.enableDarkMode();
        currentScheme = "dark";
      }
      localStorage.setItem(this.localStorageKey, JSON.stringify(
        {
          prefersColorScheme: currentScheme,
          isDark: !isDark
        }
      ));
    },

    enableLightMode() {
      document.body.classList.remove('dark-mode');
      document.body.classList.add('light-mode');
      this.articleContent.classList.remove('night-code-theme');
      this.iconDom.className = 'fas fa-moon';
    },

    enableDarkMode() {
      document.body.classList.remove('light-mode');
      document.body.classList.add('dark-mode');
      this.articleContent.classList.add('night-code-theme');
      this.iconDom.className = 'fas fa-sun';
    },

    initModeStatus() {
      this.modeConfig = JSON.parse(localStorage.getItem(this.localStorageKey));
      if (this.modeConfig) {
        if (this.modeConfig.prefersColorScheme === 'dark') {
          if (this.modeConfig.isDark) {
            this.enableDarkMode();
          } else {
            this.enableLightMode();
          }
        } else {
          if (this.modeConfig.isDark) {
            this.enableDarkMode();
          } else {
            this.enableLightMode();
          }
        }
      } else {
        // First time visit with no LocalStorage exists.
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
          this.enableDarkMode();
        } else {
          this.enableLightMode();
        }
      }
    },

    initModeToggleButton() {
      this.modeToggleButton_dom.addEventListener('click', () => {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
          this.setItemUtil('light-mode');
        } else {
          this.setItemUtil('dark-mode');
        }
      });
    },

    initModeAutoTrigger() {
      const darkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)');
      darkMode && darkMode.addEventListener('change', e => { 
        if (e.matches) { 
          this.enableDarkMode();
        } else { 
          this.enableLightMode();
        } 
      });
    }
  }

  KEEP.utils.modeToggle.initModeStatus();
  KEEP.utils.modeToggle.initModeToggleButton();
  KEEP.utils.modeToggle.initModeAutoTrigger();

};
