import Plant from "./Plant.js";
import Shop from "./shop.js";

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const width = canvas.width;
const height = canvas.height;

let plants = [];
let shop = new Shop();

const plantTypes = [
    ["Lemon Haze", 10, 15, "images/lemonhaze.webp", 10],
    ["Ghost Haze", 10, 15, "images/ghosthaze.png", 30],
    ["Albán szamár", 10, 15, "images/albanszamar.png", 50],
    ["Octopu$$y", 10, 15, "images/octopu$$y.png", 150],
    ["Party in the parlament", 10, 15, "images/party_in_the_parlament.png", 250],
    ["Strain of death", 10, 15, "images/strain_of_death.png", 400]
];

if (localStorage.getItem("plants") != null && localStorage.getItem("plants") != "") {
    plants = JSON.parse(localStorage.getItem("plants"));
}

if (localStorage.getItem("shop") != null && localStorage.getItem("shop") != "") {
    const shopData = JSON.parse(localStorage.getItem("shop"));
    shop = Object.assign(new Shop(), shopData);
} else {
    shop = new Shop();
}

function drawPlants() {
    ctx.clearRect(0, 0, width, height);
    const plantsPerRow = 9;
    for (let index = 0; index < plants.length; index++) {
        const row = Math.floor(index / plantsPerRow);
        const col = index % plantsPerRow;

        const x = 281 + col * 64;
        const y = 255 + row * 62;

        const img = new Image();
        img.src = plants[index].image;
        img.onload = function () {
            if (plants[index].water < 10) {
                ctx.beginPath();
                ctx.fillStyle = "lightblue";
                ctx.roundRect(x + 30, y - 20 , 10, 10, 150);
                ctx.fill();
            }
            if (plants[index].status == 100) {
                ctx.beginPath();
                ctx.fillStyle = "lightgreen";
                ctx.roundRect(x + 30, y - 20, 10, 10, 150);
                ctx.fill();
            }
            ctx.drawImage(img, x, y, 68, 68);
        }
    }
}

function buyPlant(type) {
    if (plants.length < 18) {
        plants.push(new Plant(type));
        drawPlants();
    }
    else {
        alert("Nincs több hely a polcon");
    }
}

window.addEventListener("click", function (event) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    const cX = (event.clientX - rect.left) * scaleX;
    const cY = (event.clientY - rect.top) * scaleY;

    const plantsPerRow = 9;
    for (let index = 0; index < plants.length; index++) {
        const row = Math.floor(index / plantsPerRow);
        const col = index % plantsPerRow;

        const x = 281 + col * 64;
        const y = 255 + row * 62;

        if (cX + 1 > x && cX < x + 63 && cY > y && cY < y + 60) {
            if (showMenu != 1) {
                ToolTip(plants[index]);
            }
        }
    }
});

// nagy monitor nyitas
window.addEventListener("click", function (event) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    const cX = (event.clientX - rect.left) * scaleX;
    const cY = (event.clientY - rect.top) * scaleY;

    const vX = 426;
    const vY = 410;
    // fillRect(426, 410, 304, 209);

    if (cX + 1 > vX && cX < vX + 304 && cY > vY && cY < vY + 209) {
        if (showMenu == 0) {
            showMenu = 1;
            drawComputerBg();
        }
    }
});

// monitor bezarasa
window.addEventListener('click', function (event) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const x = (event.clientX - rect.left) * scaleX;
    const y = (event.clientY - rect.top) * scaleY;

    if (x < width && x > 0 && y < 200 && y > 0) {
        if(showMenu == 1) {
            showMenu = 0;
            ctx.clearRect(0, 0, width, height);
            drawPlants();
        }
    }
});

