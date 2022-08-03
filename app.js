
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
const gameTiles = []                                // Game Tiles
var gameSpriteSheet = new Image()                   // Sprites for the game
const worldWidth = 100                              // World dimension
const tileSize = 32                                 // Set the tile size

function init() {
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

function gameLoop() {
  drawWorld()
  requestAnimationFrame(gameLoop)
}

init()
loadWorld()

gameLoop()
