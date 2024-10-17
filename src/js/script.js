const effect = document.querySelector(".effect");
const cards = document.querySelectorAll(".card");

cards.forEach(card => {
    card.addEventListener("mousemove", (e) => {
        const effectWidth = effect.offsetWidth / 2;
        const effectHeight = effect.offsetHeight / 2;
        effect.style.display = "flex";
        effect.style.top = (e.pageY - effectHeight) + "px";
        effect.style.left = (e.pageX - effectWidth) + "px";
        document.body.style.overflowX = "hidden";
         
    });
    card.addEventListener("mouseleave", () => {
        effect.style.display = "none";
    });
});
