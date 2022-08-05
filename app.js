// Bug Web Game

// Tree Class
class Tree {
  constructor(maxDistance){
    this.x = Math.floor(Math.random() * maxDistance) * ((Math.floor(Math.random() * 2))=1 ? 1 : -1)
    this.y = Math.floor(Math.random() * maxDistance) * ((Math.floor(Math.random() * 2))=1 ? 1 : -1)
    this.type = Math.floor(Math.random() * 24)
  }
}


// Main Program
const canvas = document.getElementById('gameBoard')
const ctx = canvas.getContext('2d')

// Graphic Global Variables
const treeSpriteSheet = new Image()

// World Global Variables
const trees = []

// Initialization
function init(){
  // Init Graphics
  treeSpriteSheet.src = '/images/minitrees.png'
  
  // Init World
  trees.push(new Tree(16))
}

// Draw / Game Loop
function draw(){

  requestAnimationFrame(draw)
}

function drawTrees(){
  for (t of this.trees){

  }
}
