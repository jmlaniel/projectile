// Projectile simulator
//
// Libraries used : p5.js
//
// Jacques M. Laniel, june 2021
//
//
// Global Variables
//
// Simulation control variable : 'setup', 'running', 'stop'
let simPhase = "setup";
// Scene dimensions
let sceneWidth = 50; // In meters
let sceneHeight;
let scaleFactor;
// Setup animation/plot canvas screen fraction
let scrFrac = 0.7;
// Ground variables
let grndThickness = 1;
let grndColor = "green";
// Projectile variables
let r = 0.5;
let v = 10;
let angle = 45;
let projectileColor = "red";
// Velocity vector variables
let velMagNorm = 2;
let vectorColor = "Blue";
// Physics constants
let g = 9.81;
// Time variables
let t = 0;
let fps = 30;
let dt = 1e-2;

// Create p5 instances for top and bottom sketches
let animP5 = new p5(topSketch, "topSketch");
let plotP5 = new p5(bottomSketch, "bottomSketch");
