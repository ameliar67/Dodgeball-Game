
window.addEventListener("DOMContentLoaded", (event) => {

    let keysPressed = {};
    let distancePerIteration = 1;
    let currLevel = 0;
    let scorePerLevel = 0;
    let speedForEnemies = 4;
    let score = 0;
    let enemiesToUnveil = ["enemy3", "enemy4", "enemy5", "enemy6"]
    let next = 0;


    const player = document.getElementById("player");
    const enemy1 = document.getElementById("enemy1");
    const enemy2 = document.getElementById("enemy2");
    const enemy3 = document.getElementById("enemy3");
    const enemy4 = document.getElementById("enemy4");
    const enemy5 = document.getElementById("enemy5");
    const enemy6 = document.getElementById("enemy6");

    document.getElementById("level").innerText = "Level: " + currLevel;
    document.getElementById("score").innerText = "Score: " + score;


    function calculatePositionNewValue(oldValue, keyCode1, keyCode2) {
        let newValue = oldValue - (keysPressed[keyCode1] ? distancePerIteration : 0) + (keysPressed[keyCode2] ? distancePerIteration : 0);

        if (newValue < 0) {
            return oldValue
        }
        if (newValue > 365) {
            return oldValue
        }
        return newValue;
    }

    function positionCalculator(p, l, r) {
        let offset = parseInt(p.style.left) || l;
        p.style.left = calculatePositionNewValue(offset, 'ArrowLeft', 'ArrowRight') + 'px';


        let offsetY = parseInt(p.style.top) || r;
        p.style.top = calculatePositionNewValue(offsetY, 'ArrowUp', 'ArrowDown') + 'px';

    }

    function positionEnemyCalculator(num) {
        if (num == 0) {
            num += 360
        } else {
            num = 0
        }
        return num
    }


    function collisionCalculator(player, p) {

        if (player[1] < 270) {
            score++
            scorePerLevel++
            document.getElementById("score").innerText = "Score: " + score;
            if (scorePerLevel > 10) {
                currLevel++
                document.getElementById("level").innerText = "Level: " + currLevel;
                speedForEnemies = speedForEnemies / 2
                document.getElementById("enemy1").style.transitionDuration = speedForEnemies + "s";
                document.getElementById("enemy2").style.transitionDuration = speedForEnemies + "s";
                document.getElementById(enemiesToUnveil[next]).style.display = 'inline';
                document.getElementById("enemy3").style.transitionDuration = speedForEnemies + "s";

                if (next < (enemiesToUnveil.length - 1)) {
                    next++
                }
                scorePerLevel = 1;
            }
            return 363 + 'px';
        }

        for (let i = 0; i < p.length; i++) {

            if (player[0] > p[i][0] - 15 && player[0] < p[i][0] + 15) {
                if (player[1] > p[i][1] - 15 && player[1] < p[i][1] + 15) {
                    score--
                    scorePerLevel--
                    document.getElementById("score").innerText = "Score: " + score;
                    return 363 + 'px';
                }
            }
        }
    }




    document.body.addEventListener("keydown", (e) => {
        keysPressed[e.key] = true;
    })
    document.body.addEventListener("keyup", (e) => {
        keysPressed[e.key] = false;
    })




    setInterval(function () {
        let p = [player.getBoundingClientRect().left, player.getBoundingClientRect().top];
        let e1 = [enemy1.getBoundingClientRect().left, enemy1.getBoundingClientRect().top];
        let e2 = [enemy2.getBoundingClientRect().left, enemy2.getBoundingClientRect().top];
        let e3 = [enemy3.getBoundingClientRect().left, enemy3.getBoundingClientRect().top];
        let e4 = [enemy4.getBoundingClientRect().left, enemy4.getBoundingClientRect().top];
        let e5 = [enemy5.getBoundingClientRect().left, enemy5.getBoundingClientRect().top];
        let e6 = [enemy6.getBoundingClientRect().left, enemy6.getBoundingClientRect().top];

        let players = [e1, e2, e3, e4, e5, e6]

        player.style.top = collisionCalculator(p, players)
        positionCalculator(player, 200, 365)
    }, 5);

    setInterval(function () {
        enemy2.style.left = positionEnemyCalculator(parseInt(enemy2.style.left) || 0) + 'px';
        enemy3.style.left = positionEnemyCalculator(parseInt(enemy3.style.left) || 0) + 'px';
        enemy1.style.left = positionEnemyCalculator(parseInt(enemy1.style.left) || 0) + 'px';
        enemy4.style.left = positionEnemyCalculator(parseInt(enemy4.style.left) || 0) + 'px';
        enemy5.style.left = positionEnemyCalculator(parseInt(enemy5.style.left) || 0) + 'px';
        enemy6.style.left = positionEnemyCalculator(parseInt(enemy6.style.left) || 0) + 'px';
    }, 2000);


})


