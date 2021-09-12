class LivingCreature {

    constructor(x, y, index, energy = 1) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.energy = energy;
    }

    chooseCell(...characters) {
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (characters.includes(matrix[y][x])) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }

    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    mul(emptyCellIndex, maxEnergy) {
        var emptyCells = this.chooseCell(emptyCellIndex);
        var newCell = random(emptyCells);

        if (newCell && this.energy >= maxEnergy) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = this.index;

            switch (this.index) {
                case 2:
                    var newGrassEater = new GrassEater(newX, newY, this.index);
                    grassEaterArr.push(newGrassEater);
                    break;
                case 3:
                    var newPredator = new Predator(newX, newY, this.index);
                    predatorArr.push(newPredator);
                    break;

            }

        }
    }

    die(array, defaultState = 0) {
        for (var i in array) {
            if (this.x == array[i].x && this.y == array[i].y) {
                array.splice(i, 1);
                matrix[this.y][this.x] = defaultState
                break;
            }
        }
    }

}


class Grass extends LivingCreature {

    constructor(x, y, index) {
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
    }

    mul() {
        this.multiply++;
        var emptyCells = super.chooseCell(0);
        var newCell = random(emptyCells);

        if (newCell && this.multiply >= 8) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = this.index;
            var newGrass = new Grass(newX, newY, this.index);
            grassArr.push(newGrass);
            this.multiply = 0;
        }
    }

}



class GrassEater extends LivingCreature {

    constructor(x, y, index) {
        super(x, y, index, 8)
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
            super.die(grassEaterArr)
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
            super.mul(0, 12)
        } else {
            this.move()
        }
    }

}



class Predator extends LivingCreature {

    constructor(x, y, index) {
        super(x, y, index, 8)
        this.char = 0
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
            //matrix[this.y][this.x] = this.char
            matrix[this.y][this.x] = 0
                // this.char = matrix[newY][newX]
            matrix[newY][newX] = this.index
            this.x = newX
            this.y = newY
            this.energy -= 1
        } else {
            this.energy -= 1
        }
        if (this.energy <= 0) {
            super.die(predatorArr, this.char)
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
            this.energy += 2
            for (let i in grassEaterArr) {
                if (newX == grassEaterArr[i].x && newY == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1);
                    break;
                }
            }
            super.mul([0, 1], 10)
        } else {
            this.move()
        }
    }
}



class Switcher extends LivingCreature {

    constructor(x, y, index) {
        super(x, y, index)
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

            let randomCharacter = random([1, 2, 3])
            switch (randomCharacter) {
                case 1:
                    var newGrass = new Grass(X, Y, 1)
                    grassArr.push(newGrass)
                    matrix[Y][X] = 1
                    break;
                case 2:
                    var newGrassEater = new GrassEater(X, Y, 2)
                    grassEaterArr.push(newGrassEater)
                    matrix[Y][X] = 2
                    break;
                case 3:
                    var newPredator = new Predator(X, Y, 3)
                    predatorArr.push(newPredator)
                    matrix[Y][X] = 3
                    break;
            }
            this.multiply = 0
        }
    }
}



class Bomber extends LivingCreature {

    constructor(x, y, index, energy) {
        super(x, y, index, energy)
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
                        switch (all[j].index) {
                            case 1:
                                all[j].die(grassArr);
                                break;
                            case 2:
                                all[j].die(grassEaterArr);
                                break;
                            case 3:
                                all[j].die(predatorArr);
                                break;
                            case 5:
                                if (this.char == 1)
                                    all[j].die(grassArr);
                                break;
                        }

                    }
                }
            }

            this.char = 0
            this.energy = 0
            matrix[this.y][this.x] = 0

            let emptyCells = this.findCells(0, 1)
            let randomCell = random(emptyCells)
            if (randomCell) {
                this.x = randomCell[0]
                this.y = randomCell[1]
                matrix[this.y][this.x] = this.index
            }
        }
    }
}