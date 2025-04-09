const canvas = document.getElementById("gameCanvas")
const ctx = canvas.getContext('2d')

function drawBg() {
    ctx.fillStyle = '#013319'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    const playButtonBg = new Image()
    playButtonBg.src = "logoText.webp"
    playButtonBg.onload = function() {
        let imgX = 200
        let imgY = -150
        ctx.beginPath()
        ctx.drawImage(playButtonBg, imgX, imgY, imgX + 530, imgY + 780)
        ctx.fillStyle = 'white'
        ctx.roundRect(canvas.width / 4, canvas.height / 2, 550, 200, 40)
        ctx.fill()
        ctx.closePath()

        ctx.beginPath()
        ctx.fillStyle = '#a9fe42'
        ctx.roundRect(canvas.width / 4 + 10, canvas.height / 2 + 10, 530, 180, 40)
        ctx.fill()
        ctx.closePath()

        ctx.beginPath()
        ctx.fillStyle = 'white'
        ctx.font = "130px Arial";
        ctx.fillText("Play", 440, 545, 510, 170)
        ctx.closePath()
    }
    
}

window.addEventListener('click', function () {
    
})

drawBg()