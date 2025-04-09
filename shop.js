class Shop {
    constructor(money = 500, quantity = 0, multiplier = 1, plantCounter = 0) {
        this.money = money;
        this.quantity = quantity;
        this.multiplier = multiplier;
        this.revenue = 1 * this.multiplier;
        this.plantCounter = plantCounter;
    }

    Harvest(plant) {
        let minGrams = plant.minGrams;
        let maxGrams = plant.maxGrams;
        let grams = Math.floor(Math.random() * (maxGrams - minGrams + 1)) + minGrams;
        this.quantity += grams;
    }
}

export default Shop;