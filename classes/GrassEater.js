class GrassEater extends LivingCreature {

    constructor(x, y, index) {
        super(x, y, index)
        this.energy = 8
        this.directions = []
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
            this.energy -= 1
        } else {
            this.energy -= 1
        }
        if (this.energy <= 0) {
            this.die()
        }
    }

    mul() {
        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);

        if (newCell && this.energy >= 12) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = this.index;

            var newGrassEater = new GrassEater(newX, newY, this.index);
            grassEaterArr.push(newGrassEater);
        }
    }

    eat() {
        let emptyCells = this.chooseCell(1)
        let newCell = random(emptyCells)
        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[this.y][this.x] = 0
            matrix[newY][newX] = this.index
            this.x = newX
            this.y = newY
            this.energy += 1
            for (let i in grassArr) {
                if (newX == grassArr[i].x && newY == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }
            this.mul()
        } else {
            this.move()
        }
    }

    die() {
        for (var i in grassEaterArr) {
            if (this.x == grassEaterArr[i].x && this.y == grassEaterArr[i].y) {
                grassEaterArr.splice(i, 1);
                matrix[this.y][this.x] = 0
                break;
            }
        }
    }

}