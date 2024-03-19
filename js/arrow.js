// Arrow object
//
// pos : origin of arrow (in meters)
// dir : arrow direction (in meters/s)
// len : arrow's lenght (in meter)
//
function Arrow(p, pos, dir, len, color, graphic) {
  this.pos = p.createVector(pos.x, pos.y);
  this.dir = p.createVector(dir.x, dir.y);
  this.len = len;
  this.color = color;
  this.acc = p.createVector(0, -g);

  // Update fonction
  this.update = function (pos, vel) {
    this.pos = pos;
    this.dir = vel;
  };

  // Draw Function
  this.display = function () {
    // Convert pos to pixels and dir to pixels/s
    let cpos = coordConv(p, this.pos);
    let cdir = velConv(p, this.dir);
    // Draw arrow using function
    this.drawArrow(
      cpos,
      cdir.copy().setMag(velMagNorm * scaleFactor),
      color,
      graphic
    );
  };

  // draw an arrow for a vector at a given base position
  //
  // Taken from https://p5js.org/reference/#/p5.Vector/magSq
  //
  // base = base position in pixels (must be a p5.vector)
  // vec = vector in pixels (must be a p5.vector)
  // graphic: renderer object where to draw arrow
  //
  this.drawArrow = function (base, vec, myColor, graphic) {
    p.push();
    p.stroke(myColor);
    p.strokeWeight(0.2 * scaleFactor);
    p.fill(myColor);
    p.translate(base.x, base.y);
    p.line(0, 0, vec.x, vec.y);
    p.rotate(vec.heading());
    let arrowSize = 0.5 * scaleFactor;
    p.translate(vec.mag() - arrowSize, 0);
    p.triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
    p.pop();
  };
}
