let matrix = [];
let length = 30;
let side = 22.5;

let grassArr = [];
let grassEaterArr = [];
let predatorArr = [];
let switcherArr = [];
let bomberArr = [];
let mutantArr = []

let switcherLength = 7 + Math.floor(Math.random() * 6)
let bomberLength = 3 + Math.floor(Math.random() * 2)



function setup() {

    for (let y = 0; y < length; y++)
        matrix[y] = [];
    for (let i = 0; i < switcherLength; i++)
        matrix[Math.floor(Math.random() * length)][Math.floor(Math.random() * length)] = 4
    for (let i = 0; i < bomberLength; i++)
        matrix[Math.floor(Math.random() * length)][Math.floor(Math.random() * length)] = 5
    for (let y = 0; y < length; y++) {
        for (let x = 0; x < length; x++) {
            if (matrix[y][x] != 4 && matrix[y][x] != 5) {
                matrix[y][x] = random([0, 0, 1, 1, 1, 2, 3, 2, 0, 6])
            }
        }
    }

    createCanvas(matrix[0].length * side, matrix.length * side);
    background("#acacac");

    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            switch (matrix[y][x]) {

                case 1:
                    let gr = new Grass(x, y, 1);
                    grassArr.push(gr);
                    break;

                case 2:
                    let eater = new GrassEater(x, y, 2);
                    grassEaterArr.push(eater);
                    break;

                case 3:
                    let predator = new Predator(x, y, 3);
                    predatorArr.push(predator);
                    break;

                case 4:
                    let switcher = new Switcher(x, y, 4);
                    switcherArr.push(switcher);
                    break;

                case 5:
                    let randomEnergy = Math.floor(Math.random() * 10)
                    let bomber = new Bomber(x, y, 5, randomEnergy);
                    bomberArr.push(bomber);
                    break;

                case 6:
                    let randomAxisValue = random(10, 30)
                    let mutant = new Mutant(x, y, 6, randomAxisValue);
                    mutantArr.push(mutant)
                    break;
            }
        }
    }
}

function draw() {

    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            switch (matrix[y][x]) {
                case 0:
                    noStroke()
                    fill(113, 196, 208);
                    break;
                case 1:
                    stroke(0)
                    fill(31, 148, 0);
                    break;
                case 2:
                    stroke(0)
                    fill(236, 255, 0);
                    break;
                case 3:
                    stroke(0)
                    fill(220, 0, 0)
                    break;
                case 4:
                    stroke(0)
                    fill(0, 58, 104)
                    break;
                case 5:
                    stroke(0)
                    fill(19, 19, 19)
                    break;
                case 6:
                    stroke(0)
                    fill(251, 255, 187)
                    break;
            }
            rect(x * side, y * side, side, side);
        }
    }

    for (let i in grassArr)
        grassArr[i].mul();
    for (let i in grassEaterArr)
        grassEaterArr[i].eat()
    for (let i in predatorArr)
        predatorArr[i].eat()
    for (let i in switcherArr)
        switcherArr[i].move()
    for (let i in bomberArr)
        bomberArr[i].move()
    for (let i in mutantArr)
        mutantArr[i].eat()
}