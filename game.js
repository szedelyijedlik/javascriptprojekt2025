const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");


const img = new Image();
img.src = "test.webp"; // Ide írd be a kép elérési útját
img.onload = function () {
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    const img2 = new Image();
    img2.src = "plant.webp"; // Ide írd be a kép elérési útját
    img2.onload = function () {
        for (let i = 0; i < 6; i++) {
            ctx.drawImage(img2, 285 + i * 100, 250, 70, 70);
        }
        for (let i = 0; i < 6; i++) {
            ctx.drawImage(img2, 285 + i * 100, 320, 70, 70);
        }
    };
};