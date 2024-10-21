document.addEventListener("DOMContentLoaded", () => {
    if (innerWidth > 1000) {
        console.log(`rules working device width ${innerWidth}`)
        const effect = document.querySelector(".effect");
        const cards = document.querySelectorAll(".card");
        
        cards.forEach(card => {
            card.style.transition = "0.5s";
            card.addEventListener("mousemove", (e) => {
                const effectWidth = effect.offsetWidth / 2;
                const effectHeight = effect.offsetHeight / 2;
                effect.style.scale = "1";
                effect.style.top = (e.pageY - effectHeight) + "px";
                effect.style.left = (e.pageX - effectWidth) + "px";
                document.body.style.overflowX = "hidden";

                const x = e.clientX; // получаем координату X мыши
                const y = e.clientY; // получаем координату Y мыши
              
                console.log(`Координаты мыши: x=${x}, y=${y}`); 

                if (x > 1200) {
                    card.style.transform = "perspective(700px) rotateX(-0.88deg) rotateY(-1.44deg)";
                } else if (x < 350) {
                    card.style.transform ="perspective(700px) rotateX(-0.84deg) rotateY(1.39deg)";
                } else card.style.transform = "";
                 
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
    } else console.error(`rules doesn't working device width ${innerWidth}.
        you need more than 1000`);
})
