// set the dimensions and margins of the graph
var margin = { top: 50, right: 20, bottom: 250, left: 200 },
  width = 1000 - margin.left - margin.right,
  height = 700 - margin.top - margin.bottom;

// set the ranges
var x = d3.scaleBand()
  .range([0, width])
  .padding(0.1);
var y = d3.scaleLinear()
  .range([height, 0]);

// append the svg object to the body of the page
// append a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var svg = d3.select("body").append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform",
    "translate(" + margin.left + "," + margin.top + ")");

// get the data
d3.csv("./data/pppData.csv").then(function (data) {

  // format the data
  data.forEach(function (d) {
    d.loanAmount = +d.loanAmount;
  });

  // scale the range of the data in the domains
  x.domain(data.map(function (d) { return d.Industry; }));
  y.domain([0, d3.max(data, function (d) { return d.loanAmount; })]);

  // initialize the tool tip
  var toolTip = d3.tip()
    .attr("class", "tooltip")
    .offset([80, -60])
    .html(function (d) {
      return (`<strong>Loan Amount $: ${d.loanAmount}<strong><br> Industry: ${d.Industry}`);
    });

  // create tooltip 
  svg.call(toolTip);

  // append the rectangles for the bar chart
  svg.selectAll(".bar")
    .data(data)

    .enter().append("rect")
    .attr("class", "bar")
    .attr("x", function (d) { return x(d.Industry); })
    .attr("width", x.bandwidth())
    .attr("y", function (d) { return y(d.loanAmount); })
    .attr("height", function (d) { return height - y(d.loanAmount); })
    .on('mouseover', toolTip.show)
    .on('mouseout', toolTip.hide);

  // append title
  svg.append("text")
    .attr("x", (width / 2))
    .attr("y", 0 - (margin.top / 2))
    .attr("text-anchor", "middle")
    .style("georgia", "25px times")
    .attr("font-weight", 700)
    .text("Total Loan Amount per Industry Type");

  // add the x Axis
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
    .attr("y", 0)
    .attr("x", 9)
    .attr("dy", ".35em")
    .attr("transform", "rotate(45)")
    .style("text-anchor", "start")
    .style("georgia", "14px times");

  // add the y Axis
  svg.append("g")
    .call(d3.axisLeft(y));

});





