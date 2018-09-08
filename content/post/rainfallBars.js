// !preview r2d3 data=read_csv("https://raw.githubusercontent.com/jameslairdsmith/Home_and_dry/master/Rained_out.csv")
//
//

var totalWidth = document.getElementsByTagName('body')[0].offsetWidth;

var width = Math.min(width, totalWidth*0.8);

var margin = ({top: 20, right: 0, bottom: 30, left: 40});

var x = d3.scaleBand()
    .domain(data.map(d => d.year))
    .range([margin.left, width - margin.right])
    .padding(0.1);
    
var y = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.prcp)]).nice()
    .range([height - margin.bottom, margin.top]);
    
var xAxis = g => g
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x)
        .tickSizeOuter(0))
        
var yAxis = g => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y))
    .call(g => g.select(".domain").remove())

svg.append("g")
      .attr("fill", "steelblue")
    .selectAll("rect").data(data).enter().append("rect")
      .attr("x", d => x(d.year))
      .attr("y", d => y(d.prcp))
      .attr("height", d => y(0) - y(d.prcp))
      .attr("width", x.bandwidth());
  
svg.append("g")
      .call(xAxis);
  
svg.append("g")
      .call(yAxis)


svg.selectAll('rect')
  .data(data)
  .enter()
    .append('rect')
      .attr('width', function(d) { return d.prcp * 1; })
      .attr('height', '20px')
      .attr('y', function(d, i) { return i * 22; })
      .attr('fill', "blue");
      
var test = svg.append("g");

test.append('text')
  .text(width)
  .attr("y", height)
  .attr("x", width)
  .attr("text-anchor", "end");