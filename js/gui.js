// Gui functions
//
// Gui global variables
let sliderWidth = 150;
let sliderHeight = 6;
let guiXPos = 15;
let guiYPos = 45;
let fontSizeBold = 14;
let fontSizeRegular = 12;
let interLine = 1.2;

//-------------------------------------------------------------------------
// Control functions (running, pause, stop)
//-------------------------------------------------------------------------

// Start Simulation
function simRunning(p) {
  simPhase = "running"; // Set phase to running
  t = 0; // Initialize time
  dt = parseFloat(p.sceneTimeStep.value()); // Initialize timestep
  projectile.initPos(); // Initialize projectile pos vector
  projectile.initVel(); // Initialize projectile vel vector
  xPosPlot.points = []; // Empty x-position plot
  yPosPlot.points = []; // Empty y-position plot
  xVelPlot.points = []; // Empty x-velocity plot
  yVelPlot.points = []; // Empty y-velocity plot
}

// Pause simulation
function simPause(p) {
  switch (simPhase) {
    case "pause":
      simPhase = "running"; // Toggle pause for running
      break;
    case "running":
      simPhase = "pause"; // Toggle running for pause
      break;
  }
}

// Stop Simulation
function simStopping(p) {
  simPhase = "setup"; // Set phase to running
  xPosPlot.points = []; // Empty x-position plot
  yPosPlot.points = []; // Empty y-position plot
  xVelPlot.points = []; // Empty x-velocity plot
  yVelPlot.points = []; // Empty y-velocity plot
}

//-------------------------------------------------------------------------
// Sliders
//-------------------------------------------------------------------------
//
// Setup sliders function
function setupVelSlider(p) {
  // Setup velocity slider from 0 to 100 m/s, with initial value 25 m/s
  let y = 80;
  let minVal = 0;
  let maxVal = 100;
  let initVal = v;
  let stepVal = 1;
  // Create velocity slider object (since slider are in DOM, adjust for canvas position)
  let velSlider = p.createSlider(minVal, maxVal, initVal, stepVal);
  let guidYPos = 1.8 * (fontSizeRegular * interLine);
  velSlider.position(guiXPos, guiYPos + guidYPos);
  velSlider.size(sliderWidth, sliderHeight);
  return velSlider;
}

function setupAngleSlider(p) {
  // Setup angle slider from o to 90 degress, with initial value 45 degrees
  let minVal = 0;
  let maxVal = 90;
  let initVal = angle;
  let stepVal = 0.5;
  // Setup orientation slider object (since slider are in DOM, adjust for canvas position)
  let angleSlider = p.createSlider(minVal, maxVal, initVal, stepVal);
  let guidYPos = sliderHeight + 3.6 * (fontSizeRegular * interLine);
  angleSlider.position(guiXPos, guiYPos + guidYPos);
  angleSlider.size(sliderWidth, sliderHeight);
  return angleSlider;
}

//-------------------------------------------------------------------------
// text
//-------------------------------------------------------------------------

// Setup text function with updated values from sliders
function textSlider(p) {
  // Gui Title
  p.textStyle(p.BOLD);
  p.textFont("Comic Sans MS");
  p.textSize(fontSizeBold);
  p.text("Simulation controls", guiXPos, guiYPos);

  // Gui : initial velocity text
  p.textStyle(p.NORMAL);
  p.textSize(fontSizeRegular);
  let guidYPos = fontSizeBold * interLine;
  p.text(
    "Initial Velocity = " + p.velSlider.value() + " m/s",
    guiXPos,
    guiYPos + guidYPos
  );

  // Gui : initial angle text
  guidYPos = sliderHeight + 3 * (fontSizeRegular * interLine);
  p.text(
    "Initial Angle = " + p.angleSlider.value() + " °",
    guiXPos,
    guiYPos + guidYPos
  );

  // Gui : scene width input text
  guidYPos = 2 * sliderHeight + 5 * (fontSizeRegular * interLine);
  p.text("Scene Width (m)", guiXPos, guiYPos + guidYPos);

  // Gui : time-step in seconds
  guidYPos = 2 * sliderHeight + 6.5 * (fontSizeRegular * interLine);
  p.text("Timestep (s)", guiXPos, guiYPos + guidYPos);

  // Gui : current position title
  guidYPos = 2 * sliderHeight + 8 * (fontSizeRegular * interLine);
  p.textStyle(p.BOLD);
  p.text("Current position and velocity", guiXPos, guiYPos + guidYPos);

  // Gui : current position value
  guidYPos = 2 * sliderHeight + 9 * (fontSizeRegular * interLine);
  p.textStyle(p.NORMAL);
  p.text(
    "x = " +
      projectile.pos.x.toFixed(2) +
      " m        y = " +
      projectile.pos.y.toFixed(2) +
      " m",
    guiXPos,
    guiYPos + guidYPos
  );

  // Gui : current velocity value
  guidYPos = 2 * sliderHeight + 10 * (fontSizeRegular * interLine);
  p.text(
    "vx = " +
      projectile.vel.x.toFixed(2) +
      " m/s   vy = " +
      projectile.vel.y.toFixed(2) +
      " m/s",
    guiXPos,
    guiYPos + guidYPos
  );
}

//-------------------------------------------------------------------------
// Inputs
//-------------------------------------------------------------------------
// Scene width input
function setupSceneWidthInput(p) {
  inputSceneWidth = p.createInput("");
  let guidXPos = 100;
  let guidYPos = 4 * sliderHeight + 3.2 * (fontSizeRegular * interLine);

  inputSceneWidth.position(guiXPos + guidXPos, guiYPos + guidYPos);
  inputSceneWidth.size(50, 22);
  inputSceneWidth.value(sceneWidth);
  return inputSceneWidth;
}
// Scene time step input
function setupTimestep(p) {
  inputTimestep = p.createInput("");
  let guidXPos = 100;
  let guidYPos = 4 * sliderHeight + 4.8 * (fontSizeRegular * interLine);

  inputTimestep.position(guiXPos + guidXPos, guiYPos + guidYPos);
  inputTimestep.size(50, 22);
  inputTimestep.value(dt);
  return inputTimestep;
}

//-------------------------------------------------------------------------
// Buttons
//-------------------------------------------------------------------------
// Setup Run Button
function setupButtons(p) {
  let guidYPos = 9 * sliderHeight + 7.8 * (fontSizeRegular * interLine);
  let buttonLength = 50;
  let buttonHeight = 25;
  // Setup run button object (since slider are in DOM, adjust for canvas position)
  runButton = p.createButton("Run");
  runButton.position(guiXPos, guiYPos + guidYPos);
  runButton.size(buttonLength, buttonHeight);
  runButton.mousePressed(function () {
    simRunning(p);
  });

  // Setup Pause Button
  guidXPos = 1.1 * buttonLength;
  // Setup run button object (since slider are in DOM, adjust for canvas position)
  runButton = p.createButton("Pause");
  runButton.position(guiXPos + guidXPos, guiYPos + guidYPos);
  runButton.size(buttonLength, buttonHeight);
  runButton.mousePressed(function () {
    simPause(p);
  });

  // Setup Stop Button
  guidXPos = 1.1 * buttonLength * 2;
  // Setup stop button object (since slider are in DOM, adjust for canvas position)
  stopButton = p.createButton("Stop");
  stopButton.position(guiXPos + guidXPos, guiYPos + guidYPos);
  stopButton.size(buttonLength, buttonHeight);
  stopButton.mousePressed(function () {
    simStopping(p);
  });
}
