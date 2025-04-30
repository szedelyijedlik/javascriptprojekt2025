class Plant {
    constructor(type) {
        this.type = type[0];
        this.status = 65;
        this.water = 50;
        this.minGrams = type[1];
        this.maxGrams = type[2];
        this.image = type[3];
        this.harvestPrice = type[4];
    }
}

export default Plant;