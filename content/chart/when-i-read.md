+++
# Date this page was created.
date = 2020-05-22T00:00:00

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

<div id="test"></div>

<div id="headingblock" align="center">
    <h3 align="left" id="readhead">When I read</h3>
    <p align="left" id="readsubhead">Proportion of my Kindle annotations&#8224;</p>
</div>

<div id="readvis" align="center"></div>
<p align="left" id="readsource">&#8224;Includes highlights, bookmarks and comments.</p> 

<script type="text/javascript">

width = document.getElementById("test").offsetWidth;

maxWidth = 630;

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
               direction: "vertical",
               padding: 0,
               labelOffset: -20,
               labelAlign: "right",
               titlePadding: 0,
               labelFont: fontFamily,
               //legendX : -25,
               //legendY: -15,
               legendX : plotWidth-40,
               legendY: -30,
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
  width: plotWidth*0.9,
  height: plotHight/2.5,
  //autosize: {
  //      type: "fit",
  //      contains: "padding"
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
            spacing:  30,
            "header": {"title": null,
                       "labelOrient": "top",
                       "labelAnchor":"middle",
                       labelFont: fontFamily,
                       labelFontSize: subFontSize - 3,
                       "labelAngle": 0,
                       labelFontWeight: "bold",
                       "labelAlign":"right",
                       "labelPadding": 0},
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



[^0]: Some footnote.

