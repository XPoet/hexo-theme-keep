/* global KEEP */

function initPostShare() {
  const pageUrl = window.location.href
  const pageTitle = window.document.title

  const shareContainer = document.querySelector('.post-share-container .share-list-wrap')

  // WeChat share
  const wechatShare = shareContainer.querySelector('.wechat')
  wechatShare &&
    wechatShare.setAttribute(
      'data-tooltip-img-url',
      `https://api.qrserver.com/v1/create-qr-code?data=${pageUrl}`
    )

  shareContainer.querySelectorAll('.share-item').forEach((item) => {
    item.addEventListener('click', () => {
      // QQ share
      if (item.classList.contains('qq')) {
        window.open(`https://connect.qq.com/widget/shareqq/index.html?url=${pageUrl}`)
      }

      // WeiBo share
      if (item.classList.contains('weibo')) {
        window.open(`https://service.weibo.com/share/share.php?url=${pageUrl}&title=${pageTitle}`)
      }
    })
  })
}

if (KEEP.theme_config.pjax?.enable === true && KEEP.utils) {
  initPostShare()
} else {
  window.addEventListener('DOMContentLoaded', initPostShare)
}
