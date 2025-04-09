import Plant from "./Plant.js";
import Shop from "./shop.js";

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const width = canvas.width;
const height = canvas.height;

let plants = [];
let shop = new Shop();

const plantTypes = [
    ["Lemon Haze", 10, 15, "images/lemonhaze.webp"],
    ["Ghost Haze", 10, 15, "images/ghosthaze.png"],
    ["Albán szamár", 10, 15, "images/albanszamar.png"],
    ["Octopu$$y", 10, 15, "images/octopu$$y.png"],
    ["Party in the parlament", 10, 15, "images/party_in_the_parlament.png"],
    ["Strain of death", 10, 15, "images/strain_of_death.png"]
];

if (localStorage.getItem("plants") != null && localStorage.getItem("plants") != "") {
    plants = JSON.parse(localStorage.getItem("plants"));
}

if (localStorage.getItem("shop") != null && localStorage.getItem("shop") != "") {
    shop = JSON.parse(localStorage.getItem("shop"));
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
        alert("Sikertelen művelet: Nincs több hely a polcon");
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
            ToolTip(plants[index]);
        }
    }

});

function ToolTip(plant) {
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
                shop.Harvest(plant);
                plants.splice(plants.indexOf(plant), 1);
                ctx.clearRect(426, 410, 304, 209);
                drawPlants();
                console.log("Harvested plant");
            }
        });
    };

    timeout = setTimeout(() => {
        ctx.clearRect(426, 410, 304, 209);
        removeEventListener("click", tooltiplistener);
        tooltiplistener = null;
    }, 5000);
}

function alert(msg) {
    let x = width / 2;
    let y = 100;

    ctx.clearRect(0, 0, width, 150);
    ctx.fillStyle = "darkred";
    ctx.roundRect(x - msg.length * 4, y, msg.length * 8, 40, 5);
    ctx.fill();
    ctx.fillStyle = "white";
    ctx.font = "15px Arial";
    ctx.textAlign = "center";
    ctx.fillText(msg, x, y + 25);

    setTimeout(() => {
        ctx.clearRect(0, 0, width, 150);
    }, 2000);
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

let timeout = null;
let tooltiplistener = null;
drawPlants();
