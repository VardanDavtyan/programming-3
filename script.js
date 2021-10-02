var socket = io();
let side = 27.5;

//events
document.getElementById("tsunami").onclick = () => 
  socket.emit("start tsunami")
document.getElementById("grassRemoveButton").onclick = () =>
  socket.emit("remove grass");
document.getElementById("grassEaterRemoveButton").onclick = () =>
  socket.emit("remove grassEater");
document.getElementById("predatorRemoveButton").onclick = () =>
  socket.emit("remove predator");
document.getElementById("mutantRemoveButton").onclick = () =>
  socket.emit("remove mutant");
document.getElementById("restartButton").onclick = () => socket.emit("restart");

let selectValue = document.getElementById("weather-subject");
selectValue.onchange = () => {
  socket.emit("change weather", selectValue.selectedIndex);
};

let frameRateBar = document.getElementById("fpsRate");
frameRateBar.onchange = () => {
  socket.emit("change frameRate", 1000 / +frameRateBar.value);
};

socket.on("send data", (obj) => {
  let data = obj.data;
  let cellColors = obj.cellColors;
  renderDiagram(data, cellColors);
  renderData(data, cellColors);
});

window.onload = () => {
  //set start parameters
  let frameRateValue = 1000 / +frameRateBar.value;
  let weatherIndex = selectValue.selectedIndex;
  let startData = {
    frameRateValue: frameRateValue,
    weatherIndex: weatherIndex,
  };
  socket.emit("start", startData);
};

function setup() {
  let canvas = createCanvas(35 * side, 35 * side);
  canvas.parent("main-game");
}

function render(renderingData) {
  let matrix = renderingData.matrix;
  let cellColors = renderingData.cellColors;

  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      switch (matrix[y][x]) {
        case 0:
          noStroke()
          fill(...cellColors.empty)
        break;
        case 1:
          stroke(0)
          fill(...cellColors.grass)
          break;
        case 2:
          stroke(0)
          fill(...cellColors.grassEater)
          break;
        case 3:
          stroke(0)
          fill(...cellColors.predator)
          break;
        case 4:
          stroke(0)
          fill(...cellColors.switcher)
          break;
        case 5:
          stroke(0)
          fill(...cellColors.bomber)
          break;
        case 6:
          stroke(0)
          fill(...cellColors.mutant)
          break;
      }
      rect(x * side, y * side, side, side)
    }
  }
}

socket.on("send matrix", render);
