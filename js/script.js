const score = document.querySelector(".score"),
      start = document.querySelector(".start"),
      gameArea = document.querySelector(".gameArea"),
      car = document.createElement("div");

car.classList.add("car");

const keys = {
    arrowUp: false,
    arrowDown: false,
    arrowRight: false,
    arrowLeft: false
};

const setting = {
    start: false,
    score: 0,
    speed: 7,
    traffic: 3
};

function getQuantityElements (heightElement) { //считает сколько линий поместить на страницы
    return document.documentElement.clientHeight / heightElement + 1;
}

      
function startGame() {
    start.classList.add("hide");
    gameArea.innerHTML = "";
    
    gameArea.style.display = "block";

    for (let i = 0; i < getQuantityElements(100); i++) { //создает элементы в зависимости от функции
        const line = document.createElement("div");
        line.classList.add("line");
        line.style.top = (i * 100) + "px";
        line.y = i * 100;
        gameArea.appendChild(line);

    }

    for (let i = 0; i < getQuantityElements(100 * setting.traffic); i++) {
        const enemy = document.createElement("div");
        enemy.classList.add("enemy");
        enemy.y = -100 * setting.traffic * i + 1; //авто выше экрана
        enemy.style.left = Math.floor((Math.random() * (gameArea.offsetWidth - 50))) + "px";
        enemy.style.background = "transparent url('./image/enemy2.png') center / cover no-repeat";
        enemy.style.top = enemy.y + "px";
        gameArea.appendChild(enemy);
    }

    gameArea.classList.remove("hide");
    setting.score = 0;
    setting.start = true;
    gameArea.appendChild(car);
    car.style.left = (gameArea.offsetWidth / 2 - car.offsetWidth / 2) + "px";
    console.log(car.style.left);
    console.log(gameArea.offsetWidth);
    car.style.bottom ="10px";
    car.style.top ="auto";
    setting.x = car.offsetLeft; //125px
    setting.y = car.offsetTop; 
    requestAnimationFrame(playGame);
}

document.addEventListener("keydown", startRun);
document.addEventListener("keyup", stopRun);
start.addEventListener("click", startGame);

function startRun(event) {
    event.preventDefault();
    keys[event.key] = true;
}

function playGame(){

    if (setting.start) { 

        setting.score += setting.speed;
        score.innerHTML = "SCORE<br>" + setting.score;
        moveRoad();
        moveEnemy();
                     //setting.start = true
        if (keys.ArrowLeft && setting.x > 0) {
            setting.x -=setting.speed;
        } 
        if (keys.ArrowRight && setting.x < (gameArea.offsetWidth - car.offsetWidth)) { // < 250
            setting.x +=setting.speed;
        }   
        if (keys.ArrowDown && setting.y < (gameArea.offsetHeight - car.offsetHeight - 1)) { //откуда прибавляется 1px???
            setting.y +=setting.speed;
        } 
        if (keys.ArrowUp && setting.y > 0) {
            setting.y -=setting.speed;
        } 
        
        car.style.left = setting.x + "px";   
        car.style.top = setting.y + "px";         
        requestAnimationFrame(playGame);
    }
}

function stopRun(event) {
    event.preventDefault();
    keys[event.key] = false;
}

function moveRoad() {
    let lines = document.querySelectorAll(".line");

    lines.forEach(function(line) {
        line.y += setting.speed;
        line.style.top = line.y + "px";

        if (line.y >= document.documentElement.clientHeight) {
            line.y = -100; //выше экрана
        }
    })

}

function moveEnemy() {
    let enemy = document.querySelectorAll(".enemy");

    enemy.forEach(function(item) {
        let carRect = car.getBoundingClientRect();
        let enemyRect = item.getBoundingClientRect();

        if(carRect.top <= enemyRect.bottom && carRect.right >= enemyRect.left &&
            carRect.left <= enemyRect.right && carRect.bottom >= enemyRect.top) {
            setting.start = false;
            start.classList.remove("hide");
            start.style.top = score.offsetHeight + "px";
        }
        

    })

    enemy.forEach(function(item) {
        item.y += setting.speed / 2;
        item.style.top = item.y + "px";

        if (item.y >= document.documentElement.clientHeight) {
            item.y = -175 * setting.traffic; // приближение
            item.style.left = Math.floor((Math.random() * (gameArea.offsetWidth - 50))) + "px";
        }
    })
}


