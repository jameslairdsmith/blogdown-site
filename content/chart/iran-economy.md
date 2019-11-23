+++
# Date this page was created.
date = 2016-04-27T00:00:00

# Project title.
#title = "Sanctions hammer Iran's economy"

# Project summary to display on homepage.
summary = "Iran's economy: battered by sanctions"

# Optional image to display on homepage (relative to `static/img/` folder).
image_preview = "iran_gdp_chart.png"

# Tags: can be used for filtering projects.
# Example: `tags = ["machine-learning", "deep-learning"]`
tags = ["Economics"]

# Optional external URL for project (replaces project detail page).
#external_link = "https://jameslairdsmith.github.io/gs/"

# Does the project detail page use math formatting?
math = false

+++
<html>
<head>
  <title>Embedding Vega-Lite</title>
  <script src="https://d3js.org/d3.v5.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/vega@5.7.3"></script>
  <script src="https://cdn.jsdelivr.net/npm/vega-lite@4.0.0-beta.11"></script>
  <script src="https://cdn.jsdelivr.net/npm/vega-embed@6.0.0"></script>
  
</head>

<body>

<div id="headingblock" align="center">
    <h3 align="left" id="irangdphead">Iran's economy: battered by sanctions</h3>
    <p align="left" id="irangdpsubhead">Change in real GDP, annual %</p>
</div>

<div id="irangdpvis" align="center"></div>
<p align="left" id="irangdpsource">Source for data, estimates and forecast: World Bank</p> 

<script type="text/javascript">

width = document.getElementById("irangdpvis").offsetWidth;

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

document.getElementById("irangdphead")
    .setAttribute(
      "style",`
      margin-left: ${leftMargin}px;
      margin-right: ${rightMargin}px`);
      
document.getElementById("irangdpsubhead")
    .setAttribute(
      "style",`
      margin-left: ${leftMargin}px;
      margin-right: ${rightMargin}px;
      font-style: italic;
      //margin-bottom: 0;
      text-align:left;`);
      
document.getElementById("irangdpsource")
    .setAttribute(
      "style", `
      margin-left: ${leftMargin}px; 
      margin-right: ${rightMargin}px;
      font-size: 0.7rem;
      color: #696969;
      //margin-bottom: 0; 
      text-align:left;`);
      
document.getElementById("irangdpvis")
    .setAttribute(
      "style", `
      margin-left: ${leftMargin}px; 
      margin-right: ${rightMargin}px;
      // font-size: 0.7rem;
      // color: #696969;
      // margin-bottom: 0; 
      //text-align:right;`
);

el = document.getElementById('irangdpsubhead');

style = window.getComputedStyle(el, null).getPropertyValue('font-size');

fontFamily = window.getComputedStyle(el, null).getPropertyValue('font-family');

subFontSize = parseFloat(style); 

url_string = "https://raw.githubusercontent.com/jameslairdsmith/iran_worldbank_data/master/current_iran_indicators.csv";

rectDataRaw =  [
  {"start": "2018-06-30", "end": "2020-06-30", "event": "Estimate"},
  {"start": "2020-06-30", "end": "2022-06-15", "event": "Forecast"}
];

eventDates =  [
  {"eventDate": "2016-01-16", "eventDescription": "Nuclear deal implemented \u2192 ", "yVal": "0.12"},
  {"eventDate": "2018-01-11", "eventDescription": "Trump sanctions take effect \u2192 ", "yVal": "-0.0925"}
];

makeGdpPercent = {calculate: "datum.annual_gdp_growth/100", "as": "annual_gdp_growth_perc"};

getTextMidpoint = {calculate: "(datum.start + datum.end)/2", "as": "midPoint"};

makeFirstDateLong = "if(datum.label == '2010', datum.label, timeFormat(datum.value, '%y'))";

yAxis = {title: null,
         tickCount: 8,
         ticks: false,
         domain:false,
         labelFontSize: subFontSize - 3,
         labelFont: fontFamily,
         labelPadding: 5,
         orient: "right",
         grid: true,
         format: "%"};
         
xAxis = {title: "Fiscal year ending",
         grid: false,
         labelExpr: makeFirstDateLong,
         labelFontSize: subFontSize - 3,
         labelFont: fontFamily,
         maxExtent: 40,
         orient: "bottom",
         minExtent: 40,
         labelPadding: 6,
         titleFontSize: subFontSize - 3,
         titleFont: fontFamily,
         titlePadding: -4,
         domain:false,
         ticks: false};
         
yEncoding = {field: "annual_gdp_growth_perc",
              type: "quantitative",
              scale: {domain: [-0.12, 0.15]},
              axis: yAxis};
              
xEncoding = {field: "year",
              axis: xAxis,
              scale: {domain: ["2010-01-01", "2022-01-01"]},
              type: "temporal"};
              
rectLegend = {orient: "top", 
               title: null, 
               labelFont: fontFamily,
               labelFontSize: subFontSize - 3};
               
rectEncoding = {
  x: {field: "start", type: "temporal"},
  x2: {field: "end"},
  fillOpacity: {value: 0.2},
  color: {field: "event",
          type: "nominal",
          scale: {"range": ["#969696", "#c7c7c7"]},
          legend: rectLegend}};
          
textEncoding = {
  x: {field: "midPoint", type: "temporal"},
  y: {value: 60},
  text: {field: "event", type: "nominal"}
};

vLineEncoding = {
  x: {field: "eventDate", type: "temporal"}
};

labelEncoding = {
      x: {field: "eventDate", type: "temporal"},
      y: {field: "yVal", type: "quantitative"},
      text: {field: "eventDescription", 
             legend: null,
             type: "nominal"}
};

barMark = {
      mark: {type: "bar"},
      data: {url: url_string},
      transform: [makeGdpPercent],
      encoding: {
        y: yEncoding,
        x: xEncoding,
        fillOpacity: {value: 1},
        color: {value: "#595959"}}
};

rectMark = {
    mark: {type: "rect"},
    data: {values: rectDataRaw},
    encoding: rectEncoding
};

vLineMark = {
  mark: {type: "rule"},
  data: {values: eventDates},
  encoding: vLineEncoding
};

labelMark = {
  mark: {type: "text",
         font: fontFamily,
         fontSize: subFontSize - 5,
         align: "right"},
  data: {values: eventDates},
  encoding: labelEncoding
};

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
  width: plotWidth,
  height: plotHight,
  autosize: {
        type: "fit",
        contains: "padding"
      },
  layer:[barMark, rectMark, vLineMark, labelMark],
  config: plotConfig
};

opt = ({
      "actions": false,
      "tooltip": false
    });
    
vegaEmbed("#irangdpvis", plot, opt);


</script>

</body>

</html>

Iran's economy will have shrunk by 4.9% over the course of this 
year and by a further 8.7% during 2020[^0], according to estimates 
produced by the World Bank[^1]. The country is reeling in 
the fallout of the Trump administration's decision to withdraw
from the nuclear treaty[^2] it signed in 2015 with the Obama
administration and other world powers. The deal had been a boon
for the Islamic Republic where the lifting of sanctions contributed
to growth of 13.4% during 2017. Once these latest effects
are absorbed, World Bank forecasters predict flat growth of 0.1% 
in 2021 and 1% in 2022.

[^0]: All periods are fiscal year ends.
[^1]: World Bank. (2019). _Iran’s Economic Update_. Retrieved from https://tinyurl.com/upwy79e
[^2]: Formally named the Joint Comprehensive Plan of Action (JCPOA).

