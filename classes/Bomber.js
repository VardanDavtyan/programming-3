class Bomber extends LivingCreature {

    constructor(x, y, index, energy) {
        super(x, y, index)
        this.energy = energy
        this.directions = []
        this.char = 0
    }

    getRadius() {
        this.radius = [
            [this.x, this.y],
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1],
            [this.x - 2, this.y],
            [this.x - 2, this.y - 1],
            [this.x - 2, this.y - 2],
            [this.x - 1, this.y - 2],
            [this.x, this.y - 2],
            [this.x + 1, this.y - 2],
            [this.x + 2, this.y - 2],
            [this.x + 2, this.y - 1],
            [this.x + 2, this.y],
            [this.x + 2, this.y + 1],
            [this.x + 2, this.y + 2],
            [this.x + 1, this.y + 2],
            [this.x, this.y + 2],
            [this.x - 1, this.y + 2],
            [this.x - 2, this.y + 2],
            [this.x - 2, this.y + 1],
            [this.x - 2, this.y - 3],
            [this.x - 1, this.y - 3],
            [this.x, this.y - 3],
            [this.x + 1, this.y - 3],
            [this.x + 2, this.y - 3],
            [this.x + 3, this.y - 2],
            [this.x + 3, this.y - 1],
            [this.x + 3, this.y],
            [this.x + 3, this.y + 1],
            [this.x + 3, this.y + 2],
            [this.x - 2, this.y + 3],
            [this.x - 1, this.y + 3],
            [this.x, this.y + 3],
            [this.x + 1, this.y + 3],
            [this.x + 2, this.y + 3],
            [this.x - 3, this.y - 2],
            [this.x - 3, this.y - 1],
            [this.x - 3, this.y],
            [this.x - 3, this.y + 1],
            [this.x - 3, this.y + 2],
            [this.x - 1, this.y - 4],
            [this.x, this.y - 4],
            [this.x + 1, this.y - 4],
            [this.x + 4, this.y - 1],
            [this.x + 4, this.y],
            [this.x + 4, this.y + 1],
            [this.x - 1, this.y + 4],
            [this.x, this.y + 4],
            [this.x + 1, this.y + 4],
            [this.x - 4, this.y - 1],
            [this.x - 4, this.y],
            [this.x - 4, this.y + 1],
            [this.x, this.y - 5],
            [this.x + 5, this.y],
            [this.x, this.y + 5],
            [this.x - 5, this.y]
        ];
    }

    chooseCell(...character) {
        super.getNewCoordinates()
        return super.chooseCell(...character)
    }

    chooseRadiusCoordinates() {
        this.getRadius()
        var found = [];
        for (let i in this.radius) {
            var x = this.radius[i][0];
            var y = this.radius[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                found.push(this.radius[i]);
            }
        }
        return found;
    }

    findCells(...character) {
        var found = []
        for (let y = 0; y < matrix.length; y++) {
            for (let x = 0; x < matrix[y].length; x++) {
                if (character.includes(matrix[y][x])) {
                    found.push([x, y])
                }
            }
        }
        return found
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
            this.energy += 1
        } else {
            this.energy += 1
        }
        this.explosion()
    }

    explosion() {

        let all = [];
        all = all.concat(grassArr);
        all = all.concat(grassEaterArr);
        all = all.concat(predatorArr);

        if (this.energy >= (12 + Math.floor(Math.random() * 5))) {

            var radiusCoords = this.chooseRadiusCoordinates()
            for (let i = 0; i < radiusCoords.length; i++) {
                let posX = radiusCoords[i][0]
                let posY = radiusCoords[i][1]
                for (let j in all) {
                    if (posX == all[j].x && posY == all[j].y) {
                        all[j].die()
                    }
                }
            }

            this.energy = 0
            matrix[this.y][this.x] = 0

            let emptyCells = this.findCells(0, 1)
            let randomCell = random(emptyCells)
            if (randomCell) {
                this.char = 0
                this.x = randomCell[0]
                this.y = randomCell[1]
                matrix[this.y][this.x] = this.index
            }
        }
    }
}