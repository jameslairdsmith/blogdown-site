
function wrap(text, width) {
  text.each(function() {
    var text = d3.select(this),
        words = text.text().split(/\s+/).reverse(),
        word,
        line = [],
        lineNumber = 0,
        lineHeight = 1, // ems
        y = text.attr("y"),
        dy = parseFloat(text.attr("dy")),
        tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
    while (word = words.pop()) {
      line.push(word);
      tspan.text(line.join(" "));
      if (tspan.node().getComputedTextLength() > width) {
        line.pop();
        tspan.text(line.join(" "));
        line = [word];
        tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
      }
    }
  });
}

var title = svg.append("g")
      .attr('class','head2')
      .append('text')
      //.attr("transform", "translate(0,25)")
      //.attr("y",25)
      .attr("dy", "1")
      .text("Rainfall at Cape Town International Airport")
      .call(wrap, width);
      
//title.attr("y",title.node().getBBox().height)
//    .attr("x",0)
//    .attr("text-anchor", "start");

//title.attr("y",25);
    
    
var subtitle = svg.append("g").attr('class','axisRed').append('text')
      .text("Percent difference from ten year average");
      
subtitle.attr("y",subtitle.node().getBBox().height + title.node().getBBox().height*1.1)
    .attr("x",0)
    .attr("text-anchor", "start");

//

// width already exists.

var totalWidth = document.getElementsByTagName('body')[0].offsetWidth;

var remainder = totalWidth - width;

marginSpace = Math.max(0.1 * width, remainder);

var excess = Math.max(0.25 * width, width - 500);



var margin = ({
  top: 20 + title.node().getBBox().height*1.1 + subtitle.node().getBBox().height*1.1, 
  right: excess/2, 
  bottom: 30, 
  left: excess/2
  });

var parseTime = d3.timeParse("%Y-%m-%d");

var dataLength = function(d) {return d.length};

var barWidth = ((width - excess)*0.8)/dataLength(data);

var customDateTicks = width * 0.015;

var x = d3.scaleTime()
    .domain(d3.extent(data, d => parseTime(d.date)))
    .range([margin.left, width - margin.right]);
    
var y = d3.scaleLinear()
    .domain([d3.min(data, d => d.avrPrcpPct), d3.max(data, d => d.avrPrcpPct)]).nice()
    .range([height - margin.bottom, margin.top]);
    
        
var xAxis = g => g
  .attr("transform", `translate(${barWidth/2},${height - margin.bottom + margin.bottom*0.2})`)
  .call(d3.axisBottom(x).tickSizeOuter(0).tickSize(0).ticks(customDateTicks))
  .call(g => g.select(".domain").remove());
        
var yAxis = g => g
    .attr("transform", `translate(${margin.left - margin.left*0.2},0)`)
    .call(d3.axisLeft(y))
    .call(g => g.select(".domain").remove());
    
chooseBars = function(d){
  if(y(d.avrPrcpPct) < y(0))
  {return y(d.avrPrcpPct)}
  else {return y(0)}
};

svg.append("g")
      .attr("fill", "steelblue")
    .selectAll("rect").data(data).enter().append("rect")
      .attr("x", d => x(parseTime(d.date)))
      //.attr("y", d => y(d.avrPrcpPct))
      .attr("y", chooseBars)
      .attr("height", d => Math.abs(y(0)-y(d.avrPrcpPct)))
      .attr("width", barWidth);
  
svg.append("g").attr("class", "axisRed")
      .call(xAxis);
  
svg.append("g").attr("class", "axisRed")
      .call(yAxis);
      
      

      

//var title = svg.append("g").attr('class','h1').append('text')
//    .text("A Rainfall Title");

//title.attr("y",title.node().getBBox().height)
//    .attr("x",5)
//    .attr("text-anchor", "start");


//var title = svg.append("g").append('h2').text("A Rainfall Title")
//    .attr("y",10)
//    .attr("x",10)
//    .attr("text-anchor", "start");
    

    
//var dims = title.node().getBBox();

var test = svg.append("g").attr('class','footnotes');

test.append('text')
  .text(width)
  .attr("y", height)
  .attr("x", width)
  .attr("text-anchor", "end");