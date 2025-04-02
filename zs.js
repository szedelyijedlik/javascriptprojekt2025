import Plant from "./Plant.js";
import Shop from "./shop.js";

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const width = canvas.width;
const height = canvas.height;

let money = new Shop().money
let quantity = new Shop().quantity
let revenue = new Shop().revenue
let multiplier = new Shop().multiplier

function drawBg() {
    const img = new Image();
    img.src = "test.webp";
    img.onload = function () {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        Computer();
    };
}

function drawComputerBg() {
    const img = new Image();
    img.src = "monitor_done.png";
    img.onload = function () {
        let imgX = 245;
        let imgY = 200;
        ctx.drawImage(img, imgX, imgY, imgX + 428, imgY + 311);
        
        ctx.fillStyle = "#013319";
        let bgX = 275;
        let bgY = 235;
        let bgW = 610;
        let bgH = 435;
        ctx.fillRect(bgX, bgY, bgW, bgH);
        
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.font = "25px Arial";
        ctx.fillText("Weed Shop Management", width / 2 - 20, 260);
        
        ctx.font = "15px Arial";
        ctx.fillText(`Money: ${money}$`, 330, 260);
        ctx.fillText(`Weed quantity: ${quantity}g`, 810, 260)


        
        ctx.strokeStyle = "white";
        ctx.moveTo(275, 275);
        ctx.lineTo(885, 275);
        ctx.stroke();

        const clicker = ctx.roundRect(285, 300, 285, 100, 10);
        // window.addEventListener('click', function (revenue, multiplier) {

        // })
        // for (let i = 0; i < 3; i++) {
        //     ctx.roundRect(285, 300 + i * 120, 285, 100, 10);
        //     ctx.fill();
        // };

        for (let i = 0; i < 3; i++) {
            ctx.roundRect(590, 300 + i * 120, 285, 100, 10);
            ctx.fill();
        };

        ctx.moveTo(580, 275);
        ctx.lineTo(580, 674);
        ctx.stroke();
    };

}

function Computer() {
    drawComputerBg();
}

drawBg();