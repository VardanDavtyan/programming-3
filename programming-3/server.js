var express = require("express");
var app = express();

var server = require("http").Server(app);
var io = require("socket.io")(server);
var fs = require("fs");

app.use(express.static("."));

app.get("/", function (req, res) {
  res.redirect("index.html");
});

server.listen(3000, () => console.log("Game is Running"));
//////////////////////////////////////////////////////////



Grass = require("./classes/Grass");
GrassEater = require("./classes/GrassEater");
Predator = require("./classes/Predator");
Switcher = require("./classes/Switcher");
Bomber = require("./classes/Bomber");
Mutant = require("./classes/Mutant");
random = require('./classes/random')

matrix = [];
length = 30;

grassArr = [];
grassEaterArr = [];
predatorArr = [];
switcherArr = [];
bomberArr = [];
mutantArr = [];

switcherLength = 7 + Math.floor(Math.random() * 6);
bomberLength = 3 + Math.floor(Math.random() * 2);

maxFrameRate = 2;

function getStatistics() {
  return {
    grass: grassArr.length,
    grassEater: grassEaterArr.length,
    predator: predatorArr.length,
    mutant: mutantArr.length,
    switcher: switcherArr.length,
    bomber: bomberArr.length,
  };
}



cellColors = {
  empty: [113, 196, 208],
  grass: [31, 148, 0],
  grassEater: [236, 255, 0],
  predator: [220, 0, 0],
  mutant: [251, 255, 187],
  switcher: [0, 58, 104],
  bomber: [19, 19, 19]
}

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

function createObjects() {

  matrix = [];
  length = 30;

  grassArr = [];
  grassEaterArr = [];
  predatorArr = [];
  switcherArr = [];
  bomberArr = [];
  mutantArr = [];

  switcherLength = 7 + Math.floor(Math.random() * 6);
  bomberLength = 3 + Math.floor(Math.random() * 2);

  //elements generation
  for (let y = 0; y < length; y++) matrix[y] = [];
  for (let i = 0; i < switcherLength; i++)
    matrix[Math.floor(Math.random() * length)][
      Math.floor(Math.random() * length)
    ] = 4;
  for (let i = 0; i < bomberLength; i++)
    matrix[Math.floor(Math.random() * length)][
      Math.floor(Math.random() * length)
    ] = 5;
  for (let y = 0; y < length; y++) {
    for (let x = 0; x < length; x++) {
      if (matrix[y][x] != 4 && matrix[y][x] != 5) {
        matrix[y][x] = random([0, 0, 1, 1, 1, 2, 3, 2, 0, 6]);
      }
    }
  }

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
          let randomEnergy = Math.floor(Math.random() * 10);
          let bomber = new Bomber(x, y, 5, randomEnergy, 12, 18);
          bomberArr.push(bomber);
          break;

        case 6:
          let randomAxisValue = 10 + Math.random() * 20;
          let mutant = new Mutant(x, y, 6, randomAxisValue);
          mutantArr.push(mutant);
          break;
      }
    }
  }
  io.sockets.emit("send matrix", { matrix: matrix, cellColors: cellColors });
}








function game() {
  for (let i in grassArr) grassArr[i].mul();
  for (let i in grassEaterArr) grassEaterArr[i].eat();
  for (let i in predatorArr) predatorArr[i].eat();
  for (let i in switcherArr) switcherArr[i].move();
  for (let i in bomberArr) bomberArr[i].move();
  for (let i in mutantArr) mutantArr[i].eat();
  io.sockets.emit("send matrix", { matrix: matrix, cellColors: cellColors });
}

setInterval(game, maxFrameRate);







function removeFromMatrix(characterArr) {
  console.log('hi motherfucker')
  let cellIndex = characterArr[0].index;
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      if (matrix[y][x] == cellIndex) {
        characterArr.shift();
        matrix[y][x] = 0;
      }
    }
  }
  io.sockets.emit("send matrix", { matrix: matrix, cellColors: cellColors });
}

function removeAll() {
  grassArr = [];
  grassEaterArr = [];
  predatorArr = [];
  switcherArr = [];
  bomberArr = [];
  mutantArr = [];
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      matrix[y][x] = 0;
    }
  }
  io.sockets.emit("send matrix", { matrix: matrix, cellColors: cellColors });
}

io.sockets.on("change weather", function(selectedIndex) {
  setWeather(selectedIndex)
})

io.sockets.on('remove grass', () => removeFromMatrix(grassArr))

io.on("connection", function (socket) {
  createObjects();
  //socket.on('remove grass', () => removeFromMatrix(grassArr))
  //socket.on('remove grassEater', () => removeFromMatrix(grassEaterArr))
  //socket.on('remove predator', () => removeFromMatrix(predatorArr))
  //socket.on('remove mutant', () => removeFromMatrix(mutantArr))
});

setInterval(function () {
  let data = getStatistics();
  fs.writeFile("statistics.json", JSON.stringify(data), () =>
    console.log(data)
  );
  io.sockets.emit("send data", data);
}, 1000);










function setWeather(selectedIndex) {
  switch (selectedIndex) {
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

          //cellImages.grass = grassImages.winter;

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

          //cellImages.grass = grassImages.spring;

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

          //cellImages.grass = grassImages.summer;

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

          //cellImages.grass = grassImages.autumn;

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

  io.sockets.emit("send matrix", { matrix: matrix, cellColors: cellColors });
}