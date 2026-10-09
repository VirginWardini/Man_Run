const game = document.querySelector(".game");
const hens = document.querySelectorAll(".hen");
let currentframe = 0;

//resize for latops
function resizeGame() {
    let scaleX = window.innerWidth / 1280;
    let scaleY = window.innerHeight / 720;
    let scale = Math.min(scaleX, scaleY);
    game.style.transform = `translate(-50%, -50%) scale(${scale})`;
}
window.addEventListener("resize", resizeGame);
resizeGame();

//idle frames for hens
const idleFrames = [
    "../assets/hen_idle/hen_idle_1.png",
    "../assets/hen_idle/hen_idle_2.png",
    "../assets/hen_idle/hen_idle_3.png",
    "../assets/hen_idle/hen_idle_4.png",
    "../assets/hen_idle/hen_idle_5.png"
];


setInterval (function () {
    if (currentframe >= idleFrames.length) {
        currentframe = 0;
    }
    hens.forEach(function (hen) {
    hen.src = idleFrames[currentframe];

    });
        currentframe++;
}, 400);

//const idleFrames = [/* idle images */];
//const jumpFrames = [/* jumping images */];

//hens[randomHen]
//let randomHen = Math.floor(Math.random() * hens.length);