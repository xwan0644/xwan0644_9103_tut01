let song, analyser;
let volume = 1.0;
let pan = 0.0;
let fft;
let numBins = 16;
let smoothing = 0.8;
let musicRects = [];
let generatedRects = [];
let yPositions = [];
let xPositions = [];
let horizontalRoad = [];
let verticalRoad = [];

// Load the sound file in preload
function preload() {
  song = loadSound('asserts/BoogieWoogie.wav');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  analyser = new p5.Amplitude();
  // Connect the input of the analyser to the song
  analyser.setInput(song);

  fft = new p5.FFT(smoothing, numBins);
  song.connect(fft);

  // Add a button for play/pause
  let button = createButton('Play/Pause');
  // Set the position of the button to the bottom centre
  button.position(10, 10);
  // Set the action of the button by choosing what action and then a function to run
  button.mousePressed(play_pause);

  generateMusicRect()
  generateRandomRect();
  generateRandomLines();
  generateColouredHorizontalRoad(min(width, height) / 40 * 15);
  generateColouredHorizontalRoad(min(width, height) / 40 * 21);
  generateColouredHorizontalRoad(min(width, height) / 40 * 37);
  generateColouredVerticalRoad(min(width, height) / 40 * 1);
  generateColouredVerticalRoad(min(width, height) / 40 * 13);
  generateColouredVerticalRoad(min(width, height) / 40 *23);
}


    
function draw() {
  background(255);

  drawRandomRect();
  drawRandomLines();
  drawMusicRect();
  drawfixedRects();
  drawColouredHorizontalRoad();
  drawColouredVerticalRoad();
  drawText();
}

function generateRandomLines(){
  let size = min(windowWidth, windowHeight);
  
  for (let i = 0; i < 5; i++){
    yPositions.push(random(50, size - 50));
  }

  for (let j = 0; j < 5; j++){
    xPositions.push(random(50, size - 30));
  }

}

function drawRandomLines(){
  let size = min(windowWidth, windowHeight);
  
  for (let y of yPositions){
    stroke(252, 224, 46);
    strokeWeight (size/ 40);
    line(0, y, size, y);
  }
  line(0, 0, size, 0);
  line(0, size, size, size);

  for (let x of xPositions){
    stroke(252, 224, 46);
    strokeWeight(size / 40);
    line(x, 0, x, size);
  }
  line(0, 0, 0, size);
  line(size, 0, size, size);
}



//Generate red, blue and gray squares that appear in different positions each time they refresh
//Some fixed squares, representing objects（such as some buildings) that don't change

function drawfixedRects(){
  let rms = analyser.getLevel();
  let size = min(windowWidth, windowHeight)
  stroke(252, 224, 46);
  strokeWeight(size / 40);
  rectMode(CORNER);
  fill(239,17,17); //red
  rect(0.037 * size + rms * 100, 0.15 * size, 0.125 * size + rms * 200, 0.2 * size + rms * 200);

  fill(43,115,247); //blue
  rect(0.625 * size - rms * 100, 0.15 * size, 0.125 * size + rms * 200, 0.2 * size);

  fill (211,211,211); //gray
  rect (0.138 * size - rms * 100, 0.725 * size + rms * 100, 0.2 * size, 0.125 * size + rms * 200);

  fill(239,17,17); //red
  rect(0.7 * size - rms * 100, 0.7 * size - rms * 100, 0.175 * size + rms * 200, 0.225 * size + rms * 200);
}

//Random rects, representing objects that change over time

function generateRandomRect(){
  
  let size = min(windowWidth, windowHeight);
  let colors = [
    [239,17,17], //red
    [43,115,247], //blue
    [211,211,211] //gray
  ];

  //Fixed the size and location of rects.
  let fixedRects = [ 
    { x: 0.037 * size, y: 0.186 * size, w: 0.125 * size, h: 0.2 * size},
    { x: 0.625 * size, y: 0.15 * size, w: 0.125 * size, h: 0.2 * size},
    { x: 0.138 * size, y: 0.725 * size, w: 0.2 * size, h: 0.125 * size},
    { x: 0.7 * size, y: 0.7 * size, w: 0.175 * size, h: 0.225 * size},
  ];

  
  for (let i=0; i< 5; i++) {
    let rectSize = random(20,80);
    let x, y;
    let overlapping = true;
    
    //while loops are helpful for repeating statements while a condition is true. They're like if statements that repeat.
    //Loop through the locations until find one that doesn't overlap
    while (overlapping){
      x = random(0, size - 70);
      y = random(0, size - 70);
      overlapping = false;

      //Check to see if random rects overlaps the fixed rects
      for (let rect of fixedRects){
        let horizontalOverlap = false;
        let verticalOverlap = false;
      
        //Determine whether there is horizontal overlap
        if (x < rect.x + rect.w) {
          if (x + rectSize > rect.x){
            horizontalOverlap = true;
          }
        }
        //Determine whether there is vertical overlap
        if (y < rect.y + rect.h){
          if (y + rectSize > rect.y){
            verticalOverlap = true;
          }
        }

        //If both directions have overlapping, set overlapping to true
        if (horizontalOverlap){
          if (verticalOverlap){
            overlapping = true;
            break;
          }
        }
      }
    }
    let color = random(colors);
    generatedRects.push({ x, y, width: rectSize, height: rectSize, color });
  }
  
}

