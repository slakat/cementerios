var margin = {top: 80, right: 20, bottom: 20, left: 50},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var y = d3.scale.ordinal().rangeRoundBands([0, height], .3);

var x = d3.scale.linear().rangeRound([0, width]);

var xAxis = d3.svg.axis()
    .scale(x)
    .tickFormat(d3.format(",alertas"))
    .orient("top");

var yAxis = d3.svg.axis()
    .scale(y)
    .tickSize(0)
    .orient("left");

var color = d3.scale.ordinal()
    .range(["#d73027","#f46d43","#fdae61","#a6d96a","#66bd63","#1a9850"]);

var svg = d3.select('#comunas').append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.csv("datos-comunas.csv", function(error, data) {
  
  var rateNames = d3.keys(data[0]).filter(function(key) { return key !== "Regiones"; });
  var rowsNames = data.map(function(d) { return d.Regiones; });
  var neutralIndex = Math.floor(rateNames.length/2);
  
  color.domain(rateNames);
  
  data.forEach(function(row) {
    row.total = d3.sum(rateNames.map(function(name) { return +row[name]; }));
    rateNames.forEach(function(name) { row['relative'+name] = (row.total !==0 ? +row[name]/row.total : 0); });

    var x0 = -1 * d3.sum(rateNames.map(function(name,i) { return i < neutralIndex ? +row['relative'+name] : 0; }));
    if (rateNames.length & 1) x0 += -1 * row['relative' + rateNames[neutralIndex] ]/2;   
    var idx = 0;
    
    row.boxes = rateNames.map(function(name) { 
      return {name: name, x0: x0, x1: x0 += row['relative'+name], total: row.total, absolute: row[name]}; 
    });
  });

  var min = d3.min(data, function(d) { return d.boxes["0"].x0; });
  var max = d3.max(data, function(d) { return d.boxes[d.boxes.length-1].x1; });

  x.domain([min, max]).nice();
  y.domain(rowsNames);

  svg.append("g")
     .attr("class", "x axis")
     .call(xAxis);

  svg.append("g")
     .attr("class", "y axis")
     .call(yAxis);

  var rows = svg.selectAll(".row")
      .data(data)
    .enter().append("g")
      .attr("class", "bar")
      .attr("transform", function(d) { return "translate(0," + y(d.Regiones) + ")"; })
      .on("mouseover", function(d) {
        svg.selectAll('.y').selectAll('text').filter(function(text) { return text===d.Regiones; })
            .transition().duration(100).style('font','15px sans-serif');
      })
      .on("mouseout", function(d) {
        svg.selectAll('.y').selectAll('text').filter(function(text) { return text===d.Regiones; })
            .transition().duration(100).style('font','10px sans-serif');
      });

  var bars = rows.selectAll("rect")
      .data(function(d) { return d.boxes; })
      .enter().append("g");

  bars.append("rect")
      .attr("height", y.rangeBand())
      .attr("x", function(d) { return x(d.x0); })
      .attr("width", function(d) { return x(d.x1) - x(d.x0); })
      .style("fill", function(d) { return color(d.name); });

  bars.append("text")
    .attr("x", function(d) { return x(d.x0); })
    .attr("y", y.rangeBand()/2)
    .attr("dy", "0.5em")
    .attr("dx", "0.5em")
    .style("text-anchor", "begin")
    .text(function(d) { return d.absolute !== 0 && (d.x1-d.x0)>0.04 ? d.absolute : "" });

  svg.append("g")
      .attr("class", "y axis")
    .append("line")
      .attr("x1", x(0))
      .attr("x2", x(0))
      .attr("y2", height);

  var legend = svg.selectAll(".legend")
      .data(rateNames)
    .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function(d, i) { return "translate(" + width/rateNames.length * i + ",-55)"; });

  legend.append("rect")
        .attr("x", 0)
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", color);

  legend.append("text")
        .attr("x", 22)
        .attr("y", 9)
        .attr("dy", ".35em")
        .style("text-anchor", "begin")
        .text(function(d) { return d; });

});

