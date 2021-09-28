
var socket = io();

let side = 30 //27.5;







let cellImages = {}

let grassImages = {}

//function preload() {
//
//    grassImages = {
//        winter: loadImage('./images/grass-winter.png'),
//        spring: loadImage('./images/grass-spring.png'),
//        summer: loadImage('./images/grass.png'),
//        autumn: loadImage('./images/grass-autumn.png')
//    }
//
//    cellImages = {
//        grass: grassImages.summer,
//        grassEater: loadImage('./images/grassEater.png'),
//        predator: loadImage('./images/predator.png'),
//        switcher: loadImage('./images/switcher.png'),
//        bomber: loadImage('./images/bomber.png'),
//        mutant: loadImage('./images/mutant.png')
//    }
//}



//events

document.getElementById("grassRemoveButton").onclick = () => socket.emit('remove grass')
document.getElementById("grassEaterRemoveButton").onclick = () => socket.emit('remove grassEater')
document.getElementById("predatorRemoveButton").onclick = () => socket.emit('remove predator')
document.getElementById("mutantRemoveButton").onclick = () => socket.emit('remove mutant')


let selectValue = document.getElementById("weather-subject");
//setWeather(selectValue)
selectValue.onchange = () => {
    //setWeather(selectValue)
    socket.emit("change weather", selectValue.selectedIndex)
}

//let frameRateBar = document.getElementById("fpsRate")
//frameRateBar.onchange = () => {
//    maxFrameRate = frameRateBar.value
//}


socket.on("send data", data => {
    //renderDiagram(data)
    //renderData(data)
})


function setup() {

    let canvas = createCanvas(30 * side, 30 * side);
    canvas.parent("main-game")
    noStroke()


}

function render(renderingData) {
    
    let matrix = renderingData.matrix
    let cellColors = renderingData.cellColors

    background(...cellColors.empty)
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            switch (matrix[y][x]) {
                case 0:
                    noStroke()
                    fill(...cellColors.empty);

                    break;
                case 1:
                    stroke(0)
                    fill(...cellColors.grass);
                    //image(cellImages.grass, x * side, y * side, side, side)
                    break;
                case 2:
                    stroke(0)
                    fill(...cellColors.grassEater);
                    //image(cellImages.grassEater, x * side, y * side, side, side)
                    break;
                case 3:
                    stroke(0)
                    fill(...cellColors.predator)
                    //image(cellImages.predator, x * side, y * side, side, side)
                    break;
                case 4:
                    stroke(0)
                    fill(...cellColors.switcher)
                    //image(cellImages.switcher, x * side, y * side, side, side)
                    break;
                case 5:
                    stroke(0)
                    fill(...cellColors.bomber)
                    //image(cellImages.bomber, x * side, y * side, side, side)
                    break;
                case 6:
                    stroke(0)
                    fill(...cellColors.mutant)
                    //image(cellImages.mutant, x * side, y * side, side, side)
                    break;
            }
            rect(x * side, y * side, side, side);

        }
    }
}



socket.on('send matrix', render)