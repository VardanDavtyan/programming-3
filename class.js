class Grass {

  constructor(x, y, index) {
    this.x = x;
    this.y = y;
    this.index = index;
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

  chooseCell(character) {
    var found = [];
    for (var i in this.directions) {
      var x = this.directions[i][0];
      var y = this.directions[i][1];
      if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
        if (matrix[y][x] == character) {
          found.push(this.directions[i]);
        }
      }
    }
    return found;
  }

  mul() {
    this.multiply++;
    var emptyCells = this.chooseCell(0);
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

  die() {
    for (var i in grassArr) {
      if (this.x == grassArr[i].x && this.y == grassArr[i].y) {
        grassArr.splice(i, 1);
        matrix[this.y][this.x] = 0
        break;
      }
    }
  }
}



class GrassEater {

  constructor(x, y, index) {
    this.x = x;
    this.y = y;
    this.energy = 8;
    this.index = index;
    this.directions = [];
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

  chooseCell(character) {
    this.getNewCoordinates()
    var found = [];
    for (var i in this.directions) {
      var x = this.directions[i][0];
      var y = this.directions[i][1];
      if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
        if (matrix[y][x] == character) {
          found.push(this.directions[i]);
        }
      }
    }
    return found;
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



class Predator {

  constructor(x, y, index) {
    this.x = x;
    this.y = y;
    this.energy = 8;
    this.index = index;
    this.directions = [];
    this.char = 0
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

  chooseCell(character) {
    this.getNewCoordinates()
    var found = [];
    for (var i in this.directions) {
      var x = this.directions[i][0];
      var y = this.directions[i][1];
      if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
        if (matrix[y][x] == character) {
          found.push(this.directions[i]);
        }
      }
    }
    return found;
  }

  move() {
    let emptyCells = this.chooseCell(0)//.concat(this.chooseCell(1))
    let newCell = random(emptyCells)
    if (newCell) {
      var newX = newCell[0];
      var newY = newCell[1];
      //matrix[this.y][this.x] = this.char
      matrix[this.y][this.x] = 0
      //this.char = matrix[newY][newX]
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
      this.energy += 1.5
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



class Switcher {

  constructor(x, y, index) {
    this.x = x;
    this.y = y;
    this.index = index;
    this.multiply = 0;
    this.directions = [];
    this.char = 0
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

  chooseCell(character) {
    this.getNewCoordinates()
    var found = [];
    for (var i in this.directions) {
      var x = this.directions[i][0];
      var y = this.directions[i][1];
      if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
        if (matrix[y][x] == character) {
          found.push(this.directions[i]);
        }
      }
    }
    return found;
  }

  move() {
    let emptyCells = this.chooseCell(0).concat(this.chooseCell(1))
    let newCell = random(emptyCells)
    if (newCell) {
      var newX = newCell[0];
      var newY = newCell[1];
      matrix[this.y][this.x] = this.char
      this.char = matrix[newY][newX]
      matrix[newY][newX] = this.index
      this.x = newX
      this.y = newY
      this.generate()
    }
  }

  generate() {
    this.multiply++
    let emptyCells = this.chooseCell(0).concat(this.chooseCell(1))
    let randomCell = random(emptyCells)

    if (randomCell && this.multiply >= (5 + Math.floor(Math.random() * 4))) {

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



class Bomber {

  constructor(x, y, index, energy) {
    this.x = x;
    this.y = y;
    this.index = index;
    this.energy = energy
    this.directions = [];
    this.char = 0
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

  chooseCell(character) {
    this.getNewCoordinates()
    var found = [];
    for (var i in this.directions) {
      var x = this.directions[i][0];
      var y = this.directions[i][1];
      if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
        if (matrix[y][x] == character) {
          found.push(this.directions[i]);
        }
      }
    }
    return found;
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
    let emptyCells = this.chooseCell(0).concat(this.chooseCell(1))
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
    this.explotion()
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

  explotion() {

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
        this.x = randomCell[0]
        this.y = randomCell[1]
        matrix[this.y][this.x] = this.index
      }
    }
  }
}
