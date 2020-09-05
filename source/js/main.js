window.addEventListener('DOMContentLoaded', () => {
  console.log(`${CONFIG.themeInfo.name} v${CONFIG.themeInfo.version}`);

  pageAsideOpenToggle();

});


const pageAsideOpenToggle = () => {

  const toggleDom = document.querySelector('.page-aside-toggle');
  const pageTopDom = document.querySelector('.page-main-content-top');
  const containerDom = document.querySelector('.page-container');
  const leftAsideDom = document.querySelector('.page-aside');

  const headerContentDom = document.querySelector('.header-wrapper .header-content');
  const mainContentDom = document.querySelector('.page-main-content-middle .main-content');

  let isOpen = false;
  const openToggle = (isOpen) => {

    const pageAsideWidth = '248px';
    containerDom.style.paddingLeft = isOpen ? pageAsideWidth : '0';
    pageTopDom.style.paddingLeft = isOpen ? pageAsideWidth : '0';
    pageTopDom.style.paddingLeft = isOpen ? pageAsideWidth : '0';
    leftAsideDom.style.left = isOpen ? '0' : `-${pageAsideWidth}`;

    headerContentDom.style.width = isOpen ? '76%' : '62%';
    mainContentDom.style.width = isOpen ? '76%' : '62%';

  }


  toggleDom.addEventListener('click', () => {
    isOpen = !isOpen;
    openToggle(isOpen);
  })


  window.utils = {
    openToggle: () => {
      isOpen = true;
      openToggle(isOpen);
    }
  }

}
