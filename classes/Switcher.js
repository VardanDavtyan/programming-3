class Switcher extends LivingCreature {

    constructor(x, y, index, minGenerateModifier, maxGenerateModifier) {
        super(x, y, index)
        this.directions = []
        this.multiply = 0;
        this.char = 0

        this.minGenerateModifier = minGenerateModifier
        this.maxGenerateModifier = maxGenerateModifier
    }

    chooseCell(...character) {
        super.getNewCoordinates()
        return super.chooseCell(...character)
    }

    move() {
        let emptyCells = this.chooseCell(0, 1)
        let newCell = random(emptyCells)
        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[this.y][this.x] = this.char
            this.char = matrix[newY][newX]
            matrix[newY][newX] = this.index
            this.x = newX
            this.y = newY
            this.multiply++
                if (this.multiply >= random(this.minGenerateModifier, this.maxGenerateModifier)) {
                    this.generate()
                }
        }
    }

    generate() {

        let emptyCells = this.chooseCell(0)
        let randomCell = random(emptyCells)

        if (randomCell) {

            var X = randomCell[0]
            var Y = randomCell[1]

            let randomCharacter = random([1, 2, 3, 6])
            switch (randomCharacter) {
                case 1:
                    var newGrass = new Grass(X, Y, 1, cellSettings.grass.multiplyModifier, cellSettings.grass.maxMultiply)
                    grassArr.push(newGrass)
                    matrix[Y][X] = 1
                    break;
                case 2:
                    var newGrassEater = new GrassEater(X, Y, 2, cellSettings.grassEater.energyMoveModifier, cellSettings.grassEater.energyEatGrassModifier, cellSettings.grassEater.energyEatMutantModifier, cellSettings.grassEater.maxEnergyToMultiply)
                    grassEaterArr.push(newGrassEater)
                    matrix[Y][X] = 2
                    break;
                case 3:
                    var newPredator = new Predator(X, Y, 3, cellSettings.predator.energyMoveModifier, cellSettings.predator.energyEatGrassEaterModifier, cellSettings.predator.maxEnergyToMultiply)
                    predatorArr.push(newPredator)
                    matrix[Y][X] = 3
                    break;
                case 6:
                    var newMutant = new Mutant(X, Y, 6, random(10, 30), cellSettings.mutant.energyMoveModifier, cellSettings.mutant.energyEatGrassModifier, cellSettings.mutant.energyEatPredatorModifier, cellSettings.mutant.maxEnergyToMultiply)
                    mutantArr.push(newMutant)
                    matrix[Y][X] = 4
            }
            this.multiply = 0
        }
    }
}