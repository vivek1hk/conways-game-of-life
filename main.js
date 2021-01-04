// Rules
// If neighbours >3 or <2 cell dies
// If neighbours exactly 3, cell regenerates
// If neighbours are 2 or 3 live, cell lives

var cellsPerRow = 60;
var pixelsPerCell = 10;
var cells = [];
var duration = 10; //Redraw duration in milliseconds



function setup() {
  createCanvas(cellsPerRow * pixelsPerCell, cellsPerRow * pixelsPerCell);
  initializeCells();
  drawSquares(cellsPerRow * cellsPerRow);
  noLoop();  
  setInterval(() => {redraw()}, duration);
}


function initializeCells() {
  let row = [];
  for (let i = 0; i < cellsPerRow; i++) {
    for (let j = 0; j < cellsPerRow; j++) {
      row.push(floor(random(2)));
    }
    cells.push(row);
    row = [];
  }
}

function draw() {
 computeNextGeneration();
}

function drawSquares(num) {
  let x = y = 0;

  for (let i = 0; i < num; i++) {
    fill(0);
    if (cells[parseInt(i / cellsPerRow)] [i % cellsPerRow] == 1) {
      fill(255,  215, 0 );
    }
    square(i % cellsPerRow * pixelsPerCell, parseInt(i / cellsPerRow) * pixelsPerCell, pixelsPerCell);
  }

}

function computeNextGeneration() {
  let copyCells = [];
  cells.forEach( cell => {
    copyCells.push([...cell]);
  });
 
  neighbours = [[-1,-1], [-1,0], [-1,1], [0,-1],[0,1],[1,-1],[1,0],[1,1]];

  for (let i = 0; i < cellsPerRow; i++) {
    for (let j = 0; j < cellsPerRow; j++) {
      let sum = 0;
      for (let k = 0; k < neighbours.length; k++) {
      sum += cells[
              (i+neighbours[k][0] + cellsPerRow)%cellsPerRow][(j+neighbours[k][1]+cellsPerRow)%cellsPerRow];
      }
      if( sum == 3 && cells[i][j] == 0) {
     
        copyCells[i][j] = 1;
      }
      else if((sum < 2 || sum > 3) && cells[i][j] == 1) {
        copyCells[i][j] = 0;
      }
    }    
  }
  cells = [];
    copyCells.forEach( cell => {
    cells.push([...cell]);
  });
  drawSquares(cellsPerRow * cellsPerRow);
}


