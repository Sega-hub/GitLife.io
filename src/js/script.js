const effect = document.querySelector(".effect");
const cards = document.querySelectorAll(".card");

cards.forEach(card => {
    card.addEventListener("mousemove", (e) => {
        const effectWidth = effect.offsetWidth / 2;
        const effectHeight = effect.offsetHeight / 2;
        effect.style.scale = "1";
        effect.style.top = (e.pageY - effectHeight) + "px";
        effect.style.left = (e.pageX - effectWidth) + "px";
        document.body.style.overflowX = "hidden";
         
    });
    card.addEventListener("mouseleave", () => {
        effect.style.scale = "0";
    });
});

const lines = document.querySelectorAll(".anim");

if (lines.length > 0) {
    window.addEventListener("scroll", animOnScroll);
    function animOnScroll() {
        for (let i = 0; i < lines.length; i++) {
            const animLine = lines[i];
            const animLineHeight = animLine.offsetHeight;
            const animLineOffset = offset(animLine).top;
            const animStart = 0.4;

            let lineAnimPoint = window.innerHeight - animLineHeight / animStart;

            if (animLineHeight > window.innerHeight) {
                lineAnimPoint = window.innerHeight - window.innerHeight / animStart;
            }

            if ((pageYOffset > animLineOffset - lineAnimPoint) && pageYOffset < (animLineOffset + animLineHeight)) {
                console.log(`hit 
                    pageOfs: ${pageYOffset}
                    poinUser: ${animLineOffset - lineAnimPoint}`);
                animLine.classList.add("play");
            }
        };
    }

    function offset(el) {
        const rect = el.getBoundingClientRect(), 
            scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
            scrollTop = window.pageYOffset || document.documentElement.scrollTop; 
        return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
    }
}