// Ground object
//
// pos1 : higher left corner of ground (in meters)
// pos2 : lower right corner of ground (in meters)
//
function Ground(p, color) {
  this.pos1 = p.createVector(0, grndThickness);
  this.pos2 = p.createVector(sceneWidth, 0);
  this.color = color;

  // Draw Function
  this.display = function (p) {
    // Set gronud corners to fit actual canvas and scene dimensions
    this.pos1 = p.createVector(0, grndThickness);
    this.pos2 = p.createVector(sceneWidth, 0);
    // Setup ground properties
    p.rectMode(p.CORNERS);
    p.noStroke();
    p.fill(this.color);
    // Convert pos1 and pos2 to pixels
    let cpos1 = coordConv(p, this.pos1);
    let cpos2 = coordConv(p, this.pos2);
    p.rect(cpos1.x, cpos1.y, cpos2.x, cpos2.y);
  };
}
