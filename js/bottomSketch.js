// p5.js sketch
let bottomSketch = function (p) {
  // p5 setup function
  p.setup = function () {
    // Create canvas
    bottomCanvas = p.createCanvas(
      p.windowWidth,
      (1 - scrFrac) * p.windowHeight
    );
    // Setup framerate fps = 1/dt
    p.frameRate(fps);
    // Create plots objects
    xPosPlot = new Plot(p, 0, "t (s)", "x (m)", "X-position vs time");
    yPosPlot = new Plot(p, 1, "t (s)", "y (m)", "Y-position vs time");
    xVelPlot = new Plot(p, 2, "t (s)", "vx (m/s)", "X-velocity vs time");
    yVelPlot = new Plot(p, 3, "t (s)", "vy (m/s)", "Y-velocity vs time");
  };

  p.draw = function () {
    // Set background color
    p.background("white");
    // Update plots
    xPosPlot.display();
    yPosPlot.display();
    xVelPlot.display();
    yVelPlot.display();
  };

  p.windowResized = function () {
    // Resize canvas
    p.resizeCanvas(p.windowWidth, (1 - scrFrac) * p.windowHeight);
  };
};
