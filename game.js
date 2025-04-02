import Plant from "./Plant.js";

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const width = canvas.width;
const height = canvas.height;

let plants = [];

function drawBg() {
    const img = new Image();
    img.src = "test.webp";
    img.onload = function () {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        drawPlants();
    }
}

function drawPlants() {
    const img2 = new Image();
    img2.src = "plant.webp";
    img2.onload = function () {
        for (let index = 0; index < plants.length; index++) {
            ctx.drawImage(img2, 285 + index * 60, 250, 70, 70);
        }
    };
}

function buyPlant(id = plants.length + 1, type = "Lemon Haze") {
    plants.push(new Plant(id, type));
    drawPlants();
}

window.addEventListener("click", function (event) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    const x = (event.clientX - rect.left) * scaleX;
    const y = (event.clientY - rect.top) * scaleY;

    for (let index = 0; index < plants.length; index++) {
        if (x > 285 + index * 60 && x < 285 + index * 60 + 70 && y > 250 && y < 250 + 70) {
            ToolTip(plants[index]);
        }
    }
});

function ToolTip(plant) {
    ctx.fillStyle = "#013319";
    ctx.fillRect(426, 410, 304, 209);

    const img2 = new Image();
    img2.src = "plant.webp";
    img2.onload = function () {
            ctx.drawImage(img2, 460, 460, 70, 70);
    };
}

drawBg();
buyPlant();
buyPlant();
buyPlant();
buyPlant();
buyPlant();
buyPlant();