window.addEventListener('DOMContentLoaded', () => {
    console.log(`${CONFIG.themeName} v${CONFIG.themeVersion}`);

    let isOpenLeftSide = true;
    document.querySelector('.fold-left-side-btn').addEventListener('click', () => {
        document.querySelector('.page-left').style.display = isOpenLeftSide ? 'none' : 'block';
        document.querySelector('.page-right').style.width = isOpenLeftSide ? '100%' : `${CONFIG.pageLayout.right_side_width}%`;
        isOpenLeftSide = !isOpenLeftSide;
    });

});