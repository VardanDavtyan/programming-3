let LivingCreature = require('./LivingCreature')

module.exports = class Grass extends LivingCreature {

    constructor(x, y, index, multiplyModifier = 1, maxMultiply = 8) {
        super(x, y, index)
        this.multiply = 0;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1],
        ];

        this.multiplyModifier = multiplyModifier
        this.maxMultiply = maxMultiply
    }

    mul() {

        this.multiply += this.multiplyModifier;
        var emptyCells = super.chooseCell(0);
        var newCell = random(emptyCells);

        if (newCell && this.multiply >= this.maxMultiply) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = this.index;
            var newGrass = new Grass(newX, newY, this.index, this.multiplyModifier, this.maxMultiply);
            grassArr.push(newGrass);
            this.multiply = 0;
        }
    }

    die() {
        for (var i in grassArr) {
            if (this.x == grassArr[i].x && this.y == grassArr[i].y) {
                matrix[this.y][this.x] = 0
                grassArr.splice(i, 1);
                break;
            }
        }
    }

}