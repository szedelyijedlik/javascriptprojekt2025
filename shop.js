class Shop {
    constructor() {
        this.money = 500
        this.quantity = 0
        this.multiplier = 1;
        this.revenue = 1 * this.multiplier;
    }

    Harvest(plant) {
        let minGrams = plant.minGrams;
        let maxGrams = plant.maxGrams;
        let grams = Math.floor(Math.random() * (maxGrams - minGrams + 1)) + minGrams;
        this.quantity += grams;
    }
}

export default Shop