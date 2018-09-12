// width and height are already defined by r2d3

var maxWidth = 500; // setting the maximum width of the chart.

var getWorkingWidth = function(width,maxWidth){
                                                if(width < maxWidth)
                                                {return 1 * width}
                                                else{return 500}
                                              };

var workingWidth = getWorkingWidth(width,maxWidth);

//var sideExcess = (width - workingWidth)/2;     // hopefully this is unnessessary 

var div = div.attr("align","center");

var svg = div.append("svg")
                .attr("height",500)
                .attr('width',workingWidth);
                
{var source = svg.append('g').attr('class','ChartSubHeading')
                .append('text')
                .text("Source: City of Cape Town")
                .attr("x",workingWidth)
                .attr("y",height)
                .attr("text-anchor", "end")
                .attr("dominant-baseline","ideographic");}