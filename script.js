let matrix = [];
let length = 30 //35;
let side = 30 //27.5;

let grassArr = [];
let grassEaterArr = [];
let predatorArr = [];
let switcherArr = [];
let bomberArr = [];
let mutantArr = []

let switcherLength = 7 + Math.floor(Math.random() * 6)
let bomberLength = 3 + Math.floor(Math.random() * 2)







let maxFrameRate = 2

function getStatistics() {
    return {
        grass: grassArr.length,
        grassEater: grassEaterArr.length,
        predator: predatorArr.length,
        mutant: mutantArr.length,
        switcher: switcherArr.length,
        bomber: bomberArr.length
    }
}





let cellColors = {}
let cellImages = {}
let cellSettings = {}

let grassImages = {}

function preload() {

    grassImages = {
        winter: loadImage('./images/grass-winter.png'),
        spring: loadImage('./images/grass-spring.png'),
        summer: loadImage('./images/grass.png'),
        autumn: loadImage('./images/grass-autumn.png')
    }

    cellImages = {
        grass: grassImages.summer,
        grassEater: loadImage('./images/grassEater.png'),
        predator: loadImage('./images/predator.png'),
        switcher: loadImage('./images/switcher.png'),
        bomber: loadImage('./images/bomber.png'),
        mutant: loadImage('./images/mutant.png')
    }
}

//events
function setWeather(selectValue) {
    switch (selectValue.selectedIndex) {
        case 0: //winter
            cellColors = {
                empty: [153, 153, 150],
                grass: [217, 255, 217],
                grassEater: [223, 165, 0],
                predator: [255, 123, 123],
                mutant: [204, 189, 128],
                switcher: [0, 232, 255],
                bomber: [103, 103, 103]
            }

            cellImages.grass = grassImages.winter;

            cellSettings = {
                grass: {
                    multiplyModifier: 0.4,
                    maxMultiply: 9
                },
                grassEater: {
                    energyMoveModifier: 2,
                    energyEatGrassModifier: 2,
                    energyEatMutantModifier: 7,
                    maxEnergyToMultiply: 18
                },
                predator: {
                    energyMoveModifier: 2,
                    energyEatGrassEaterModifier: 4,
                    maxEnergyToMultiply: 14
                },
                switcher: {
                    minGenerateModifier: 2,
                    maxGenerateModifier: 4
                },
                bomber: {
                    minEnergyToExplosion: 25,
                    maxEnergyToExplosion: 40
                },
                mutant: {
                    energyMoveModifier: 0.5,
                    energyEatGrassModifier: 1.5,
                    energyEatPredatorModifier: 4,
                    maxEnergyToMultiply: 28
                }
            }


            break;
        case 1: //spring
            cellColors = {
                empty: [215, 255, 251],
                grass: [104, 255, 77],
                grassEater: [252, 255, 82],
                predator: [255, 50, 50],
                mutant: [180, 174, 94],
                switcher: [0, 91, 155],
                bomber: [62, 62, 62]
            }

            cellImages.grass = grassImages.spring;

            cellSettings = {
                grass: {
                    multiplyModifier: 1,
                    maxMultiply: 8
                },
                grassEater: {
                    energyMoveModifier: 1,
                    energyEatGrassModifier: 1,
                    energyEatMutantModifier: 2,
                    maxEnergyToMultiply: 13
                },
                predator: {
                    energyMoveModifier: 1,
                    energyEatGrassEaterModifier: 2,
                    maxEnergyToMultiply: 10
                },
                switcher: {
                    minGenerateModifier: 5,
                    maxGenerateModifier: 8
                },
                bomber: {
                    minEnergyToExplosion: 14,
                    maxEnergyToExplosion: 20
                },
                mutant: {
                    energyMoveModifier: 1,
                    energyEatGrassModifier: 3,
                    energyEatPredatorModifier: 6,
                    maxEnergyToMultiply: 33
                }
            }

            break;
        case 2: //summer
            cellColors = {
                empty: [113, 196, 208],
                grass: [31, 148, 0],
                grassEater: [236, 255, 0],
                predator: [220, 0, 0],
                mutant: [251, 255, 187],
                switcher: [0, 58, 104],
                bomber: [19, 19, 19]
            }

            cellImages.grass = grassImages.summer;

            cellSettings = {
                grass: {
                    multiplyModifier: 1,
                    maxMultiply: 8
                },
                grassEater: {
                    energyMoveModifier: 1,
                    energyEatGrassModifier: 1,
                    energyEatMutantModifier: 3,
                    maxEnergyToMultiply: 12
                },
                predator: {
                    energyMoveModifier: 1,
                    energyEatGrassEaterModifier: 2,
                    maxEnergyToMultiply: 12
                },
                switcher: {
                    minGenerateModifier: 5,
                    maxGenerateModifier: 9
                },
                bomber: {
                    minEnergyToExplosion: 12,
                    maxEnergyToExplosion: 18
                },
                mutant: {
                    energyMoveModifier: 1,
                    energyEatGrassModifier: 2,
                    energyEatPredatorModifier: 5,
                    maxEnergyToMultiply: 30
                }
            }

            break;

        case 3: //autumn
            cellColors = {
                empty: [255, 255, 228],
                grass: [205, 255, 0],
                grassEater: [175, 175, 0],
                predator: [255, 108, 0],
                mutant: [255, 255, 123],
                switcher: [0, 75, 127],
                bomber: [50, 50, 50]
            }

            cellImages.grass = grassImages.autumn;

            cellSettings = {
                grass: {
                    multiplyModifier: 1,
                    maxMultiply: 9
                },
                grassEater: {
                    energyMoveModifier: 1.5,
                    energyEatGrassModifier: 1.5,
                    energyEatMutantModifier: 6,
                    maxEnergyToMultiply: 15
                },
                predator: {
                    energyMoveModifier: 1.5,
                    energyEatGrassEaterModifier: 3,
                    maxEnergyToMultiply: 13
                },
                switcher: {
                    minGenerateModifier: 4,
                    maxGenerateModifier: 8
                },
                bomber: {
                    minEnergyToExplosion: 15,
                    maxEnergyToExplosion: 30
                },
                mutant: {
                    energyMoveModifier: 0.75,
                    energyEatGrassModifier: 1.5,
                    energyEatPredatorModifier: 4,
                    maxEnergyToMultiply: 29
                }
            }

            break;
    }


    for (let i in grassArr) {
        grassArr[i].multiplyModifier = cellSettings.grass.multiplyModifier
        grassArr[i].maxMultiply = cellSettings.grass.maxMultiply
    }

    for (let i in grassEaterArr) {
        grassEaterArr[i].energyMoveModifier = cellSettings.grassEater.energyMoveModifier
        grassEaterArr[i].energyEatGrassModifier = cellSettings.grassEater.energyEatGrassModifier
        grassEaterArr[i].energyEatMutantModifier = cellSettings.grassEater.energyEatMutantModifier
        grassEaterArr[i].maxEnergyToMultiply = cellSettings.grassEater.maxEnergyToMultiply
    }

    for (let i in predatorArr) {
        predatorArr[i].energyMoveModifier = cellSettings.predator.energyMoveModifier
        predatorArr[i].energyEatGrassEaterModifier = cellSettings.predator.energyEatGrassEaterModifier
        predatorArr[i].maxEnergyToMultiply = cellSettings.predator.maxEnergyToMultiply
    }

    for (let i in switcherArr) {
        switcherArr[i].minGenerateModifier = cellSettings.switcher.minGenerateModifier
        switcherArr[i].maxGenerateModifier = cellSettings.switcher.maxGenerateModifier
    }

    for (let i in bomberArr) {
        bomberArr[i].minEnergyToExplosion = cellSettings.bomber.minEnergyToExplosion
        bomberArr[i].maxEnergyToExplosion = cellSettings.bomber.maxEnergyToExplosion
    }

    for (let i in mutantArr) {
        mutantArr[i].energyMoveModifier = cellSettings.mutant.energyMoveModifier
        mutantArr[i].energyEatGrassModifier = cellSettings.mutant.energyEatGrassModifier
        mutantArr[i].energyEatPredatorModifier = cellSettings.mutant.energyEatPredatorModifier
        mutantArr[i].maxEnergyToMultiply = cellSettings.mutant.maxEnergyToMultiply
    }
}

