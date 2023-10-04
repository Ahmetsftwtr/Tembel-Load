const allImageElements = document.querySelectorAll('img');
let generalOptions = {
    prevRatio: 0.0,
    displayRate: 500, // millisecond
    animation: true,
}
let interSectionOptions = {
    root: null,
    rootMargin: "0px",
};
let intersectionObserver = new IntersectionObserver(loadImage, interSectionOptions);

addEventListener("load", (event) => { })
onload = event => {
    allImageElements.forEach((img) => {
        if (typeof img !== undefined) {
            if (isNaN(img.getAttribute('tembel-url'))) {
                img.src = "https://kodlabafra.org/wp-content/uploads/2019/04/placeholder-image.jpg"
                intersectionObserver.observe(img);
            }
        }
    })
}
function loadImage(entries, observer) {
    if (entries) {
        entries.forEach(entry => {
            if (entry.intersectionRatio > generalOptions.prevRatio) {
                let element = entry.target;
                setTimeout(() => {
                    element.src = entry.target.attributes.getNamedItem('tembel-url').value;
                    if (generalOptions.animation) {
                        setAnimation(element);
                    }
                    intersectionObserver.unobserve(entry.target)
                }, generalOptions.displayRate);

            }
        })
    }
}

function setAnimation(element = new HTMLElement()) {
    element.classList.add('animation-active');
    setTimeout(() => {
        element.classList.remove('animation-active')
    }, 1000);
}