function drawRandomRect(){
  for (let rectangle of generatedRects) {
    fill(rectangle.color);
    noStroke();
    rectMode(CORNER);
    rect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
  }
}


// The functions of generating and drawing fixed yellow lines with three-color squares on it
function generateColouredHorizontalRoad(y){
  
  let boxSize = min(width, height) / 40;
  let boxNumbers = min(width, height) / boxSize;
  let colourChoice;
  for (let i = 0; i < boxNumbers; i ++){
    let x = i * boxSize;
    if(i % 2 === 0){
      colourChoice = color(252, 224, 46); // yellow
    } else if (i % 6 == 1 || i % 6 == 5){
      if(random(1) < 0.7){
        colourChoice = color(252, 224, 46); // yellow
      } else {
        colourChoice = color(211, 211, 211); // gray
      }
    } else {
      colourChoice = random([color(239, 17, 17), color(43, 115, 247)]);
    }
    horizontalRoad.push({ x, y, boxSize, colourChoice })
  }
}

function drawColouredHorizontalRoad(){
  for (let square of horizontalRoad){
    fill(square. colourChoice);
    noStroke();
    rect(square.x, square.y, square.boxSize, square.boxSize);
  }
}


function generateColouredVerticalRoad(x){
  let boxSize = min(width, height) / 40;
  let boxNumbers = min(width, height) / boxSize;
  let colourChoice;
  for (let i = 0; i < boxNumbers; i ++){
    let y = i * boxSize;
    if(i % 2 === 0){
      colourChoice = color(252, 224, 46); // yellow
    } else if (i % 6 == 1 || i % 6 == 5){
      if(random(1) < 0.7){
        colourChoice = color(252, 224, 46); // yellow
      } else {
        colourChoice = color(211, 211, 211); // gray
      }
    } else {
      colourChoice = random([color(239, 17, 17), color(43, 115, 247)]);
    }
    verticalRoad.push({ x, y, boxSize, colourChoice })

  }
}

function drawColouredVerticalRoad(){
  for (let square of verticalRoad){
    fill(square. colourChoice);
    noStroke();
    rect(square.x, square.y, square.boxSize, square.boxSize);
  }
}



// The function of drawing volume and pan text
function drawText() {
   // Draw the volume value on the screen
   fill(0);
   text('Volume: ' + volume.toFixed(2), min(width, height) - 80, min(width, height) / 30);
   // Draw the pan value on the screen
   text('Pan: ' + pan.toFixed(2), min(width, height) - 80, min(width, height) / 30 + 15);
}

function play_pause() {
  if (song.isPlaying()) {
    song.stop();
  } else {
    song.loop();
  }
}

function mouseMoved() {
  // Map the mouseY to a volume value between 0 and 1
  volume = map(mouseY, 0, height, 1, 0);
  song.setVolume(volume);

  // Map the mouseX to a pan value between -1 and 1
  pan = map(mouseX, 0, width, -1, 1);
  song.pan(pan);
}

class randomMusicRect{
  constructor(){
      this.x = random(0.8);
      this.y = random(0.8);
      this.size = random(0.1, 0.3);
      this.color = random([color(239, 17, 17), color(43, 115, 247), color(211, 211, 211)]);
      this.scale = 1;
  }

  display(scale){
      this.scale = scale;
      fill(this.color);
      noStroke();
      rectMode(CENTER);
      let minDimension = min(width, height);
      let size = this.size * minDimension;
      size = size * this.scale;

      let x = this.x * minDimension;
      let y = this.y * minDimension;
      rect(x, y, size, size);

  }
}

// The functions of generating and drawing rectangles changing with music
function generateMusicRect(){
  for (let i = 0; i < numBins; i++) {
    musicRects.push(new randomMusicRect());
  }
}

function drawMusicRect(){
  let spectrum = fft.analyze();
  for (let i = 0; i < numBins; i++) {
     musicRects[i].display(spectrum[i]/255);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}