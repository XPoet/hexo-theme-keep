/* global KEEP, OpenCC */

;(() => {
  const storageKey = 'KEEP-CHINESE-SCRIPT'
  const attributes = ['title', 'placeholder', 'alt', 'data-tooltip-content']
  const skippedSelector =
    'script, style, pre, code, kbd, samp, textarea, svg, math, [contenteditable], [translate="no"], .tool-toggle-chinese'
  const siteLang = document.documentElement.lang
  const converters = {}
  let openCCPromise
  let observer

  const loadOpenCC = (src) => {
    if (window.OpenCC?.Converter) return Promise.resolve(window.OpenCC)
    if (openCCPromise) return openCCPromise

    openCCPromise = new Promise((resolve, reject) => {
      const script = document.createElement('script')
      script.src = src
      script.onload = () => {
        if (window.OpenCC?.Converter) {
          resolve(window.OpenCC)
        } else {
          script.remove()
          reject(new Error('OpenCC did not initialize'))
        }
      }
      script.onerror = () => {
        script.remove()
        reject(new Error('OpenCC failed to load'))
      }
      document.head.appendChild(script)
    }).catch((error) => {
      openCCPromise = null
      throw error
    })

    return openCCPromise
  }

  KEEP.initChineseConvert = () => {
    observer?.disconnect()

    const button = document.querySelector('.tool-toggle-chinese button')
    const container = document.querySelector('.page-container')
    if (!button || !container) return

    const nativeScript = button.dataset.nativeScript
    const textCache = new WeakMap()
    const attributeCache = new WeakMap()
    const originalTitle = document.title
    let script = nativeScript
    let converter
    let scheduled = false

    const updateButton = (failed = false) => {
      const target = script === 'cn' ? 'tw' : 'cn'
      const label = failed
        ? button.dataset.labelError
        : target === 'tw'
        ? button.dataset.labelTw
        : button.dataset.labelCn

      button.textContent = target === 'tw' ? '繁' : '简'
      button.title = label
    }

    const convertText = (node) => {
      const current = node.nodeValue
      let cached = textCache.get(node)
      if (!cached || cached.rendered !== current) {
        cached = { original: current, rendered: current }
        textCache.set(node, cached)
      }

      const rendered = script === nativeScript ? cached.original : converter(cached.original)
      if (current !== rendered) {
        node.nodeValue = rendered
        cached.rendered = rendered
      }
    }

    const convertAttributes = (element) => {
      let cached = attributeCache.get(element)
      if (!cached) {
        cached = {}
        attributeCache.set(element, cached)
      }

      attributes.forEach((name) => {
        if (!element.hasAttribute(name)) return

        const current = element.getAttribute(name)
        if (!cached[name] || cached[name].rendered !== current) {
          cached[name] = { original: current, rendered: current }
        }

        const rendered =
          script === nativeScript ? cached[name].original : converter(cached[name].original)
        if (current !== rendered) {
          element.setAttribute(name, rendered)
          cached[name].rendered = rendered
        }
      })
    }

    const apply = () => {
      if (!button.isConnected) return

      const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT)
      let node
      while ((node = walker.nextNode())) {
        if (!node.parentElement?.closest(skippedSelector)) convertText(node)
      }

      container.querySelectorAll('*').forEach((element) => {
        if (!element.closest(skippedSelector)) convertAttributes(element)
      })

      document.title = script === nativeScript ? originalTitle : converter(originalTitle)
      if (/^zh\b/i.test(siteLang)) {
        document.documentElement.lang =
          script === nativeScript ? siteLang : `zh-${script.toUpperCase()}`
      }
    }

    observer = new MutationObserver(() => {
      if (scheduled) return
      scheduled = true
      requestAnimationFrame(() => {
        scheduled = false
        if (script !== nativeScript) apply()
      })
    })

    const setScript = async (target, persist = true) => {
      button.disabled = true
      try {
        if (target !== nativeScript) {
          const openCC = await loadOpenCC(button.dataset.openccSrc)
          converters[nativeScript] ||= openCC.Converter({
            from: nativeScript,
            to: target
          })
          converter = converters[nativeScript]
        }

        if (!button.isConnected) return
        observer.disconnect()
        script = target
        apply()
        updateButton()
        if (script !== nativeScript) {
          observer.observe(container, {
            subtree: true,
            childList: true,
            characterData: true,
            attributes: true,
            attributeFilter: attributes
          })
        }
        if (persist) localStorage.setItem(storageKey, script)
      } catch (error) {
        updateButton(true)
        console.error(error)
      } finally {
        button.disabled = false
      }
    }

    button.addEventListener('click', () => {
      setScript(script === 'cn' ? 'tw' : 'cn')
    })
    updateButton()

    const saved = localStorage.getItem(storageKey)
    if ((saved === 'cn' || saved === 'tw') && saved !== nativeScript) setScript(saved, false)
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', KEEP.initChineseConvert)
  } else {
    KEEP.initChineseConvert()
  }
  document.addEventListener('pjax:success', KEEP.initChineseConvert)
})()
