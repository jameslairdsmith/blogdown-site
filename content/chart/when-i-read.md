+++
# Date this page was created.
date = 2016-04-27T00:00:00

# Project title.
#title = "When I read"

# Project summary to display on homepage.
summary = "A summary of my reading times"

# Optional image to display on homepage (relative to `static/img/` folder).
image_preview = "my_reading_chart.png"

# Tags: can be used for filtering projects.
# Example: `tags = ["machine-learning", "deep-learning"]`
tags = ["Personal"]

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
    <h3 align="left" id="readhead">When I read</h3>
    <p align="left" id="readsubhead">Proportion of my Kindle annotations&#8224;</p>
</div>

<div id="readvis" align="center"></div>
<p align="left" id="readsource">&#8224;Includes highlights, bookmarks and comments.</p> 

<script type="text/javascript">

width = document.getElementById("readvis").offsetWidth;

maxWidth = 660;

getWorkingWidth = function(width,maxWidth){if(width < maxWidth)
                                          {return width}
                                          else {return maxWidth}};
                                          
plotWidth = getWorkingWidth(width, maxWidth);

aspectRatio = 0.75;

plotMaxHeight = 350;

plotHight =  Math.max(aspectRatio * plotWidth, plotMaxHeight);

leftMargin = (width - plotWidth)/2;

rightMargin = leftMargin;

document.getElementById("readhead")
    .setAttribute(
      "style",`
      margin-top: 0;
      margin-left: ${leftMargin}px;
      margin-right: ${rightMargin}px`);
      
document.getElementById("readsubhead")
    .setAttribute(
      "style",`
      margin-left: ${leftMargin}px;
      margin-right: ${rightMargin}px;
      font-style: italic;
      //margin-bottom: 0;
      text-align:left;`);
      
document.getElementById("readsource")
    .setAttribute(
      "style", `
      margin-left: ${leftMargin}px; 
      margin-right: ${rightMargin}px;
      font-size: 0.5rem;
      color: #696969;
      //margin-bottom: 0; 
      text-align:left;`);
      
document.getElementById("readvis")
    .setAttribute(
      "style", `
      margin-left: ${leftMargin}px; 
      margin-right: ${rightMargin}px;
      margin-top: 0;
      // font-size: 0.7rem;
      // color: #696969;
      // margin-bottom: 0; 
      //text-align:right;`
);

el = document.getElementById('readsubhead');

style = window.getComputedStyle(el, null).getPropertyValue('font-size');

fontFamily = window.getComputedStyle(el, null).getPropertyValue('font-family');

subFontSize = parseFloat(style); 

yAxis = {title: null,
         //tickCount: 4,
         ticks: false,
         domain:false,
         labelFontSize: subFontSize - 3,
         labelFont: fontFamily,
         labelPadding: 5,
         orient: "left",
         grid: true,
         format: "%"};
         
xAxis = {title: null,
         grid: false,
         format: "%-I %p",
         labelFontSize: subFontSize - 3,
         labelFont: fontFamily,
         maxExtent: 40,
         orient: "bottom",
         minExtent: 40,
         labelPadding: 12,
         titleFontSize: subFontSize - 3,
         titleFont: fontFamily,
         titlePadding: -4,
         domain:false,
         ticks: false};
         
colorLegend = {orient: "none", 
               title: null,
               direction: "horizontal",
               padding: 0,
               titlePadding: 0,
               labelFont: fontFamily,
               legendX : -25,
               legendY: -15,
               titleFontSize: subFontSize - 3,
               labelFontSize: subFontSize - 3};

plot = {
  "$schema": "https://vega.github.io/schema/vega-lite/v4.json",
  "data": { "url": "https://gist.githubusercontent.com/jameslairdsmith/2681e69a86b96beb73d46f1f69a12b72/raw/7543131d5304c5ccbb349949f675219307bcc84c/my_hourly_reading_counts.csv",
  "format": {
      "parse": {"added_hour": "utc:'%H:%M:%S'"}
    }
    },
  padding: {"left": 0, "top": 0, "right": 0, "bottom": 0},
  width: plotWidth/1.5,
  height: plotHight/2.5,
  //autosize: {
  //      type: "none",
  //      contains: "content"
  //    },
  "config": {"view": {"stroke": "transparent"}},
  "transform": [
    {"calculate": "datum.is_weekend == 'TRUE' ? 'Weekends' : 'Weekdays'",
     "as": "is_weekend"},
    {"calculate": "toNumber(datum.n)", "as": "n"},
    {"joinaggregate": [{
          "op": "sum",
          "field": "n",
          "as": "totalN"
        }],
        "groupby": ["is_weekend"]
      },
    {"calculate": "(datum.n/datum.totalN)", "as": "my_density"}
  ],
  "mark": "bar",
  "encoding": {
    "row": {"field": "is_weekend", 
            "sort": "descending",
            "header": {"title": null,
                       "labelOrient": "right",
                       "labelAnchor":"middle",
                       labelFont: fontFamily,
                       labelFontSize: subFontSize - 3,
                       "labelAngle": 0,
                       "labelAlign":"right",
                       "labelPadding": 10},
            "type": "nominal"},
    "y": {
      "field": "my_density", "type": "quantitative",
      "aggregate": "sum",
      "axis": yAxis
    },
    "x": {"field": "added_hour",
          "axis": xAxis,
          "timeUnit": {"unit" :"hoursminutes",
                       "step": 30},
          "type": "temporal"},
    "color": {
      "legend": colorLegend,
      "field": "reading_type", "type": "nominal",
      "scale": {"range": ["#4d4d4d", "#b1b1b1"]}
    }
  }
}

opt = ({
      "actions": false,
      "tooltip": false
    });
    
vegaEmbed("#readvis", plot, opt);


</script>

</body>

</html>


[^0]: Some footnote.

