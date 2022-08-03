
// Tile Class
class Tile {
  constructor(x, y, type) {
    this.x = x
    this.y = y
    this.type = type
  }
}

// --- Tile Class ---

// Global Variables

var canvas = document.getElementById("gameBoard")   // Canvas Object
var ctx = canvas.getContext("2d")                   // Graphics Context
var scale = 1
var currentZoom = 0
var originX = 0, originY = 0
const gameTiles = []                                // Game Tiles
var gameSpriteSheet = new Image()                   // Sprites for the game
const worldWidth = 100                              // World dimension
const tileSize = 32                                 // Set the tile size

function init() {
  var mouseX = 0, mouseY = 0
  canvas.addEventListener("wheel", (e) => {
    var zoom = 0
    if (e.deltaY/150 < 0){
      zoom = 0.5
      console.log(currentZoom)
      if (currentZoom == 1){
        return
      }
    }
    else {
      mouseX = e.clientX - canvas.offsetLeft
      mouseY = e.clientY - canvas.offsetTop
      zoom = 2
      if (currentZoom == 32){
        return
      }
    }
    if (zoom != 0){
      currentZoom *= zoom
      
      ctx.translate(originX, originY)
      ctx.scale(zoom,zoom)
      ctx.translate(
        -(mouseX / scale + originX - mouseX / (scale * zoom)),
        -(mouseY / scale + originY - mouseY / (scale * zoom))
      )
      originX = (mouseX / scale + originX - mouseX / (scale * zoom))
      originY = (mouseY / scale + originY - mouseY / (scale * zoom))
      scale *= zoom
    }
  })
  gameSpriteSheet.src = 'images/minitrees.png'
}

function loadWorld() {
  for (let y = 0; y < worldWidth; y++) {
    for (let x = 0; x < worldWidth; x++) {
      gameTiles.push(new Tile(x, y, Math.floor(Math.random() * 32)))
    }
  }
}

function drawWorld() {
  ctx.clearRect(0,0,canvas.width, canvas.height)
  ctx.fillStyle = '#333'
  ctx.fillRect(0,0,canvas.width, canvas.height)
  if(gameSpriteSheet){
    for (var t of gameTiles) {
      ctx.drawImage(gameSpriteSheet, t.type * 32, 0, 32, 32, t.x * (tileSize/2), t.y * (tileSize/3), tileSize, tileSize)
      
    }

  }
}

function eventManager(){
}

function gameLoop() {
  drawWorld()
  requestAnimationFrame(gameLoop)
}

init()
loadWorld()

gameLoop()