function ToolTip(plant) {
    showMenu = 2;
    if (timeout != null) {
        clearTimeout(timeout);
        timeout = null;
    }
    ctx.clearRect(426, 410, 304, 209);
    ctx.fillStyle = "#013319";
    ctx.fillRect(426, 410, 304, 209);

    const img = new Image();
    img.src = plant.image;
    img.onload = function () {
        ctx.drawImage(img, 540, 425, 70, 70);

        ctx.fillStyle = "white";
        ctx.font = "10px Arial";
        ctx.fillText(`ID: ${plants.indexOf(plant) + 1}`, 565, 420);
        ctx.font = "13px Arial";
        ctx.fillText(`Típus: ${plant.type}`, 500, 520);
        ctx.fillText(`Növekedés: ${plant.status} %`, 500, 540);
        ctx.fillText(`Vízmennyiség: ${plant.water} %`, 500, 560);
        
        ctx.font = "11px Arial";
        ctx.beginPath();
        ctx.fillStyle = "lightgreen";
        ctx.roundRect(500, 580, 70, 25, 2);
        ctx.fill();
        ctx.beginPath();
        ctx.fillStyle = "lightblue";
        ctx.roundRect(580, 580, 70, 25, 2);
        ctx.fill();
        ctx.fillStyle = "black";
        ctx.fillText("Szüretelés", 508, 595);
        ctx.fillText("Öntözés", 593, 595);

        tooltiplistener = window.addEventListener("click", function (event) {
            const rect = canvas.getBoundingClientRect();
            const scaleX = canvas.width / rect.width;
            const scaleY = canvas.height / rect.height;
            
            const x = (event.clientX - rect.left) * scaleX;
            const y = (event.clientY - rect.top) * scaleY;
        
            if (x > 500 && x < 570 && y > 580 && y < 605) {
                if (plant.status >= 100) {
                    shop.Harvest(plant);
                    plants.splice(plants.indexOf(plant), 1);
                    ctx.clearRect(426, 410, 304, 209);
                    removeEventListener("click", tooltiplistener);
                    tooltiplistener = null;
                    showMenu = 0;
                    clearTimeout(timeout);
                    timeout = null;
                    drawPlants();
                }
                else {
                    ctx.clearRect(426, 410, 304, 209);
                    removeEventListener("click", tooltiplistener);
                    tooltiplistener = null;
                    showMenu = 0;
                    drawPlants();
                }
            }

            if (x > 570 && x < 640 && y > 580 && y < 605) {
                shop.Water(plant);
                ctx.clearRect(426, 410, 304, 209);
                removeEventListener("click", tooltiplistener);
                tooltiplistener = null;
                showMenu = 0;
                clearTimeout(timeout);
                timeout = null;
                drawPlants();
            }
        });
    };

    timeout = setTimeout(() => {
        ctx.clearRect(426, 410, 304, 209);
        removeEventListener("click", tooltiplistener);
        tooltiplistener = null;
        showMenu = 0;
    }, 5000);
}

setInterval(() => {
    plants.forEach(plant => {
        if (plant.status < 100) {
            plant.water++;
        }
        if (plant.water > 0) {
            plant.water--;
        }
        if (plant.status < 100 && plant.water > 0) {
            plant.status++;
        }
    });

    localStorage.setItem("plants", JSON.stringify(plants));
    localStorage.setItem("shop", JSON.stringify(shop));
}, 2000);

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
            ctx.fillText("Price: 25000$", 755, 465)
            ctx.fillText("Quantity you get: 120-130g", 755, 490)
            ctx.fillText("Sell price: 250$/g", 755, 515)
        }

        const octopussy = new Image();
        octopussy.src = "images/octopu$$y.png"
        octopussy.onload = function() {
            let imgX = 585
            let imgY = 550
            ctx.drawImage(octopussy, imgX, imgY, 80, 80)
            ctx.fillStyle = 'black'
            ctx.fillText("Octopu$$y", 755, 560)
            ctx.fillText("Price: 30000$", 755, 585)
            ctx.fillText("Quantity you get: 140-150g", 755, 610)
            ctx.fillText("Sell price: 400$/g", 755, 635)
        }
    };
}

    window.addEventListener('click', function (event) {
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;

        const x = (event.clientX - rect.left) * scaleX;
        const y = (event.clientY - rect.top) * scaleY;

        if (showMenu == 1) {
            if (x > 285 && x < 570 && y > 300 && y < 400 && money >= 100) {
                money -= 100;
                console.log('done');
                buyPlant(plantTypes[0]);
                drawComputerBg();
            }
            else if (x > 285 && x < 570 && y > 420 && y < 520 && money >= 500) {
                money -= 500
                buyPlant(plantTypes[1]);
                drawComputerBg()
            }
            else if (x > 285 && x < 570 && y > 540 && y < 640 && money >= 2500) {
                money -= 2500
                buyPlant(plantTypes[2]);
                drawComputerBg()
            }
            else if (x > 590 && x < 285 && y > 300 && y < 400 && money >= 10000) {
                money -= 10000
                buyPlant(plantTypes[3]);
                drawComputerBg()
            }
            else if (x > 590 && x < 285 && y > 420 && y < 520 && money >= 25000) {
                money -= 25000
                buyPlant(plantTypes[4]);
                drawComputerBg()
            }
            else if (x > 590 && x < 285 && y > 540 && y < 640 && money >= 30000) {
                money -= 30000
                buyPlant(plantTypes[5]);
                drawComputerBg()
            }
        }
    })

let showMenu = 0;
let timeout = null;
let tooltiplistener = null;
drawPlants();
