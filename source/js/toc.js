window.addEventListener('DOMContentLoaded', () => {

    const articleToc = document.querySelector('.article-toc');
    const postTocWrap = document.querySelector('.post-toc-wrap');
    const navItems = postTocWrap.querySelectorAll('.post-toc li');

    if (navItems.length > 0) {

        const sections = [...navItems].map(element => {
            var link = element.querySelector('a.nav-link');
            // TOC item animation navigate.
            link.addEventListener('click', event => {
                event.preventDefault();
                var target = document.getElementById(event.currentTarget.getAttribute('href').replace('#', ''));
                var offset = target.getBoundingClientRect().top + window.scrollY - 70;
                window.anime({
                    targets: document.scrollingElement,
                    duration: 500,
                    easing: 'linear',
                    scrollTop: offset
                });
            });
            return document.getElementById(link.getAttribute('href').replace('#', ''));
        });


        function activateNavByIndex(target) {
            if (target.classList.contains('active-current')) return;
            document.querySelectorAll('.post-toc .active').forEach(element => {
                element.classList.remove('active', 'active-current');
            });
            target.classList.add('active', 'active-current');
            var parent = target.parentNode;
            while (!parent.matches('.post-toc')) {
                if (parent.matches('li')) parent.classList.add('active');
                parent = parent.parentNode;
            }
            // Scrolling to center active TOC element if TOC content is taller then viewport.
            window.anime({
                targets: postTocWrap,
                duration: 200,
                easing: 'linear',
                scrollTop: postTocWrap.scrollTop - (postTocWrap.offsetHeight / 2) + target.getBoundingClientRect().top - postTocWrap.getBoundingClientRect().top
            });
        }

        function findIndex(entries) {
            let index = 0;
            let entry = entries[index];
            if (entry.boundingClientRect.top > 0) {
                index = sections.indexOf(entry.target);
                return index === 0 ? 0 : index - 1;
            }
            for (; index < entries.length; index++) {
                if (entries[index].boundingClientRect.top <= 0) {
                    entry = entries[index];
                } else {
                    return sections.indexOf(entry.target);
                }
            }
            return sections.indexOf(entry.target);
        }

        function createIntersectionObserver(marginTop) {

            marginTop = Math.floor(marginTop + 10000);
            let intersectionObserver = new IntersectionObserver((entries, observe) => {
                let scrollHeight = document.documentElement.scrollHeight + 100;
                if (scrollHeight > marginTop) {
                    observe.disconnect();
                    createIntersectionObserver(scrollHeight);
                    return;
                }
                let index = findIndex(entries);
                activateNavByIndex(navItems[index]);
            }, {
                rootMargin: marginTop + 'px 0px -100% 0px',
                threshold: 0
            });
            sections.forEach(element => {
                element && intersectionObserver.observe(element);
            });
        }

        createIntersectionObserver(document.documentElement.scrollHeight);

    } else {

        if (postTocWrap) {
            postTocWrap.innerHTML = '';
            postTocWrap.style.display = 'none';
        }

        if (articleToc) {
            articleToc.style.display = 'none';
        }
    }


});

