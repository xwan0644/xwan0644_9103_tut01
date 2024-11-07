let img;
let numSegments = 50;
let segments = [];
let drawSegments = true;
let imgDrwPrps = {aspect: 0, width: 0, height: 0, xOffset: 0, yOffset: 0};
let canvasAspectRatio = 0;

function preload(){
  img = loadImage("/readmeImages/Mona_Lisa_by_Leonardo_da_Vinci_500_x_700.jpg")
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imgDrwPrps.aspect = img.width / img.height;
  
  calculateImageDrawProps();
  let segmentWidth = img.width / numSegments;
  let segmentHeight = img.height / numSegments;

  let positionInColumn = 0;
  for(let segYPos = 0; segYPos<img.height; segYPos+=segmentHeight){
    for(let segXPos = 0; segXPos<img.width; segXPos+=segmentWidth){
      let segmentColour = img.get(segXPos+segmentWidth/2, segYPos+segmentHeight/2);
      let segment = new ImageSegment(positionInColumn, positionInRow,segmentColour);
      segments.push(segment);
      positionInRow++;
    }
    positionInColumn++;
  }
  for (const segment of segments) {
    segment.calculateSegDrawProps();
  }
}

function draw() {
  background(0);
  if(drawSegments){
    for(const segment of segments){
      segment.scale = dist(segment.srcImgSegXPos, segment.srcImgSegYPos, mouseX, mouseY)/100;
      segment.draw();
    }
  }else{
    image(img, imgDrwPrps.xOffset, imgDrwPrps.yOffset, imgDrwPrps.width, imgDrwPrps.height);
  }
}

function keyPressed(){
  if (key == " "){
    drawSegments = !drawSegments;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  calculateImageDrawProps();
  for (const segment of segments) {
    segment.calculateSegDrawProps();
  }
}

function calculateImageDrawProps(){
  canvasAspectRatio = width / height;
  if (imgDrwPrps.aspect > canvasAspectRatio){
    imgDrwPrps.width = width;
    imgDrwPrps.height = width / imgDrwPrps.aspect;
    imgDrwPrps.yOffset = (height - imgDrwPrps.height) / 2;
    imgDrwPrps.xOffset = 0;
  }else if(imgDrwPrps.aspect < canvasAspectRatio){
    imgDrwPrps.height = height;
    imgDrwPrps.width = height * imgDrwPrps.aspect;
    imgDrwPrps.xOffset = (width - imgDrwPrps.width) / 2;
    imgDrwPrps.yOffset = 0;
  }else if (imgDrwPrps.aspect == canvasAspectRatio){
    imgDrwPrps.width = width;
    imgDrwPrps.height = height;
    imgDrwPrps.xOffset = 0;
    imgDrwPrps.yOffset = 0;
  }
}

class ImageSegment{
  constructor(columnPositionInPrm, rowPostionInPrm  ,srcImgSegColourInPrm){
    this.columnPosition = columnPositionInPrm;
    this.rowPostion = rowPostionInPrm;
    this.srcImgSegColour = srcImgSegColourInPrm;
    this.drawXPos = 0;
    this.drawYPos = 0;
    this.drawWidth = 0;
    this.drawHeight = 0;
  }

  calculateSegDrawProps(){
    this.drawWidth = imgDrwPrps.width / numSegments;
    this.drawHeight = imgDrwPrps.height / numSegments;
    this.drawXPos = this.rowPostion * this.drawWidth + imgDrwPrps.xOffset;
    this.drawYPos = this.columnPosition * this.drawHeight + imgDrwPrps.yOffset;
  }

  draw(){
    stroke(0);
    fill(this.srcImgSegColour);
    rect(this.drawXPos, this.drawYPos, this.drawWidth, this.drawHeight);
  }
}
