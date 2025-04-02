import Plant from "./Plant.js";

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const width = canvas.width;
const height = canvas.height;

function drawBg() {
    const img = new Image();
    img.src = "test.webp";
    img.onload = function () {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        Computer();
    };
}

function drawComputerBg() {
    ctx.fillStyle = "#013319";
    let bgX = 425;
    let bgY = 410;
    let bgW = 305;
    let bgH = 209;
    ctx.fillRect(bgX, bgY, bgW, bgH);

    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.font = "15px Arial";
    ctx.fillText("Weed Shop Management", width / 2 - 20, 430);

    ctx.strokeStyle = "white";
    ctx.moveTo(425, 440);
    ctx.lineTo(730, 440);
    ctx.stroke();

    const img = new Image();
    img.src = "monitor_done.png";
    img.onload = function () {
        let imgX = 245;
        let imgY = 200;
        // ctx.drawImage(img, imgX, imgY, imgX + 428, imgY + 311);
    };
}

function Computer() {
    drawComputerBg();

}

function drawPlants() {
    const img2 = new Image();
    img2.src = "plant.webp";
    img2.onload = function () {
        for (let i = 0; i < 6; i++) {
            ctx.drawImage(img2, 285 + i * 100, 250, 70, 70);
        }
        for (let i = 0; i < 6; i++) {
            ctx.drawImage(img2, 285 + i * 100, 320, 70, 70);
        }
    };
}

drawBg();