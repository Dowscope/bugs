
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
var currentZoom = 1
var originX = 0, originY = 0
var cameraOffset = {
  x: 0, 
  y: 0
}
const gameTiles = []                                // Game Tiles
var gameSpriteSheet = new Image()                   // Sprites for the game
const worldWidth = 100                              // World dimension
const tileSize = 32                                 // Set the tile size

function init() {
  gameSpriteSheet.src = 'images/minitrees.png'

  eventManager()
}

function loadWorld() {
  for (let y = 0; y < worldWidth; y++) {
    for (let x = 0; x < worldWidth; x++) {
      gameTiles.push(new Tile(x, y, Math.floor(Math.random() * 32)))
    }
  }
}

function drawWorld() {
  ctx.translate(canvas.offsetLeft + cameraOffset.x,cameraOffset.y)
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
  var mouseX = 0, mouseY = 0
  var mouseStartX = 0, mouseStartY = 0
  var dragging = false
  canvas.addEventListener("wheel", (e) => {
    var zoom = 0
    if (e.deltaY/150 < 0){
      zoom = 0.5
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
    currentZoom = currentZoom * zoom
    
    ctx.translate(originX, originY)
    ctx.scale(zoom,zoom)
    ctx.translate(
      -(mouseX / scale + originX - mouseX / (scale * zoom)),
      -(mouseY / scale + originY - mouseY / (scale * zoom))
    )
    originX = (mouseX / scale + originX - mouseX / (scale * zoom))
    originY = (mouseY / scale + originY - mouseY / (scale * zoom))
    scale *= zoom
  })
  canvas.addEventListener("mousedown", (e) => {
    if (e.button == 1) {
      mouseStartX = e.clientX - canvas.offsetLeft - cameraOffset.x
      mouseStartY = e.clientY - canvas.offsetTop - cameraOffset.y
      dragging = true
    }
  })
  canvas.addEventListener("mousemove", (e)=> {
    if (dragging)
    {
        cameraOffset.x = e.clientX - canvas.offsetLeft - mouseStartX
        cameraOffset.y = e.clientY - canvas.offsetTop - mouseStartY
        console.log(cameraOffset.x)
    }
  })
  canvas.addEventListener("mouseup", (e)=> {
    dragging = false
  })
}

function gameLoop() {
  drawWorld()
  requestAnimationFrame(gameLoop)
}

init()
loadWorld()

gameLoop()
