if (window.screen.width < 480) {
    console.log("small");
    w = window.screen.width - 10;
    h = 420;
} else {
    console.log("big");
    w = 440;
    h = 380;
}

console.log(w);
console.log(h);

// set the dimensions and margins of the graph
var margin2 = {
        top: 10,
        right: 30,
        bottom: 30,
        left: 60
    },
    width2 = w - margin2.left - margin2.right,
    height2 = h - margin2.top - margin2.bottom;


// append the svg object to the body of the page
var svg2 = d3.select("#marianne")
    .append("svg")
    .attr("width", width2 + margin2.left + margin2.right)
    .attr("height", height2 + margin2.top + margin2.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin2.left + "," + margin2.top + ")");

// parse the date / time
var parseTime = d3.timeParse("%Y");

// set the ranges
var x = d3.scaleTime().range([0, width2]);
var y = d3.scaleLinear().range([height2, 0]);

// define the 1st line
var valueline = d3.line()
    .x(function(d) {
        return x(d.date);
    })
    .y(function(d) {
        return y(d.close);
    });

// define the 2nd line
var valueline2 = d3.line()
    .x(function(d) {
        return x(d.date);
    })
    .y(function(d) {
        return y(d.open);
    });

// Get the data
d3.csv("https://raw.githubusercontent.com/boredkyara/karen/master/marianne.csv", function(error, data) {
    if (error) throw error;

    // format the data
    data.forEach(function(d) {
        d.date = parseTime(d.year);
        d.close = +d.marianne;
        d.open = +d.karen;
    });

    // Max value observed:
    const max = d3.max(data, function(d) {
        return +d.open;
    })

    // Scale the range of the data
    x.domain(d3.extent(data, function(d) {
        return d.date;
    }));
    y.domain([0, d3.max(data, function(d) {
        return Math.max(d.close, d.open);
    })]);

    // Set the gradient
    svg2.append("linearGradient")
        .attr("id", "line-gradient")
        .attr("gradientUnits", "userSpaceOnUse")
        .attr("x1", 0)
        .attr("y1", y(0))
        .attr("x2", 0)
        .attr("y2", y(max))
        .selectAll("stop")
        .data([{
            offset: "0%",
            color: "blue"
        }, {
            offset: "100%",
            color: "red"
        }])
        .enter().append("stop")
        .attr("offset", function(d) {
            return d.offset;
        })
        .attr("stop-color", function(d) {
            return d.color;
        });

    // Add the valueline path.
    svg2.append("path")
        .data([data])
        .attr("class", "line")
        .attr("fill", "none")
        .attr("stroke", "white")
        .attr("stroke-width", 1.5)
        .attr("d", valueline);

    // Add the valueline2 path.
    svg2.append("path")
        .data([data])
        // .attr("class", "line")
        .attr("fill", "none")
        .attr("stroke", "rgba(129, 140, 248)")
        .attr("stroke-width", 1.5)
        .attr("d", valueline2);

    // Add the X Axis
    svg2.append("g")
        .attr("transform", "translate(0," + height2 + ")")
        .attr("class", "axisWhite")
        .call(d3.axisBottom(x));

    // Add the Y Axis
    svg2.append("g")
    .attr("class", "axisWhite")
        .call(d3.axisLeft(y));


    // Handmade legend
    // Handmade legend
    svg2.append("circle").attr("cx", 210).attr("cy", 0).attr("r", 6).style("fill", "rgba(129, 140, 248)")
    svg2.append("circle").attr("cx", 210).attr("cy", 30).attr("r", 6).style("fill", "white")
    svg2.append("text").attr("x", 230).attr("y", 0).text("Karen").style("font-size", "15px").style("fill", "white").attr("alignment-baseline", "middle")
    svg2.append("text").attr("x", 230).attr("y", 30).text("Marianne").style("font-size", "15px").style("fill", "white").attr("alignment-baseline", "middle")



});