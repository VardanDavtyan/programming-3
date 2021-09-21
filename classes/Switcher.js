class Switcher extends LivingCreature {

    constructor(x, y, index) {
        super(x, y, index)
        this.directions = []
        this.multiply = 0;
        this.char = 0
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
                if (this.multiply >= (5 + Math.floor(Math.random() * 4))) {
                    this.generate()
                }
        }
    }

    generate() {

        let emptyCells = this.chooseCell(0, 1)
        let randomCell = random(emptyCells)

        if (randomCell) {

            var X = randomCell[0]
            var Y = randomCell[1]

            let randomCharacter = random([1, 2, 3, 6])
            switch (randomCharacter) {
                case 1:
                    var newGrass = new Grass(X, Y, 1)
                    grassArr.push(newGrass)
                    break;
                case 2:
                    var newGrassEater = new GrassEater(X, Y, 2)
                    grassEaterArr.push(newGrassEater)
                    break;
                case 3:
                    var newPredator = new Predator(X, Y, 3)
                    predatorArr.push(newPredator)
                    break;
                case 6:
                    var newMutant = new Mutant(X, Y, 6, random(10, 30))
                    mutantArr.push(newMutant)
            }
            this.multiply = 0
        }
    }
}