function goto(location) {
    window.location = `#${location.classList[0]}`;
}
hashchange = () => {
    if (window.location.hash.replace('#', '') != '') {
        var hash = window.location.hash.replace('#', '');
        var currlinks = document.querySelectorAll('.this-page');
        for (i = 0; i < currlinks.length; i++) {
            currlinks[i].classList.remove('this-page');
        }
        try {
            document.querySelector(`.${hash}`).classList.add('this-page');
        } catch (e) {}
    } else {
        var currlinks = document.querySelectorAll('.this-page');
        for (i = 0; i < currlinks.length; i++) {
            currlinks[i].classList.remove('this-page');
        }
        document.querySelector('.wiki').classList.add('this-page');
    }
}
window.onload = () => {
    hashchange();
    document.querySelectorAll('code.hljs').forEach((item) => {
        hljs.highlightElement(item);
        console.log(item);
    });
};
window.onhashchange = hashchange;
