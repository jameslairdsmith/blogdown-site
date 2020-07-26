+++
# Date this page was created.
date = 2020-01-03T00:00:00

# Project title.
#title = "Languages are similarly efficienct"

# Project summary to display on homepage.
summary = "Despite their wide differences, human languages convey information at similar rates"

# Optional image to display on homepage (relative to `static/img/` folder).
image_preview = "language_efficiency_chart.png"

# Tags: can be used for filtering projects.
# Example: `tags = ["machine-learning", "deep-learning"]`
tags = ["Language"]

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
    <h3 align="left" id="irangdphead">Talking, fast and slow</h3>
    <p align="left" id="irangdpsubhead">Speech rate, syllables per second*</p>
</div>

<div id="irangdpvis" align="center"></div>
<p align="left" id="irangdpnote">*Median value of observations</p> 
<p align="left" id="irangdpsource">Source: "Different languages, similar encoding efficiency: Comparable information rates across the human communicative niche" by Christophe Coupé, Yoon Mi Oh, Dan Dediu, and François Pellegrino, Science Advances (2019)</p> 

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
      
document.getElementById("irangdpnote")
    .setAttribute(
      "style", `
      margin-left: ${leftMargin}px; 
      margin-right: ${rightMargin}px;
      font-size: 0.5rem;
      color: #696969;
      margin-bottom: 0; 
      text-align:left;`);
      
document.getElementById("irangdpsource")
    .setAttribute(
      "style", `
      margin-left: ${leftMargin}px; 
      margin-right: ${rightMargin}px;
      font-size: 0.5rem;
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

url_string = "https://gist.githubusercontent.com/jameslairdsmith/93a37c9670ec09d0da2282f3be6b3b05/raw/528736704c2a9dc8c677136a2896c2883e419189/language-complexity-summary.csv";

myData = {"url": url_string};

lineMark = {
      "mark": {
        "type": "line",
        "color": "firebrick"
      },
      "transform": [
        {
          "regression": "SR",
          "on": "ID"
        }
      ],
      "encoding": {
        "x": {
          "field": "ID",
          "type": "quantitative"
        },
        "size": {"value": 2},
        "color": {"value": "black"},
        "y": {
          "field": "SR",
          "type": "quantitative"
        }
      }
    };
    
plot = {
  "$schema": "https://vega.github.io/schema/vega-lite/v4.json",
  "width": plotWidth,
  "height": plotHight,
  autosize: {
        type: "fit",
        contains: "padding"
      },
  "config": {"view": {"stroke": "transparent"}},
  "data": myData,
  "layer":[lineMark,
    {"mark": "circle"},
          {
    "mark": {
      "type": "text",
      "align": "left",
      "font": fontFamily,
      "fontSize": subFontSize - 3,
      "baseline": "middle",
      "dx": 0
    },
    "encoding": {
      "x": {"field": "x-lab"},
      "y": {"field": "y-lab"},
      "color": {"value": "black"},
      "size":{"value": subFontSize - 3},
      "text": {"field": "language-name", "type": "nominal"}
    }
  }],
  "encoding": {
    "size":{"value": 200},
    "x": {"field": "ID", 
          "type": "quantitative",
          "axis": {"grid": false,
                   "labelFontSize": subFontSize - 3,
                   "labelFont": fontFamily,
                   labelPadding: 6,
                   tickCount: 6,
                   titleFontSize: subFontSize - 3,
                   titleFont: fontFamily,
                   titlePadding: 12,
                  "title": "Information density*"},
          "scale": {"zero": false}
         },
    "y": {"field": "SR",
          "type": "quantitative",
          "axis": {"grid": false,
                   "labelFontSize": subFontSize - 3,
                   "labelFont": fontFamily,
                   "title": null},
         "scale": {"zero": false}
         },
    "color": {"field": "simple-family-name",
              "sort": ["Indo-European", 
                       "Sino-Tibetan", 
                       "Uralic",
                       "Language isolate",
                       "Other"],
              "type": "nominal",
             "legend":{"orient":"none",
                      "legendX": plotWidth-rightMargin-140,
                      "legendY": -10,
                      //"direction": "vertical",
                      "gridAlign": "none",
                      "labelFontSize": subFontSize - 5,
                      "labelFont": fontFamily,
                      "titleFontSize": subFontSize - 3,
                      "titleFont": fontFamily,
                      "titlePadding": 10,
                      "titleFontWeight": 900,
                      "title": "Language family"}}
  }
  //"signals": [tooltipSignal],
  //"scales": [xScale, yScale],
  //"axes": [xAxis, yAxis],
  //"marks": [rectMark, textMark]
}


opt = ({
      "actions": false,
      "tooltip": false
    });
    
vegaEmbed("#irangdpvis", plot, opt);


</script>

</body>

</html>
