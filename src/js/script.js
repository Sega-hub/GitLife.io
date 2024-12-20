// import "../css/style.css";

document.addEventListener("DOMContentLoaded", () => {
    if (innerWidth > 1200) {
        const lines = document.querySelectorAll(".anim");       
        const cards = document.querySelectorAll(".card"); 
        const effect = document.querySelector(".effect");
        
        document.querySelectorAll('.openspace__categories-item').forEach(item => {
            item.addEventListener('mouseover', (event) => {
                const ball = document.querySelector('.openspace__cursor__ball');
                const circle = document.querySelector('.openspace__cursor__circle');
                const itemRect = event.target.getBoundingClientRect();
                const circleRect = circle.getBoundingClientRect();
                
                
                const offsetX = (itemRect.left + itemRect.width / 2) - (circleRect.left + circleRect.width / 2);
                const offsetY = (itemRect.top + itemRect.height / 2) - (circleRect.top + circleRect.height / 2);
        
                ball.style.transform = `translate(${offsetX * 0.34}px, ${offsetY * 0.34}px)`;
            });
        
            item.addEventListener('mouseout', () => {
                const ball = document.querySelector('.openspace__cursor__ball');
                ball.style.transform = 'translate(0, 0)'; 
            });
        });        

        cards.forEach(card => {
           
            card.style.position = "relative";
            card.style.overflow = "hidden"; 
            card.style.transition = "0.5s";
            
            effect.style.position = "absolute"; 
            effect.style.scale = "0";

            card.addEventListener("mousemove", (e) => {
                if (!card.contains(effect)) {
                    card.appendChild(effect);
                }
                const rect = card.getBoundingClientRect(); 
                const effectWidth = effect.offsetWidth / 2;
                const effectHeight = effect.offsetHeight / 2;
               
                const offsetX = e.clientX - rect.left;
                const offsetY = e.clientY - rect.top;               
                const left = offsetX - effectWidth;
                const top = offsetY - effectHeight;

                effect.style.scale = "1"; 
                effect.style.top = top + "px";
                effect.style.left = left + "px";

                const cardWidth = card.offsetWidth;
                const cardHeight = card.offsetHeight;
                const mouseInX = e.clientX - card.getBoundingClientRect().left;
                const mouseInY = e.clientY - card.getBoundingClientRect().top;

                if (mouseInX < (cardWidth / 4) && mouseInY < (cardHeight / 4)) {
                    card.style.transform = "perspective(700px) rotateX(-0.84deg) rotateY(1.39deg)";
                } else if (mouseInX > (cardWidth*(3/4)) && mouseInY < (cardHeight / 4)) {
                    card.style.transform = "perspective(700px) rotateX(-0.88deg) rotateY(-1.44deg)";
                } else if (mouseInX < (cardWidth / 4) && mouseInY > (cardHeight*(3/4))) {
                    card.style.transform = "perspective(700px) rotateX(0.84deg) rotateY(-1.39deg)";
                } else if (mouseInX > (cardWidth*(3/4)) &&  mouseInY > (cardHeight*(3/4))) {
                    card.style.transform = "perspective(700px) rotateX(0.88deg) rotateY(1.44deg)";
                } else  card.style.transform = "";
                 
            });
            card.addEventListener("mouseleave", () => {
                effect.style.scale = "0";
                card.style.transform = "";
                if (card.contains(effect)) {
                    card.removeChild(effect);
                }
            });
        });         

        if (lines.length > 0) {
            window.addEventListener("scroll", animOnScroll);
            function animOnScroll() {
                for (let i = 0; i < lines.length; i++) {
                    const animLine = lines[i];
                    const animLineHeight = animLine.offsetHeight;
                    const animLineOffset = offset(animLine).top;
                    const animStart = 0.45;
        
                    let lineAnimPoint = window.innerHeight - animLineHeight / animStart;
        
                    if (animLineHeight > window.innerHeight) {
                        lineAnimPoint = window.innerHeight - window.innerHeight / animStart;
                    }
        
                    if ((pageYOffset > animLineOffset - lineAnimPoint) && pageYOffset < (animLineOffset + animLineHeight)) {               
                        animLine.classList.add("play");
                    }
                };
            }
        } 

    } 
    
    const texts = document.querySelectorAll("#text");
    const hosting = document.querySelectorAll("#layer");
    const moves = document.querySelectorAll("#move");
    const mobLines = document.querySelectorAll(".anim");

    let lastScrollTop = 0;
    const header = document.querySelector('.header');
    const SCROLL_THRESHOLD = 50;
    
    const handleScroll = () => {
        const scrollTop = window.scrollY;
     
        if (scrollTop > SCROLL_THRESHOLD) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    
     
        if (scrollTop > lastScrollTop) {
            header.classList.add('hidden');
        } else {
            header.classList.remove('hidden');
        }
    
        lastScrollTop = Math.max(0, scrollTop);
    };
    
    window.addEventListener('scroll', () => requestAnimationFrame(handleScroll));

    if (mobLines.length > 0) {
        window.addEventListener("scroll", animOnScroll);
        function animOnScroll() {
            for (let i = 0; i < mobLines.length; i++) {
                const animLine = mobLines[i];
                const animLineHeight = animLine.offsetHeight;
                const animLineOffset = offset(animLine).top;
                const animStart = 0.6;
    
                let lineAnimPoint = window.innerHeight - animLineHeight / animStart;
    
                if (animLineHeight > window.innerHeight) {
                    lineAnimPoint = window.innerHeight - window.innerHeight / animStart;
                }
    
                if ((pageYOffset > animLineOffset - lineAnimPoint) && pageYOffset < (animLineOffset + animLineHeight)) {               
                    animLine.classList.add("mobAnim");                    
                }
               
            };
           
        }
    } 

    if (texts.length > 0) {
        window.addEventListener("scroll", textAppearance);
        function textAppearance() {
            for (let i = 0; i < texts.length; i++) {
                const textAnim = texts[i];
                const textHeight = textAnim.offsetHeight;
                const textAnimOffset = offset(textAnim).top;
                const textStart = 0.8;
    
                let textStartPoint = window.innerHeight - textHeight / textStart;
    
                if (textHeight > window.innerHeight) {
                    textStartPoint = window.innerHeight - window.innerHeight / textStart;
                }
    
                if ((pageYOffset > textAnimOffset - textStartPoint) && pageYOffset < (textAnimOffset + textHeight)) {               
                    textAnim.classList.add("appearance");
                }
            };
        }
    } 
    if (moves.length > 0) {
        window.addEventListener("scroll", scrollCard);
        function scrollCard() {
            for (let i = 0; i < moves.length; i++) {
                const moveAnim = moves[i];
                const moveHeight = moveAnim.offsetHeight;
                const moveAnimOffset = offset(moveAnim).top;
                const moveStart = 1.2;
    
                let moveStartPoint = window.innerHeight - moveHeight / moveStart;
    
                if (moveHeight > window.innerHeight) {
                    moveStartPoint = window.innerHeight - window.innerHeight / moveStart;
                }
    
                if ((pageYOffset > moveAnimOffset - moveStartPoint) && pageYOffset < (moveAnimOffset + moveHeight)) {               
                    moveAnim.classList.add("enter");
                }
            };
        }
    }

    if (hosting.length > 0) {           
        window.addEventListener("scroll", layerAppearance);
        function layerAppearance() {
            for (let i = 0; i < hosting.length; i++) {
                const hostAnim = hosting[i];
                const hostHeight = hostAnim.offsetHeight;
                const hostAnimOffset = offset(hostAnim).top;
                const hostStart = 2;
    
                let hostStartPoint = window.innerHeight - hostHeight / hostStart;
    
                if (hostHeight > window.innerHeight) {
                    hostStartPoint = window.innerHeight - window.innerHeight / hostStart;
                }
    
                if ((pageYOffset > hostAnimOffset - hostStartPoint) && pageYOffset < (hostAnimOffset + hostHeight)) {               
                    hostAnim.classList.add("show");
                }
            };
        }
    }

    function offset(el) {
        const rect = el.getBoundingClientRect(), 
            scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
            scrollTop = window.pageYOffset || document.documentElement.scrollTop; 
        return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
    }
})