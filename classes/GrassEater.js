class GrassEater extends LivingCreature {

    constructor(x, y, index, energyMoveModifier = 1, energyEatGrassModifier = 1, energyEatMutantModifier = 3, maxEnergyToMultiply = 12) {
        super(x, y, index)
        this.energy = 8
        this.directions = []

        this.energyMoveModifier = energyMoveModifier
        this.energyEatGrassModifier = energyEatGrassModifier
        this.energyEatMutantModifier = energyEatMutantModifier
        this.maxEnergyToMultiply = maxEnergyToMultiply
    }

    chooseCell(...character) {
        super.getNewCoordinates()
        return super.chooseCell(...character)
    }

    move() {
        let emptyCells = this.chooseCell(0)
        let newCell = random(emptyCells)
        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[this.y][this.x] = 0
            matrix[newY][newX] = this.index
            this.x = newX
            this.y = newY
            this.energy -= this.energyMoveModifier
        } else {
            this.energy -= this.energyMoveModifier
        }
        if (this.energy <= 0) {
            this.die()
        }
    }

    mul() {
        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);

        if (newCell && this.energy >= this.maxEnergyToMultiply) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = this.index;

            var newGrassEater = new GrassEater(newX, newY, this.index, this.energyMoveModifier, this.energyEatGrassModifier, this.energyEatMutantModifier, this.maxEnergyToMultiply);
            grassEaterArr.push(newGrassEater);
        }
    }

    /*eat() {
        let emptyCells = this.chooseCell(1, 6)
        let newCell = random(emptyCells)
        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            if (matrix[newY][newX] == 1) {
                this.energy += this.energyEatGrassModifier
                for (let i in grassArr) {
                    if (newX == grassArr[i].x && newY == grassArr[i].y) {
                        grassArr.splice(i, 1);
                        break;
                    }
                }
            } else if (matrix[newY][newX] == 6) {
                this.energy += this.energyEatMutantModifier
                for (let i in mutantArr) {
                    if (newX == mutantArr[i].x && newY == mutantArr[i].y) {
                        mutantArr.splice(i, 1);
                        break;
                    }
                }
            }
            matrix[this.y][this.x] = 0
            matrix[newY][newX] = this.index
            this.x = newX
            this.y = newY
            this.mul()
        } else {
            this.move()
        }
    }*/

    eat() {
        let emptyCells = this.chooseCell(1, 6)
        let newCell = random(emptyCells)
        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            if (matrix[newY][newX] == 1) {
                this.energy += this.energyEatGrassModifier
                for (let i in grassArr) {
                    if (newX == grassArr[i].x && newY == grassArr[i].y) {
                        grassArr.splice(i, 1);
                        break;
                    }
                }
                matrix[this.y][this.x] = 0
                matrix[newY][newX] = this.index
                this.x = newX
                this.y = newY
                this.mul()
            } else if (matrix[newY][newX] == 6 && this.energy >= 5) {
                this.energy += this.energyEatMutantModifier
                for (let i in mutantArr) {
                    if (newX == mutantArr[i].x && newY == mutantArr[i].y) {
                        mutantArr.splice(i, 1);
                        break;
                    }
                }
                matrix[this.y][this.x] = 0
                matrix[newY][newX] = this.index
                this.x = newX
                this.y = newY
                this.mul()
            }
        } else {
            this.move()
        }
    }

    die() {
        for (var i in grassEaterArr) {
            if (this.x == grassEaterArr[i].x && this.y == grassEaterArr[i].y) {
                matrix[this.y][this.x] = 0
                grassEaterArr.splice(i, 1);
                break;
            }
        }
    }

}