
// setup x
var xValue = function(d) { return d.poverty;},
   xScale = d3.scale.linear().range([0, width]),
   xMap = function(d) { return xScale(xValue(d));},
   xAxis = d3.svg.axis().scale(xScale).orient("bottom");
 
// setup y
var yValue = function(d) { return d.healthcare;},
   yScale = d3.scale.linear().range([height, 0]),
   yMap = function(d) { return yScale(yValue(d));},
   yAxis = d3.svg.axis().scale(yScale).orient("left");

//Import data from csv
d3.csv("./data.csv", function(d){
  return {
    povVals: +d.poverty,
    healthVals: +d.healthcare
  };
}, function(error, data){
  xScale.domain([d3.min(data,xValue)-1, d3.max(data,xValue)+1]);
  yScale.domain([d3.min(data,yValue)-1, d3.max(data,yValue)+1]);

  svg.append("g")
  .attr("class", "x axis")
  .attr("transform", "translate(0," +height+ ")")
  .call(xAxis)
  .append("text")
  .attr("class" "label")
  .attr("x", width)
  .attr("y", -6)
  .style("text-anchor","end")
  .text("poverty");

  svg.append("g")
  .attr("class", "y axis")
  .call(yAxis)
  .append("text")
  .attr("class" "label")
  .attr("transform", "rotate(-90)")
  .attr("y", 6)
  .attr("dy", ".71em")
  .style("text-anchor","end")
  .text("Lacks Healthcare");


}


// Define the dataset
//var booksIReadThisYear = [12, 8, 7, 16, 2, 4, 11];
//var xvals = [1,2,3,4,5];
//var yvals = [1,4,9,16,25];






// Select all elements with the class "bar" (none on page load)
// Bind the booksIReadThisYear dataset to the empty selection
// Run the enter method, which prepares one DOM element for each piece of data with no selected element
// Append one `rect` for each piece of data
// Give each rect a class of bar
// Set the x coordinate to be the value returned from passing the corresponding name into the bandScale function
//svg
//  .selectAll(".bar")
//  .data(booksIReadThisYear)
//  .enter()
//  .append("rect")
 // .attr("class", "bar")
//  .attr("x", function(data, index) {
//    return xBandScale(namesArray[index]);
//  })
//  // Set the y coordinate to be the value returned from passing the data (current books value) into the linearScale function
//  .attr("y", function(data) {
//    return yLinearScale(data);
//  })
//  // Set the width of the bar using the bandWidth method attached to the bandScale function
//  .attr("width", xBandScale.bandwidth())
//  // Set the height of the bar to be the height of the chart minus the size calculated by the linear scale method
//  .attr("height", function(data) {
//    return chartHeight - yLinearScale(data);
//  });
