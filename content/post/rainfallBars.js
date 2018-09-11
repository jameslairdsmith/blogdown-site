
// As part of the r2d3 package setup, the width and height properties are already specified.

function wrap(text, width) {
  text.each(function() {
    var text = d3.select(this),
        words = text.text().split(/\s+/).reverse(),
        word,
        line = [],
        lineNumber = 0,
        lineHeight = 0.2, // ems
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
      .attr('class','ChartHeading')
      .append('text')
      //.attr("transform", "translate(0,25)")
      //.attr("y",25)
      .attr("dy", "1")
      .text("Rainfall at Cape Town International Airport")
      .call(wrap, width);
      
var subtitle = svg.append("g").attr('class','ChartSubHeading').append('text')
      .attr("dy", "1")
      .text("Percentage difference from ten-year average");
      
subtitle.attr("y",subtitle.node().getBBox().height + title.node().getBBox().height*1.1)
    //.attr("x",0)
    .attr("text-anchor", "start");

var source = svg.append("g").attr('class','ChartSubHeading');

var source = source.append('text')
  .text("Source: ncdc.noaa.gov")
  .attr("y", height)
  //.attr("x", width)
  .attr("dominant-baseline","ideographic")
  //.attr("dy",-3)
  //.attr("padding-right","100%")
  .attr("text-anchor", "end");
  

var totalWidth = document.getElementsByTagName('body')[0].offsetWidth;

var remainder = totalWidth - width;

marginSpace = Math.max(0.1 * width, remainder);

chooseExcess = function(givenWidth,maxwidth){
  if(givenWidth < maxwidth)
  {return 0.25*givenWidth}
  else {return givenWidth-maxwidth}
};

//var excess = Math.max(0.25 * width, width - 1000);

var excess = chooseExcess(width,400);

var margin = ({
  top: 20 + title.node().getBBox().height*1.1 + subtitle.node().getBBox().height*1.2, 
  right: excess/2 * 1.2, 
  bottom: 30 + source.node().getBBox().height*1.2,
  left: excess/2
  });
  
findHeadingMargin = function(givenWidth,maxWidth){
  if(givenWidth < maxWidth)
  {return 0}
  else {return margin.left*0.6}
};

var headingMargin = findHeadingMargin(width,400);
  
title.attr("transform",`translate(${headingMargin},0)`);

subtitle.attr("transform",`translate(${headingMargin},0)`);

//source.attr("transform",`translate(${width - margin.right},${height})`);



var parseTime = d3.timeParse("%Y-%m-%d");

var dataLength = function(d) {return d.length};

var barWidth = ((width - excess)*0.8)/dataLength(data);

source.attr("x",width - margin.right + barWidth);

var customDateTicks = width * 0.015;

//var customTimeFormat = d3.time.format.multi([
//  ["%YY", function(d) {return if(d.getFullYear()==2007){return d.getFullYear()}{return d.getFullYear().slice//(-2)}}],
//]);

var customTimeFormat = function(d){
  if(d.getFullYear()==2007)
  {return d3.timeFormat("%Y")(d)}
  else {return d3.timeFormat("%y")(d)};
};
    

var x = d3.scaleTime()
    .domain(d3.extent(data, d => parseTime(d.date)))
    .range([margin.left, width - margin.right]);
    
var y = d3.scaleLinear()
    .domain([d3.min(data, d => d.avrPrcpPct), d3.max(data, d => d.avrPrcpPct)]).nice()
    .range([height - margin.bottom, margin.top]);
    
        
var xAxis = g => g
  .attr("transform", `translate(${barWidth/2},${height - margin.bottom + margin.bottom*0.2})`)
  .call(d3.axisBottom(x)
    .tickSizeOuter(0)
    .tickSize(0)
    //.ticks(customDateTicks)
    .tickFormat(customTimeFormat))
    //.tickFormat(d3.timeFormat("%y")))
  .call(g => g.select(".domain").remove());
        
var yAxis = g => g
    .attr("transform", `translate(${margin.left - margin.left*0.2},0)`)
    .call(d3.axisLeft(y)
      .ticks(6)
      .tickSize(-width + excess - barWidth)
      )
    .call(g => g.select(".domain").remove());
    
chooseBars = function(d){
  if(y(d.avrPrcpPct) < y(0))
  {return y(d.avrPrcpPct)}
  else {return y(0)}
};

svg.append("g")
      .attr("fill", "grey")
    .selectAll("rect").data(data).enter().append("rect")
      .attr("x", d => x(parseTime(d.date)))
      //.attr("y", d => y(d.avrPrcpPct))
      .attr("y", chooseBars)
      .attr("height", d => Math.abs(y(0)-y(d.avrPrcpPct)))
      .attr("width", barWidth);
			
  
svg.append("g").attr("class", "AxisStyle")
      .call(xAxis);
  
svg.append("g").attr("class", "AxisStyle")
      .call(yAxis);
      
      



