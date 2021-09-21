class Predator extends LivingCreature {

    constructor(x, y, index) {
        super(x, y, index)
        this.energy = 8
        this.char = 0
        this.directions = []

        this.energyMoveModifier = 1
        this.energyEatGrassEaterModifier = 2
        this.maxEnergyToMultiply = 12
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
                //matrix[this.y][this.x] = 0
            this.char = matrix[newY][newX]
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

            var newPredator = new Predator(newX, newY, this.index);
            predatorArr.push(newPredator);

        }
    }

    eat() {
        let emptyCells = this.chooseCell(2)
        let newCell = random(emptyCells)
        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[this.y][this.x] = 0
            matrix[newY][newX] = this.index
            this.x = newX
            this.y = newY
            this.energy += this.energyEatGrassEaterModifier
            for (let i in grassEaterArr) {
                if (newX == grassEaterArr[i].x && newY == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1);
                    break;
                }
            }
            this.mul()
        } else {
            this.move()
        }
    }

    die() {
        for (var i in predatorArr) {
            if (this.x == predatorArr[i].x && this.y == predatorArr[i].y) {
                predatorArr.splice(i, 1);
                matrix[this.y][this.x] = this.char
                break;
            }
        }
    }
}