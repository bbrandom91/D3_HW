// Step 0: Set up our chart
//= ================================
var svgWidth = 960;
var svgHeight = 500;

var margin = { top: 20, right: 40, bottom: 60, left: 50 };

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
var svg = d3
  .select("#svg-area")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // add the tooltip area to the webpage
var tooltip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

d3.csv("data.csv", function(error, myData){
  if (error) throw error;

  //format the data
  myData.forEach(function(data){
    data.poverty = +data.poverty;
    data.healthcare = +data.healthcare;
  });

  //Set the ranges with scaling functions
  var xValue = function(d){return d.poverty;};
  var xScale = d3.scaleLinear().range([0, width]);
  var xMap = function(d){return xScale(xValue(d));};


  var yValue = function(d){return d.healthcare;};
  var yScale = d3.scaleLinear().range([height, 0]);
  var yMap = function(d){return yScale(yValue(d));};

  //Functions to create the axes
  var bottomAxis = d3.axisBottom(xScale);
  var leftAxis = d3.axisLeft(yScale);

  //Step 1: Set up the x-axis and y-axis domains
  var xMax = d3.max(myData, function(data){
    return data.poverty + 2;
  });
  var xMin = d3.min(myData, function(data){
    return data.poverty - 2;
  });


  var yMax = d3.max(myData, function(data){
    return data.healthcare + 2;
  });

  var yMin = d3.min(myData, function(data){
    return data.healthcare - 2;
  });

  // Scale the domain
  xScale.domain([xMin,xMax]);
  yScale.domain([yMin,yMax]);

  // Setup x


  // Step 2: Create plot elements and append to chart
  //= =============================================
  // Add x-axis and y-axis
  svg.append("g")
  .attr("transform", "translate(0, " + height + ")")
  .call(bottomAxis);

  svg.append("text")             
  .attr("transform",
    "translate(" + (width/2) + " ," + (height + margin.top + 20) + ")")
  .style("text-anchor", "middle")
   .text("In Poverty(%)");

  svg.append("g").call(leftAxis);

  svg.append("text")
  .attr("transform", "rotate(-90)")
  .attr("y", 0 - margin.left)
  .attr("x", 0 - height/2)
  .attr("dy","1em")
  .style("text-anchor", "middle")
  .text("Lacks Healthcare(%)");

  //Draw the dots
  svg.selectAll(".dot")
  .data(myData)
  .enter().append("circle")
  .attr("class", "dot")
  .attr("r", 15)
  .attr("cx", xMap)
  .attr("cy", yMap)
  .style("fill", "cyan")
  .on("mouseover", function(d){
    tooltip.transition()
      .duration(200)
      .style("opacity", 0.9);
    tooltip.html(d["state"] + "<br/> Poverty: " + d["poverty"] + "% <br/> healthcare: " + d["healthcare"] + "%"  )
      .style("left", (d3.event.pageX + 5 ) + "px")
      .style("top", (d3.event.pageY - 25 ) + "px");
  })
  .on("mouseout", function(d){
    tooltip.transition()
    .duration(500)
    .style("opacity",0);
  });
console.log(myData);
  //Add the text
  svg.selectAll("value")
  .data(myData)
  .enter().append("text")
  .style("text-anchor", "middle")
  .attr("x", function(d){return xScale(xValue(d))})
  .attr("y", function(d){return yScale(yValue(d) - 0.2)})
  .text(function(d){return d.abbreviation})
  .attr("font-family", "sans-serif")
  .attr("font-size", "11px")
  .attr("fill", "black");

});