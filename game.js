import Plant from "./Plant.js";
import Shop from "./shop.js";

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const width = canvas.width;
const height = canvas.height;

let plants = [];
const plantTypes = [
    ["Lemon Haze", 10, 15],
    ["Grey Haze", 10, 15],
    ["Blueberry Haze", 10, 15],
    ["Alban Haze", 10, 15],
    ["Strawberry Haze", 10, 15],
    ["Orange Haze", 10, 15]
];

const shop = new Shop();

function drawPlants() {
    const img2 = new Image();
    img2.src = "plant.webp";
    img2.onload = function () {
        for (let index = 0; index < plants.length; index++) {
            if (plants[index].water < 10) {
                ctx.beginPath();
                ctx.fillStyle = "lightblue";
                ctx.roundRect(316 + index * 60, 230, 10, 10, 150);
                ctx.fill();
            }
            if (plants[index].status == 100) {
                ctx.beginPath();
                ctx.fillStyle = "lightgreen";
                ctx.roundRect(318 + index * 60, 230, 10, 10, 150);
                ctx.fill();
            }
            ctx.drawImage(img2, 285 + index * 60, 250, 70 + plants[index].status / 20, 70 + plants[index].status / 20);
        }
    };
}

function buyPlant(type = "Lemon Haze") {
    plants.push(new Plant(type));
    drawPlants();
}

window.addEventListener("click", function (event) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    const x = (event.clientX - rect.left) * scaleX;
    const y = (event.clientY - rect.top) * scaleY;

    for (let index = 0; index < plants.length; index++) {
        if (x > 290 + index * 60 && x < 285 + index * 60 + 65 && y > 250 && y < 250 + 70) {
            ToolTip(plants[index]);
        }
    }
});

function ToolTip(plant) {
    ctx.clearRect(426, 410, 304, 209);
    ctx.fillStyle = "#013319";
    ctx.fillRect(426, 410, 304, 209);

    const img = new Image();
    img.src = "plant.webp";
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

        window.addEventListener("click", function (event) {
            const rect = canvas.getBoundingClientRect();
            const scaleX = canvas.width / rect.width;
            const scaleY = canvas.height / rect.height;
            
            const x = (event.clientX - rect.left) * scaleX;
            const y = (event.clientY - rect.top) * scaleY;
        
            if (x > 500 && x < 570 && y > 580 && y < 605) {
                shop.Harvest(plant);
                plants.splice(plants.indexOf(plant), 1);
            }
        });
    };

    setTimeout(() => {
        ctx.clearRect(426, 410, 304, 209);
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
}, 2000);

drawPlants();
buyPlant(plantTypes[Math.floor(Math.random() * plantTypes.length)]);
buyPlant(plantTypes[Math.floor(Math.random() * plantTypes.length)]);
buyPlant(plantTypes[Math.floor(Math.random() * plantTypes.length)]);
buyPlant(plantTypes[Math.floor(Math.random() * plantTypes.length)]);
buyPlant(plantTypes[Math.floor(Math.random() * plantTypes.length)]);
buyPlant(plantTypes[Math.floor(Math.random() * plantTypes.length)]);