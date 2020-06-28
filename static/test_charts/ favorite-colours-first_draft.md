+++
# Date this page was created.
date = 2020-05-27T00:00:00

# Project title.
#title = "Sanctions hammer Iran's economy"

# Project summary to display on homepage.
summary = "Everyone's favorite colour"

# Optional image to display on homepage (relative to `static/img/` folder).
image_preview = "iran_gdp_chart.png"

# Tags: can be used for filtering projects.
# Example: `tags = ["machine-learning", "deep-learning"]`
tags = ["Colour"]

# Optional external URL for project (replaces project detail page).
#external_link = "https://jameslairdsmith.github.io/gs/"

# Does the project detail page use math formatting?
math = false

+++
<html>
<head>
  <title>Embedding Vega-Lite</title>
  <script src="https://d3js.org/d3.v5.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/vega@5"></script>
  <script src="https://cdn.jsdelivr.net/npm/vega-lite@4"></script>
  <script src="https://cdn.jsdelivr.net/npm/vega-embed@6"></script>
  
</head>

<body>

<div id="headingblock" align="center">
    <h3 align="left" id="colourhead">Everyone's favorite colours</h3>
    <p align="left" id="coloursubhead">Saturation</p>
</div>

<div id="colourvis" align="center"></div>
<p align="left" id="coloursource">Source: survey of Reddit users, 2017</p> 

<script type="text/javascript">

width = document.getElementById("colourvis").offsetWidth;

maxWidth = 630;

getWorkingWidth = function(width,maxWidth){if(width < maxWidth)
                                          {return 1 * width}
                                          else {return maxWidth}};
                                          
plotWidth = getWorkingWidth(width, maxWidth);

aspectRatio = 0.75;

plotMaxHeight = 350;

plotHight =  Math.max(aspectRatio * plotWidth, plotMaxHeight);

leftMargin = (width - plotWidth)/2;

rightMargin = leftMargin;

document.getElementById("colourhead")
    .setAttribute(
      "style",`
      margin-left: ${leftMargin}px;
      margin-right: ${rightMargin}px`);
      
document.getElementById("coloursubhead")
    .setAttribute(
      "style",`
      margin-left: ${leftMargin}px;
      margin-right: ${rightMargin}px;
      font-style: italic;
      //margin-bottom: 0;
      text-align:left;`);
      
document.getElementById("coloursource")
    .setAttribute(
      "style", `
      margin-left: ${leftMargin}px; 
      margin-right: ${rightMargin}px;
      font-size: 0.6rem;
      color: #696969;
      //margin-bottom: 0; 
      text-align:left;`);
      
document.getElementById("colourvis")
    .setAttribute(
      "style", `
      margin-left: ${leftMargin}px; 
      margin-right: ${rightMargin}px;
      // font-size: 0.7rem;
      // color: #696969;
      // margin-bottom: 0; 
      //text-align:right;`
);

el = document.getElementById('coloursubhead');

style = window.getComputedStyle(el, null).getPropertyValue('font-size');

fontFamily = window.getComputedStyle(el, null).getPropertyValue('font-family');

subFontSize = parseFloat(style); 

url_string = "https://gist.githubusercontent.com/jameslairdsmith/0d846a5eb3bc81076e497d522629c2b4/raw/ed154a51b07ab9d8329fb47d7eda862d9199b6a2/fav_colour_data.csv";

yLabelsPad = 0.1

isFlush = true

yLabs = 5

yAxis = {title: null,
         tickCount: yLabs,
         ticks: false,
         domain: false,
         orient: "left",
         labelFontSize: subFontSize - 3,
         labelFont: fontFamily,
         labelFlush: isFlush,
         labelPadding: yLabelsPad,
         labelFontSize: 14,
         grid: false}
         
xLabelsPad = 0.7

myTitlePad = -8.58
         
xAxis = ({title: "Hue",
         grid: false,
         tickCount: yLabs,
         labelFontSize: 14,
         maxExtent: 40,
         orient: "bottom",
         minExtent: 40,
         labelPadding: xLabelsPad,
         titleFontSize: subFontSize - 1,
         titleFont: fontFamily,
         titlePadding: myTitlePad,
         labelFontSize: subFontSize - 3,
         labelFont: fontFamily,
         domain:false,
         ticks: false})
         
sizeLegend =  {title:  ["Proportion", "of responses"],
               orient: "right",
               titlePadding: 10,
               titleFontSize: subFontSize - 3,
               titleFont: fontFamily,
               labelFontSize: subFontSize - 3,
               labelFont: fontFamily,
               offset: 0,
               format: "%"}
         
yEncoding =  {field: "color_saturation",
              type: "quantitative",
              scale: {domain: [-0.05, 1]},
              axis: yAxis}
              
xEncoding = {field: "color_hue",
              axis: xAxis,
              scale: {domain: [-0.05, 1.1]},
              type: "quantitative"}
              
minPointSize = 20

maxPointSize =  1800
              
sizeEncoding =  {field: "prop_total",
                 type: "quantitative",
                 scale: {range: [minPointSize, maxPointSize], 
                         nice: false,
                         clamp: false},
                 legend: sizeLegend}
                 
colorEncoding =  {field: "colour_hex",
                  type: "nominal",
                  scale: null}
          
textEncoding = ({field: "my_label",
                 type: "nominal"})

pointMark = {
      mark: {type: "point", filled: true},
      data: {url: url_string},
      encoding: {
        y: yEncoding,
        x: xEncoding,
        size: sizeEncoding,
        fillOpacity: {value: 100},
        color: colorEncoding} 
}

textMark = ({mark: "text",
            data: {url: url_string},
            fontSize: 20,
            text: "",
            encoding: {text: textEncoding,
                       color: {value: "black"}}
            })

ruleConfig = {
    strokeDash: [6,4],
    color: "grey"
};

barWidthMutiple = 16.5;

barWidth = plotWidth/barWidthMutiple;

plotConfig = {
  bar: {continuousBandSize: barWidth},
  rule: ruleConfig,
  style: {cell: {stroke: "transparent"}}
};

plot = {
  $schema: "https://vega.github.io/schema/vega-lite/v4.json",
  width: plotWidth*0.75,
  height: plotHight*0.9,
  encoding: {y: yEncoding, x: xEncoding, text: textEncoding},
  layer:[pointMark],
  config: plotConfig
}

opt = ({
      "actions": false,
      "tooltip": false
    });
    
vegaEmbed("#colourvis", plot, opt);


</script>

</body>

</html>

The ancient Greek maxium to 'know thyself' becomes much easier with data. 
But data on one's self is suprisingly hard to come by. To make one small inroad
into fixing this, I've gone about extracting all the annotations from my 
Kindle e-reader. This lets me see not just my highlights, bookmarks and 
comments but also when they were made. Plotting these by the time of day they
were created (see chart) gives a retrospective of my reading life.

My weekdays look to be quite regimented, at least during the daytime. The 
noticeable peaks are for commuting and lunch breaks, filled almost exclusively
by news reading. My evenings are more leisurely: with more spread-out reading
of both news and books.

By contrast, weekends are dominated by books rather than news, with reading 
spead over more hours and with more gentle starts to the day. The practice
resumes in the evening after a day of activity. Rarely does my reading strech
past eleven, regardless of the day. All the better to rest and return afresh 
tomorrow.