
//
//

var totalWidth = document.getElementsByTagName('body')[0].offsetWidth;

var width = Math.min(width, totalWidth*0.8);

// svg.attr("width", width);   // This doesn't seem to work.

var margin = ({top: 20, right: 0, bottom: 30, left: 40});

var parseTime = d3.timeParse("%Y-%m-%d");

var dataLength = function(d) {return d.length};

var barWidth = (width*0.8)/dataLength(data);

var customDateTicks = width * 0.015;


var x = d3.scaleTime()
    .domain(d3.extent(data, d => parseTime(d.date)))
    .range([margin.left, width - margin.right]);
    
var y = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.prcp)]).nice()
    .range([height - margin.bottom, margin.top]);
    
        
var xAxis = g => g
  .attr("transform", `translate(${barWidth/2},${height - margin.bottom + margin.bottom*0.2})`)
  .call(d3.axisBottom(x).tickSizeOuter(0).tickSize(0).ticks(customDateTicks))
  .call(g => g.select(".domain").remove());
        
var yAxis = g => g
    .attr("transform", `translate(${margin.left - margin.left*0.2},0)`)
    .call(d3.axisLeft(y))
    .call(g => g.select(".domain").remove());

svg.append("g")
      .attr("fill", "steelblue")
    .selectAll("rect").data(data).enter().append("rect")
      .attr("x", d => x(parseTime(d.date)))
      .attr("y", d => y(d.prcp))
      .attr("height", d => y(0) - y(d.prcp))
      .attr("width", barWidth);
  
svg.append("g")
      .call(xAxis);
  
svg.append("g")
      .call(yAxis);


var test = svg.append("g");

test.append('text')
  .text(width)
  .attr("y", height)
  .attr("x", width)
  .attr("text-anchor", "end");