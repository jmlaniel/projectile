// p5.js top sketch (animation and controls)
//
// Jacques M. Laniel, june 2021
//

let topSketch = function (p) {
  // p5 setup function
  p.setup = function () {
    // Create canvas
    topCanvas = p.createCanvas(p.windowWidth, scrFrac * p.windowHeight);
    // Compute scene height and scaling factors for topcanvas
    sceneDimensions();
    // Setup framerate fps = 1/dt
    p.frameRate(fps);
    // Create ground object
    ground = new Ground(p, grndColor);
    // Create projectile object
    projectile = new Projectile(p, projectileColor, topCanvas);
    // Create arrow object
    arrow = new Arrow(p, projectile.pos, projectile.vel, 5, vectorColor);
    // display gui DOM
    p.velSlider = setupVelSlider(p);
    p.angleSlider = setupAngleSlider(p);
    p.sceneWidthInput = setupSceneWidthInput(p);
    p.sceneTimeStep = setupTimestep(p);
    setupButtons(p);
  };

  // p5 draw function
  p.draw = function () {
    // Set background color
    p.background("LightSkyBlue");
    // Read and set scene width from gui input
    sceneWidth = p.sceneWidthInput.value();
    // Compute scene height and scaling factors for topcanvas
    sceneDimensions();
    // Draw ground
    ground.display(p);
    // update and draw top canvas according to simulation phase state
    switch (simPhase) {
      case "setup":
        // Draw projectile
        projectile.initPos();
        projectile.initVel();
        projectile.display();
        // Draw velocity vector
        arrow.update(projectile.pos, projectile.vel);
        arrow.display();
        break;
      case "running":
        // Update projectile pos and vel
        // projectile.updateEuler();
        projectile.updateRK4();
        // Test for collision
        projectile.collision();
        // Draw projectile
        projectile.display();
        // Draw velocity vector
        arrow.update(projectile.pos, projectile.vel);
        arrow.display();
        // Push data to plots
        pushDataToPlots();
        break;
      case "pause":
        projectile.display();
        arrow.display();
        break;
    }
    // Test if particle exited on the right side of the screen
    projectile.testExitRight();
    // Display Title text
    titleText();
    // Draw slider text
    textSlider(p);
  };

  p.windowResized = function () {
    // Resize canvas
    p.resizeCanvas(p.windowWidth, scrFrac * p.windowHeight);
    // Compute scene height and scaling factors for topcanvas
    sceneDimensions();
  };

  // Function that computes scene heights and scaling factors for topCanvas
  function sceneDimensions() {
    // Compute scene dimensions with respect to topCanvas dimension
    sceneHeight = (sceneWidth * scrFrac * p.windowHeight) / p.windowWidth;
    // Compute scaling factors between meters and pixels
    scaleFactor = p.windowWidth / sceneWidth;
  }

  function titleText() {
    p.textFont("Comic Sans MS");
    p.textSize(16);
    p.textStyle(p.BOLD);
    p.fill("black");
    p.text("Projectile simulation", 16, 22);
  }

  // Push data to all 4 plots
  function pushDataToPlots() {
    // Create label for each points, then push points to each plots.
    // For x, y, vx and vy
    label =
      t.toFixed(2).toString() +
      "s" +
      ", " +
      projectile.pos.x.toFixed(2).toString() +
      "m";
    xPosPlot.points.push(new GPoint(t, projectile.pos.x, label));
    label =
      t.toFixed(2).toString() +
      "s" +
      ", " +
      projectile.pos.y.toFixed(2).toString() +
      "m";
    yPosPlot.points.push(new GPoint(t, projectile.pos.y, label));
    label =
      t.toFixed(2).toString() +
      "s" +
      ", " +
      projectile.vel.x.toFixed(2).toString() +
      "m/s";
    xVelPlot.points.push(new GPoint(t, projectile.vel.x, label));
    label =
      t.toFixed(2).toString() +
      "s" +
      ", " +
      projectile.vel.y.toFixed(2).toString() +
      "m/s";
    yVelPlot.points.push(new GPoint(t, projectile.vel.y, label));
  }
};