function removeFromMatrix(cellIndex, characterArr) {
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == cellIndex) {
                characterArr.shift()
                matrix[y][x] = 0
            }
        }
    }
}

document.getElementById("grassRemoveButton").onclick = () => removeFromMatrix(1, grassArr)
document.getElementById("grassEaterRemoveButton").onclick = () => removeFromMatrix(2, grassEaterArr)
document.getElementById("predatorRemoveButton").onclick = () => removeFromMatrix(3, predatorArr)
document.getElementById("mutantRemoveButton").onclick = () => removeFromMatrix(6, mutantArr)


let selectValue = document.getElementById("weather-subject");
setWeather(selectValue)
selectValue.onchange = () => {
    setWeather(selectValue)
}

let frameRateBar = document.getElementById("fpsRate")
frameRateBar.onchange = () => {
    frameRate(+frameRateBar.value)
}



function setup() {

    //elements generation
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

    let canvas = createCanvas(matrix[0].length * side, matrix.length * side);
    canvas.parent("main-game")
    noStroke()

    //cells implementation
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
                    let switcher = new Switcher(x, y, 4, 5, 9);
                    switcherArr.push(switcher);
                    break;

                case 5:
                    let randomEnergy = Math.floor(Math.random() * 10)
                    let bomber = new Bomber(x, y, 5, randomEnergy, 12, 18);
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

    background(...cellColors.empty)
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            switch (matrix[y][x]) {
                case 0:
                    fill(...cellColors.empty);
                    rect(x * side, y * side, side, side);
                    break;
                case 1:
                    fill(...cellColors.grass);
                    image(cellImages.grass, x * side, y * side, side, side)
                    break;
                case 2:
                    fill(...cellColors.grassEater);
                    image(cellImages.grassEater, x * side, y * side, side, side)
                    break;
                case 3:
                    fill(...cellColors.predator)
                    image(cellImages.predator, x * side, y * side, side, side)
                    break;
                case 4:
                    fill(...cellColors.switcher)
                    image(cellImages.switcher, x * side, y * side, side, side)
                    break;
                case 5:
                    fill(...cellColors.bomber)
                    image(cellImages.bomber, x * side, y * side, side, side)
                    break;
                case 6:
                    fill(...cellColors.mutant)
                    image(cellImages.mutant, x * side, y * side, side, side)
                    break;
            }

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