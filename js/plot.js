// plotSketch
//
// Jacques M. Laniel, June 2021
//
// Library used : p5.js and grafica.js
//
// index : index for horizontal position
//      Must be 0, 1, 2 or 3
//
function Plot(p, index, xlabel, ylabel, title) {
  let plot = [];
  this.index = index;
  this.points = [];
  this.xlabel = xlabel;
  this.ylabel = ylabel;
  this.title = title;

  // Create the plot
  plot = new GPlot(p);
  // Set the plot title and the axis labels
  plot.setPoints(this.points);
  plot.getXAxis().setAxisLabelText(this.xlabel);
  plot.getYAxis().setAxisLabelText(this.ylabel);
  plot.setTitleText(this.title);
  //Set points size
  plot.setPointSize(4);
  // Activate point labels
  plot.activatePointLabels();

  // Draw Function
  this.display = function () {
    // Set plot outer dimension to fit canvas
    plot.setOuterDim(p.windowWidth / 4, (1 - scrFrac) * p.windowHeight);
    // Set position
    plot.setPos((this.index * p.windowWidth) / 4, 0);
    // Set the points
    plot.setPoints(this.points);
    // Draw plot
    plot.beginDraw();
    plot.drawBox();
    plot.drawXAxis();
    plot.drawYAxis();
    plot.drawTitle();
    plot.drawGridLines(GPlot.BOTH);
    plot.drawLabels();
    plot.drawPoints();
    plot.endDraw();
  };
}
