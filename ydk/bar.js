



// set the dimensions and margins of the graph
var margin = {top: 30, right: 30, bottom: 70, left: 60};


    // width = 460 - margin.left - margin.right,
    // height = 400 - margin.top - margin.bottom;

// set the dimensions and margins of the graph
if (window.screen.width < 480) {
    console.log("small");
    width = window.screen.width - 10 - margin.left - margin.right;
    height = 420 - - margin.top - margin.bottom;
} else {
    console.log("big");
    width = 440 - margin.left - margin.right;
    height = 380 - margin.top - margin.bottom;
}


// append the svg object to the body of the page
var svg = d3.select("#bar")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");


var data = new Array({Subset: "Curaçaoan Articles", Value: 0.0057},
                  {Subset: "Dutch Articles", Value: 0.0025},
                  {Subset: "All Articles", Value: 0.0087});

console.log(data);

// X axis
var x = d3.scaleBand()
  .range([ 0, width ])
  .domain(data.map(function(d) { return d.Subset; }))
  .padding(0.2);
svg.append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x))
  .attr("class", "axisWhite")
  .selectAll("text")
    // .attr("transform", "translate(-10,0)rotate(-45)")
    // .style("text-anchor", "end");

// Add Y axis
var y = d3.scaleLinear()
  .domain([0, 0.01])
  .range([ height, 0]);
svg.append("g")
.attr("class", "axisWhite")
  .call(d3.axisLeft(y));

    // text label for the y axis
  svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x",0 - (height / 2))
      .attr("dy", "1em")
      .attr("fill", "white")
      .style("text-anchor", "middle")
      .text("Sentiment Score");  

// Bars
svg.selectAll("bar")
  .data(data)
  .enter()
  .append("rect")
    .attr("x", function(d) { return x(d.Subset); })
    .attr("y", function(d) { return y(d.Value); })
    .attr("width", x.bandwidth())
    .attr("height", function(d) { return height - y(d.Value); })
    .attr("fill", "rgba(129, 140, 248)")
