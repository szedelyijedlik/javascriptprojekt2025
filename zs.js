import Plant from "./Plant.js";
import Shop from "./shop.js";

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const width = canvas.width;
const height = canvas.height;

const shop = new Shop()

let money = shop.money
let quantity = shop.quantity
let revenue = shop.revenue
let multiplier = shop.multiplier

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
        ctx.fillText(`Weed quantity: ${quantity}g`, 810, 260);
        
        ctx.strokeStyle = "white";
        ctx.moveTo(275, 275);
        ctx.lineTo(885, 275);
        ctx.stroke();

        for (let i = 0; i < 3; i++) {
            ctx.roundRect(285, 300 + i * 120, 285, 100, 10);
            ctx.fill();
        };
        
        for (let i = 0; i < 3; i++) {
            ctx.roundRect(590, 300 + i * 120, 285, 100, 10);
            ctx.fill();
        };

        ctx.moveTo(580, 275);
        ctx.lineTo(580, 674);
        ctx.stroke();

        ctx.closePath()

        const lemonHaze = new Image();
        lemonHaze.src = "images/lemonhaze.webp"
        lemonHaze.onload = function() {
            let imgX = 295
            let imgY = 310
            ctx.drawImage(lemonHaze, imgX, imgY, 80, 80)
            ctx.fillStyle = 'black'
            ctx.fillText("Lemon Haze", 460, 320)
            ctx.fillText("Price: 100$", 460, 345)
            ctx.fillText("Quantity you get: 15-25g", 460, 370)
            ctx.fillText("Sell price: 10$/g", 460, 395)
        }

        const albanSzamar = new Image();
        albanSzamar.src = "images/albanszamar.png"
        albanSzamar.onload = function() {
            let imgX = 295
            let imgY = 430
            ctx.drawImage(albanSzamar, imgX, imgY, 80, 80)
            ctx.fillStyle = 'black'
            ctx.fillText("Albán Szamár", 460, 440)
            ctx.fillText("Price: 500$", 460, 465)
            ctx.fillText("Quantity you get: 30-40g", 460, 490)
            ctx.fillText("Sell price: 30$/g", 460, 515)
        }

        const party_in_the_parlament = new Image();
        party_in_the_parlament.src = "images/party_in_the_parlament.png"
        party_in_the_parlament.onload = function() {
            let imgX = 295
            let imgY = 550
            ctx.drawImage(party_in_the_parlament, imgX, imgY, 80, 80)
            ctx.fillStyle = 'black'
            ctx.fillText("Party in the Parlament", 460, 560)
            ctx.fillText("Price: 2500$", 460, 585)
            ctx.fillText("Quantity you get: 50-55g", 460, 610)
            ctx.fillText("Sell price: 50$/g", 460, 635)
        }

        const strain_of_death = new Image();
        strain_of_death.src = "images/strain_of_death.png"
        strain_of_death.onload = function() {
            let imgX = 585
            let imgY = 310
            ctx.drawImage(strain_of_death, imgX, imgY, 80, 80)
            ctx.fillStyle = 'black'
            ctx.fillText("Strain of Death", 755, 320)
            ctx.fillText("Price: 10000$", 755, 345)
            ctx.fillText("Quantity you get: 90-100g", 755, 370)
            ctx.fillText("Sell price: 150$/g", 755, 395)
        }

        const ghostHaze = new Image();
        ghostHaze.src = "images/ghosthaze.png"
        ghostHaze.onload = function() {
            let imgX = 585
            let imgY = 430
            ctx.drawImage(ghostHaze, imgX, imgY, 80, 80)
            ctx.fillStyle = 'black'
            ctx.fillText("Ghost Haze", 755, 440)
            ctx.fillText("Price: ", 755, 465)
            ctx.fillText("Quantity you get: ", 755, 490)
            ctx.fillText("Sell price: ", 755, 515)
        }

        const octopussy = new Image();
        octopussy.src = "images/octopu$$y.png"
        octopussy.onload = function() {
            let imgX = 585
            let imgY = 550
            ctx.drawImage(octopussy, imgX, imgY, 80, 80)
            ctx.fillStyle = 'black'
            ctx.fillText("Octopu$$y", 755, 560)
            ctx.fillText("Price: ", 755, 585)
            ctx.fillText("Quantity you get: ", 755, 610)
            ctx.fillText("Sell price: ", 755, 635)
        }
        
        ctx.beginPath()
        ctx.fillStyle = 'green'
        ctx.roundRect(500, 648, 160, 20, 5)
        ctx.fill()
        
        ctx.fillStyle = 'white'
        ctx.fillText("Buy selected products", 580, 663)

    };

}

function closeMenu() {
    window.addEventListener('click', function (event) {
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;

        const x = (event.clientX - rect.left) * scaleX;
        const y = (event.clientY - rect.top) * scaleY;

        // if (x < 245 && x > 245 + 428 && y < 200 && y > 200 + 311) {

        // }
    })
}

function Computer() {
    drawComputerBg();
}

Computer()

closeMenu()

Clear()