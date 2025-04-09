class Plant {
    constructor(type) {
        this.type = type[0];
        this.status = 100;
        this.water = 50;
        this.minGrams = type[1];
        this.maxGrams = type[2];
        this.image = type[3];
    }
}

export default Plant;