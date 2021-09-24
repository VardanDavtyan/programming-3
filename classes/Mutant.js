/*
class Mutant extends LivingCreature {

    setRandomAxis() {
        this.moveAxis = [random([-1, 0, 1]), random([-1, 0, 1])]
        this.randomAxisChange = 0
    }

    constructor(x, y, index, maxRandomAxisValue = 20) {
        super(x, y, index)
        this.energy = 25
        this.directions = []
        this.maxRandomAxisValue = maxRandomAxisValue
        this.setRandomAxis()
    }

    chooseCell(...character) {
        super.getNewCoordinates()
        return super.chooseCell(...character)
    }

    chooseRandomAxis(...characters) {

        let newPos = [this.x + this.moveAxis[0], this.y + this.moveAxis[1]]
        let x = newPos[0]
        let y = newPos[1]
        if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
            if (characters.includes(matrix[y][x])) {
                return [x, y]
            } else {
                this.setRandomAxis()
            }
        } else {
            this.setRandomAxis()
        }
    }

    move() {

        let newCell = this.chooseRandomAxis(0)
        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[this.y][this.x] = 0
            matrix[newY][newX] = this.index
            this.x = newX
            this.y = newY
                //this.energy -= 1
        } else {
            //this.energy -= 1
        }

        if (this.energy <= 0) {
            this.die()
        }

    }

    mul() {

        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);

        if (newCell && this.energy >= 30) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = this.index;

            var newMutant = new Mutant(newX, newY, this.index, random(10, 30));
            mutantArr.push(newMutant);
        }
    }

    eat() {

        if (this.randomAxisChange >= this.maxRandomAxisValue) {
            this.setRandomAxis()
        }

        let newCell = random(this.chooseCell(1, 3))
        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            if (matrix[newY][newX] == 1) {
                this.energy += 2
                for (let i in grassArr) {
                    if (newX == grassArr[i].x && newY == grassArr[i].y) {
                        grassArr.splice(i, 1);
                        break;
                    }
                }
            } else if (matrix[newY][newX] == 3) {
                this.energy += 5
                for (let i in predatorArr) {
                    if (newX == predatorArr[i].x && newY == predatorArr[i].y) {
                        predatorArr.splice(i, 1);
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
        this.randomAxisChange++;
    }

    die() {
        for (var i in mutantArr) {
            if (this.x == mutantArr[i].x && this.y == mutantArr[i].y) {
                mutantArr.splice(i, 1);
                matrix[this.y][this.x] = 0
                break;
            }
        }
    }

}
*/


class Mutant extends LivingCreature {

    setRandomAxis() {
        this.moveAxis = [random([-1, 0, 1]), random([-1, 0, 1])]
        this.randomAxisChange = 0
    }

    constructor(x, y, index, maxRandomAxisValue = 20, energyMoveModifier = 1, energyEatGrassModifier = 2, energyEatPredatorModifier = 5, maxEnergyToMultiply = 30) {
        super(x, y, index)
        this.energy = 25
        this.directions = []
        this.maxRandomAxisValue = maxRandomAxisValue
        this.setRandomAxis()

        this.energyMoveModifier = energyMoveModifier
        this.energyEatGrassModifier = energyEatGrassModifier
        this.energyEatPredatorModifier = energyEatPredatorModifier
        this.maxEnergyToMultiply = maxEnergyToMultiply

    }

    chooseCell(...character) {
        super.getNewCoordinates()
        return super.chooseCell(...character)
    }

    chooseRandomAxis(...characters) {

        let newPos = [this.x + this.moveAxis[0], this.y + this.moveAxis[1]]
        let x = newPos[0]
        let y = newPos[1]
        if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
            if (characters.includes(matrix[y][x])) {
                return [x, y]
            } else {
                this.setRandomAxis()
            }
        } else {
            this.setRandomAxis()
        }
    }

    mul() {

        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);

        if (newCell && this.energy >= this.maxEnergyToMultiply) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = this.index;

            var newMutant = new Mutant(newX, newY, this.index, random(10, 30), this.energyMoveModifier, this.energyEatGrassModifier, this.energyEatPredatorModifier, this.maxEnergyToMultiply);
            mutantArr.push(newMutant);
        }
    }

    eat() {

        if (this.randomAxisChange >= this.maxRandomAxisValue) {
            this.setRandomAxis()
        }

        let newCell = this.chooseRandomAxis(0, 1, 3)
        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            if (matrix[newY][newX] == 0) {
                this.energy -= this.energyMoveModifier
            } else if (matrix[newY][newX] == 1) {
                this.energy += this.energyEatGrassModifier
                for (let i in grassArr) {
                    if (newX == grassArr[i].x && newY == grassArr[i].y) {
                        grassArr[i].die();
                        break;
                    }
                }
            } else if (matrix[newY][newX] == 3) {
                this.energy += this.energyEatPredatorModifier
                for (let i in predatorArr) {
                    if (newX == predatorArr[i].x && newY == predatorArr[i].y) {
                        predatorArr.splice(i, 1);
                        break;
                    }
                }
            }
            matrix[this.y][this.x] = 0
            matrix[newY][newX] = this.index
            this.x = newX
            this.y = newY
            this.mul()
            if (this.energy <= 0) {
                this.die()
            }
        }
        this.energy -= this.energyMoveModifier

        this.randomAxisChange++;
    }

    die() {
        for (var i in mutantArr) {
            if (this.x == mutantArr[i].x && this.y == mutantArr[i].y) {
                matrix[this.y][this.x] = 0
                mutantArr.splice(i, 1);
                break;
            }
        }
    }
}