// width and height are already defined by r2d3


// ------ Preliminaries ---------------//
{
{
var div = div.attr("align","center").attr("overflow", "visible");   // Setting the div element to centre alignment.

function wrap(text, width) {
  text.each(function() {
    var text = d3.select(this),
        words = text.text().split(/\s+/).reverse(),
        word,
        line = [],
        lineNumber = 0,
        lineHeight = 1.1, // ems
        //y = text.attr("y"),
        //x = text.attr("x"), // change
        dy = parseFloat(text.attr("dy")),
        tspan = text.text(null).append("tspan").attr("x", 0).attr("y", 0).attr("dy", dy + "em");
    while (word = words.pop()) {
      line.push(word);
      tspan.text(line.join(" "));
      if (tspan.node().getComputedTextLength() > width) {
        line.pop();
        tspan.text(line.join(" "));
        line = [word];
        tspan = text.append("tspan")
          .attr("x", 0)
          .attr("y", 0)
          .attr("dy", ++lineNumber * lineHeight + dy + "em")
          .text(word);
      }
    }
  });
}

function getHeight(d){
  return d.node().getBBox().height;
  //return d.node().getBBox().height + title.node().getBoundingClientRect().height;
}

var parseTime = d3.timeParse("%Y-%m-%d");

}

// ------ Resizing of the chart area ---------------//
{
var maxWidth = 600; // setting the maximum width of the chart.

var getWorkingWidth = function(width,maxWidth){
                                                if(width < maxWidth)
                                                {return 1 * width}
                                                else{return maxWidth}
                                              };

var workingWidth = getWorkingWidth(width,maxWidth);
}

// ------ Adding the SVG ---------------//
{
var svg = div.append("svg")
                .attr("height",500)
                .attr('width',workingWidth);
}

// ------ Adding the Background ---------------//
{
  var background = svg.append('rect')
                        .attr("width",workingWidth)
                        .attr("height",height)
                        .attr("fill",d3.rgb(239, 239, 239));
  
  //background.remove();
  
}

// ------ Setting the margins ---------------//
{
  var margin = ({
  top: 0.03 * height, 
  right: 0.02 * workingWidth, 
  bottom: 0.02 * height,
  left: 0.02 * workingWidth
  });
}

}

// ------ Annotations ---------------//
{
// ------ Adding the Title ---------------//
{
  var title = svg.append("g")
      .attr('class','ChartHeading')
      .append('text')
      .attr("dy",0)   // must be specified for the text wrapping function to work.
      .text("Western Cape dam levels are very very very very low.")
      .call(wrap, workingWidth - margin.left - margin.right)
      .attr("transform", `translate(${margin.left},${margin.top})`)
      .attr("dominant-baseline","hanging");
}

// ------ Adding the Subtitle ---------------//
{
  var titlePadding = 1.2;
  
  var subtitle = svg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top + getHeight(title) * titlePadding})`)
      .attr('class','ChartSubHeading')
      .append('text')
      .attr("dy", 0)   // must be specified for the text wrapping function to work.
      .attr("dominant-baseline","hanging")
      .text("Percentage of total capacity")
      .call(wrap, workingWidth - margin.left - margin.right);
}
  
// ------ Adding the Source to the bottom ---------------//
{
  var source = svg.append('g')
                //.attr("transform", `translate(${workingWidth - margin.right},${height - margin.bottom})`)
                .attr('class','Source')
                .append('text')
                .text("Source: City of Cape Town")
                .attr('dy', 0)
                //.attr('dx', -margin.right)
                .attr("text-anchor", "end")
                //.attr("dominant-baseline","ideographic")
                .call(wrap, workingWidth/2 - margin.right);
                
  var source = source
.attr("transform", `translate(${workingWidth - margin.right},${height  - getHeight(source)})`);
}

}

// ------ Data Margins ---------------//
{
  var dataStart = margin.top + getHeight(title) * titlePadding + getHeight(subtitle) * titlePadding;
  
  var dataEnd = margin.bottom + getHeight(source) * titlePadding;
  
  dataMargin = ({
  top:  (margin.top + getHeight(title) * titlePadding + getHeight(subtitle) * titlePadding) * 1.2, 
  right: margin.right * 4, 
  bottom: (margin.bottom + getHeight(source)) * 2.5,
  left: margin.left * 7
  });
  
}

// ------ Scales ---------------//
{
  var x = d3.scaleTime()
    .domain(d3.extent(data, d => parseTime(d.date)))
    .range([dataMargin.left, workingWidth - dataMargin.right]);
    
  var y = d3.scaleLinear()
    .domain([0, 1]).nice()
    .range([height - dataMargin.bottom, dataMargin.top]);
    
    //d3.max(data, d => d.pctFill)
}

// ------ Axes ---------------//
{
var xAxis = g => g
  .attr("transform", `translate(${0},${height - dataMargin.bottom})`)
  .call(d3.axisBottom(x));
        
var yAxis = g => g
    .attr("transform", `translate(${dataMargin.left},0)`)
    .call(d3.axisLeft(y)
      .ticks(4)
      .tickFormat(d3.format(".0%"))
    );


svg.append("g").attr("class", "AxisStyle")
      .call(xAxis);
  
svg.append("g").attr("class", "AxisStyle")
      .call(yAxis);
}

// ------ Draw line ---------------//
{
  var line = d3.area()
    .x(function(d) { return x(parseTime(d.date)); })
    .y1(function(d) { return y(d.pctFill); })
    .y0(function() { return y(0); });
    
  svg.append("path")
           .datum(data)
           //.attr("class", "line")
           .attr("d", line)
           .attr("stroke", "none")
           .attr("fill","grey")
           .attr("transform",`translate(${1.5},${0})`) ;
}

//var box = svg.append("rect").attr("fill","black").attr("x",0).attr("y",0).attr("height", 20).attr("width", 20)

var test = svg.append("text").text(getHeight(title)).attr("x", 20).attr("y", 20);