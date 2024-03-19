// Projectile object
//
// pos : initial coordinates (in meters)
// vel : initial velocity (in meters/s)
// graphic: renderer object where to draw projectile
//
function Projectile(p, color, graphic) {
  // Define initial position
  this.pos = p.createVector(r, r + grndThickness);
  // Define initial velocity
  this.vel = p.createVector(
    v * Math.cos((angle * Math.PI) / 180),
    v * Math.sin((angle * Math.PI) / 180)
  );
  // Define initial acceleration
  this.acc = p.createVector(0, -g);
  this.color = color;
  this.graphic = graphic;
  // Define dz = [dx, dvx, dy, dvy]
  this.dz = [];

  // Initialize position vector
  this.initPos = function () {
    this.pos = p.createVector(r, r + grndThickness);
  };

  // Initialize velocity vector
  this.initVel = function () {
    this.vel = p.createVector(
      p.velSlider.value() * Math.cos((p.angleSlider.value() * Math.PI) / 180),
      p.velSlider.value() * Math.sin((p.angleSlider.value() * Math.PI) / 180)
    );
  };

  // Initialize position vector
  this.initAcc = function () {
    this.acc = createVector(0, -g);
  };

  // Draw Function
  this.display = function () {
    // Setup projectile properties
    p.noStroke();
    p.fill(this.color);
    // Convert pos to pixels and vel to pixels/s
    let cpos = coordConv(p, this.pos);
    let cvel = velConv(p, this.vel);
    let cr = qtyConv(r);
    p.circle(cpos.x, cpos.y, 2 * cr);
  };

  // Compute next state using Euler
  this.updateEuler = function (p) {
    let z = [this.pos.x, this.vel.x, this.pos.y, this.vel.y];
    // Update z
    this.dz[0] = this.vel.x * dt;
    this.dz[1] = this.acc.x * dt;
    this.dz[2] = this.vel.y * dt;
    this.dz[3] = this.acc.y * dt;
    // Update time
    t += dt;
    // Update position and velocity
    z = math.add(z, this.dz);
    this.pos = { x: z[0], y: z[2] };
    this.vel = { x: z[1], y: z[3] };
  };

  // Compute next state using RK4
  this.updateRK4 = function () {
    let z = [this.pos.x, this.vel.x, this.pos.y, this.vel.y];
    let k1 = f(t, z);
    let k2 = f(t + dt / 2, math.add(z, math.multiply(k1, dt / 2)));
    let k3 = f(t + dt / 2, math.add(z, math.multiply(k2, dt / 2)));
    let k4 = f(t + dt, math.add(z, math.multiply(k3, dt)));
    this.dz = math.add(k1, math.multiply(2, k1), math.multiply(2, k3), k4);
    this.dz = math.multiply(this.dz, dt / 6);
    // Update time
    t += dt;
    // Update position and velocity
    z = math.add(z, this.dz);
    this.pos = p.createVector(z[0], z[2]);
    this.vel = p.createVector(z[1], z[3]);
  };

  // ODE function
  f = function (t, z) {
    return [z[1], 0, z[3], -g];
  };

  this.collision = function () {
    // Flip y velocity of obj1 if there is a collision with obj2
    if (this.pos.y < ground.pos1.y + r) {
      // Compute Y-velocity at collision from velocity at collision detection
      this.vel.y = this.vel.y - (this.acc.y * this.dz[2]) / this.vel.y;
      // Flip Y-velocity for elastic collision
      this.vel.y *= -1;
      // Replace Y-coordinates at boundary
      this.pos.y = ground.pos1.y + r;
    }
  };

  this.testExitRight = function () {
    if (this.pos.x >= sceneWidth) {
      simPhase = "pause";
    }
  };
}
