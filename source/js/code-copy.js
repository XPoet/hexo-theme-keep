HTMLElement.prototype.wrap = function (wrapper) {
    this.parentNode.insertBefore(wrapper, this);
    this.parentNode.removeChild(this);
    wrapper.appendChild(this);
};

window.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('figure.highlight').forEach(element => {
        const box = document.createElement('div');
        element.wrap(box);
        box.classList.add('highlight-container');
        box.insertAdjacentHTML('beforeend', '<div class="copy-btn"><i class="fa fa-clipboard"></i></div>');
        var button = element.parentNode.querySelector('.copy-btn');
        button.addEventListener('click', event => {
            var target = event.currentTarget;
            var code = [...target.parentNode.querySelectorAll('.code .line')].map(line => line.innerText).join('\n');
            var ta = document.createElement('textarea');
            ta.style.top = window.scrollY + 'px'; // Prevent page scrolling
            ta.style.position = 'absolute';
            ta.style.opacity = '0';
            ta.readOnly = true;
            ta.value = code;
            document.body.append(ta);
            const selection = document.getSelection();
            const selected = selection.rangeCount > 0 ? selection.getRangeAt(0) : false;
            ta.select();
            ta.setSelectionRange(0, code.length);
            ta.readOnly = false;
            var result = document.execCommand('copy');
            target.querySelector('i').className = result ? 'fa fa-check' : 'fa fa-times';
            ta.blur(); // For iOS
            target.blur();
            if (selected) {
                selection.removeAllRanges();
                selection.addRange(selected);
            }
            document.body.removeChild(ta);
        });
        button.addEventListener('mouseleave', event => {
            setTimeout(() => {
                event.target.querySelector('i').className = 'fa fa-clipboard';
            }, 300);
        });
    });
});
