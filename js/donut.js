//анимация пончика на стартовой странице
let donut = document.querySelector('#donut');

//создаём хэш для хранения свойств и методов пончика
let donutHash = {
    posX: 0,
    posY: 0,
    speedX: 5,
    speedY: 5,
    width: 200,
    height: 200,
    updateDonutDirection() {
        this.speedX = Math.random() * 4;
        this.speedY = 5;
    },
    updateDonutCoordinates() {
        donut.style.left = `${this.posX}px`;
        donut.style.top = `${this.posY}px`;
    },
};
donutHash.updateDonutCoordinates();

//запускаем пончик
window.addEventListener('load', function() {
    moveDonut();
});

function moveDonut() {
    donutHash.posX += donutHash.speedX;
    donutHash.posY -= donutHash.speedY;

    // касание левой стены
    if (donutHash.posX < 0) {
        donutHash.updateDonutDirection();
        donutHash.speedX += donutHash.speedX;
    }

    // касание правой стены
    if (donutHash.posX + donutHash.width > window.innerWidth) {
        donutHash.updateDonutDirection();
        donutHash.speedX = -donutHash.speedX;
    }

    //касание top
    if (donutHash.posY < 0) {
        donutHash.speedY = -donutHash.speedY;
        donutHash.posY = 0;
    }

    // касание bottom
    if (donutHash.posY + donutHash.height > window.innerHeight) {
        donutHash.speedY = -donutHash.speedY;
        donutHash.posY = window.innerHeight - donutHash.height;
    }
    donutHash.updateDonutCoordinates();
    window.requestAnimationFrame(moveDonut);
}
