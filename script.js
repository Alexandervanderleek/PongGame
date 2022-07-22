import Ball from "./Ball.js";
import Paddle from "./Paddle.js"

const ball = new Ball(document.getElementById("ball"))
const playerPaddle = new Paddle(document.getElementById("player-paddle"))
const computerPaddle = new Paddle(document.getElementById("computer-paddle"))
const PlayerScoreElem = document.getElementById("player-score")
const computerScoreElem = document.getElementById("computer-score")


ball.reset()

let lastTime
const update = (time) => {
    if(lastTime != null){
        const delta = time - lastTime
        ball.update(delta, [playerPaddle.rect(), computerPaddle.rect()])
        computerPaddle.update(delta, ball.y)
        const hue = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--hue"))
        document.documentElement.style.setProperty("--hue", hue+delta *0.01)

        if(isLose()){
            console.log("lost")
            handleLose()
        }
    }
    lastTime = time
    window.requestAnimationFrame(update);
}

const isLose = () => {
    const rect = ball.rect()
    return rect.right >= window.innerWidth || rect.left <= 0 
}

const handleLose = () => {
    const rect = ball.rect()
    if(rect.right >= window.innerWidth){
        PlayerScoreElem.textContent = parseInt(PlayerScoreElem.textContent ) + 1
    } else {
        computerScoreElem.textContent = parseInt(computerScoreElem.textContent) + 1

    }
    ball.reset()
}

document.addEventListener("mousemove", e => {
    playerPaddle.position = (e.y / window.innerHeight) * 100;
})

window.requestAnimationFrame(update);