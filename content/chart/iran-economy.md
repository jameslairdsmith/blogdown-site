+++
# Date this page was created.
date = 2016-04-27T00:00:00

# Project title.
#title = "Sanctions hammer Iran's economy"

# Project summary to display on homepage.
#summary = "A chart showing the effect sanctions against Iran has had on its GDP"

# Optional image to display on homepage (relative to `static/img/` folder).
image_preview = "iran_gdp_chart.png"

# Tags: can be used for filtering projects.
# Example: `tags = ["machine-learning", "deep-learning"]`
tags = ["Economics"]

# Optional external URL for project (replaces project detail page).
#external_link = "https://jameslairdsmith.github.io/gs/"

# Does the project detail page use math formatting?
math = false

# ![](/img/iran_gdp_chart.png)

+++
<head>
  <title>Embedding Vega-Lite</title>
  <script src="https://d3js.org/d3.v5.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/vega@5.7.3"></script>
  <script src="https://cdn.jsdelivr.net/npm/vega-lite@4.0.0-beta.11"></script>
  <script src="https://cdn.jsdelivr.net/npm/vega-embed@6.0.0"></script>
  
<style>
.role-axis-label {
  font-size: 0.9rem;
  fill: "red";
  color: "red";
  }
  
.article-container {
    max-width: 800;
}
</style>

</head>

<body>

<div id="rainblock" align="center">
    <h3 align="left" id="irangdphead">Iran's economy: battered by sanctions</h3>
    <p align="left" id="irangdpsubhead">Change in real GDP, annual %</p>
</div>

<div id="irangdpvis" align="center" class="role-axis-label"></div>
<p align="right" id="irangdpsource">Source: World Bank</p>

<script type="text/javascript">

width = document.getElementById("irangdpvis").offsetWidth;

maxWidth = 800;

getWorkingWidth = function(width,maxWidth){
                                                if(width < maxWidth)
                                                {return 1 * width}
                                                else{return maxWidth}
                                              };
                                              
workingWidth = getWorkingWidth(width, maxWidth);

height = Math.max(2/3 * workingWidth, 350);

leftMargin = (width - workingWidth)/2;

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
      text-align:right;`);
      
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

yourVlSpec = ({
      "$schema": "https://vega.github.io/schema/vega-lite/v4.0.json",
      "width": workingWidth,
      "height": height,
      "autosize": {
        "type": "fit",
        "contains": "padding"
      },
      "description": "A simple bar chart with embedded data.",
      "data":  {"url":"https://raw.githubusercontent.com/jameslairdsmith/iran_worldbank_data/master/current_iran_indicators.csv"},
      "transform": [
          {"calculate": "datum.annual_gdp_growth/100", "as": "annual_gdp_growth2"}
      ],
      "mark": "bar",
      
      "encoding": {
        "x": {"field": "year", "type": "temporal", 
        "axis": {
          "title": null, 
          "labelFontSize": subFontSize-3,
          "labelFont": fontFamily,
          "ticks": false,
          "grid":false,
          "labelExpr": "if(datum.label == '2010', datum.label, timeFormat(datum.value, '%y'))",
          "labelFlush": false,
          "domain":false}},
        "y": {"field": "annual_gdp_growth2", "type": "quantitative", 
        "axis": {
          "title": null,
          "tickCount": 6,
          "labelFontSize": subFontSize-3,
          "labelFont": fontFamily,
          "format":"%",
          "grid":false,
          "tickSize":-workingWidth,
          "tickColor":"white",
          "labelPadding":workingWidth,
          "domain":false}},
        "color": {"value": "grey"}
        },
      "config": {
        "bar": {"continuousBandSize":workingWidth/16},
        "style": {
          "cell": {
              "stroke": "transparent",
            }
          },
        },
    })
    
opt = ({
      "actions": false,
      "tooltip": false
    })
    
vegaEmbed("#irangdpvis", yourVlSpec, opt);

</script>

</body>

