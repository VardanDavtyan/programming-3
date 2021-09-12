var matrix = [];
let length = 25;
var side = 22.5;

var grassArr = [];
var grassEaterArr = [];
var predatorArr = [];
var switcherArr = [];
var bomberArr = [];
var switcherLength = 7 + Math.floor(Math.random() * 6)
var bomberLength = 2 + Math.floor(Math.random() * 2)

function setup() {

    for (var y = 0; y < length; y++)
        matrix[y] = [];
    for (var i = 0; i < 1; i++)
        matrix[Math.floor(Math.random() * length)][Math.floor(Math.random() * length)] = 4
        //for (var i = 0; i < bomberLength; i++)
        //    matrix[Math.floor(Math.random() * length)][Math.floor(Math.random() * length)] = 5
    for (var y = 0; y < length; y++) {
        for (var x = 0; x < length; x++) {
            if (matrix[y][x] != 4 && matrix[y][x] != 5) {
                matrix[y][x] = 0 //random([0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 3]) //random([0, 0, 1, 1, 1, 2, 2, 3, 2, 0])
            }
        }
    }

    createCanvas(matrix[0].length * side, matrix.length * side);
    background("#acacac");

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                var gr = new Grass(x, y, 1);
                grassArr.push(gr);
            } else if (matrix[y][x] == 2) {
                var eater = new GrassEater(x, y, 2);
                grassEaterArr.push(eater);
            } else if (matrix[y][x] == 3) {
                var predator = new Predator(x, y, 3);
                predatorArr.push(predator);
            } else if (matrix[y][x] == 4) {
                var switcher = new Switcher(x, y, 4);
                switcherArr.push(switcher);
            } else if (matrix[y][x] == 5) {
                var randomEnergy = Math.floor(Math.random() * 10)
                var bomber = new Bomber(x, y, 5, randomEnergy);
                bomberArr.push(bomber);
            }
        }
    }
}

function draw() {

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 0) {
                noStroke()
                fill(113, 196, 208);
            } else if (matrix[y][x] == 1) {
                stroke(0)
                fill(31, 148, 0);
            } else if (matrix[y][x] == 2) {
                stroke(0)
                fill(236, 255, 0);
            } else if (matrix[y][x] == 3) {
                stroke(0)
                fill(220, 0, 0)
            } else if (matrix[y][x] == 4) {
                stroke(0)
                fill(0, 58, 104)
            } else if (matrix[y][x] == 5) {
                stroke(0)
                fill(19, 19, 19)
            }
            rect(x * side, y * side, side, side);
        }
    }

    for (var i in grassArr)
        grassArr[i].mul();
    for (var i in grassEaterArr)
        grassEaterArr[i].eat()
    for (var i in predatorArr)
        predatorArr[i].eat()
    for (var i in switcherArr)
        switcherArr[i].move()
    for (var i in bomberArr)
        bomberArr[i].move()
}