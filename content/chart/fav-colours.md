+++
# Date this page was created.
date = 2020-06-05T00:00:00

# Project title.
#title = "Sanctions hammer Iran's economy"

# Project summary to display on homepage.
summary = "Everyone's favorite colour"

# Optional image to display on homepage (relative to `static/img/` folder).
image_preview = "colour-chart.png"

# Tags: can be used for filtering projects.
# Example: `tags = ["machine-learning", "deep-learning"]`
##tags = ["Colour"]

# Optional external URL for project (replaces project detail page).
#external_link = "https://jameslairdsmith.github.io/gs/"

# Does the project detail page use math formatting?
math = false

+++
<html>
<head>
  <title>Embedding Vega-Lite</title>
  <script src="https://cdn.jsdelivr.net/npm/vega@5"></script>
  <script src="https://cdn.jsdelivr.net/npm/vega-lite@4"></script>
  <script src="https://cdn.jsdelivr.net/npm/vega-embed@6"></script>
  <script src="https://cdn.jsdelivr.net/npm/vega-lite-api@0.11.0"></script>
  


<style>
#visContainer {
  width: min(720px, 100%);
  line-height:0;
  margin: auto;
}

#vis {
  width: 100%;
  margin: auto;
}

#visCaption{
  font-size: 50%;
  line-height: 1;
  font-size: 0.6rem;
  color: #696969;
}

#visSubHeading{
  font-style: italic;
  padding-bottom: 100;
  margin-bottom: 2%;
  line-height: 1;
}

#visHeading{
  padding-bottom: "100%";
  line-height: 1;
}

</style>

</head>
<body>

<div id="visContainer">

<div id="headingblock" align="center">
    <h3 align="left" id="visHeading">Everyone's favorite colours</h3>
    <p align="left" id="visSubHeading">Saturation</p>
</div>

<div id="vis"></div>


<p align="left" id="visCaption">Source: survey of Reddit users, 2017</p> 

</div>

<script type="text/javascript">

url_string = "https://gist.githubusercontent.com/jameslairdsmith/0d846a5eb3bc81076e497d522629c2b4/raw/ed154a51b07ab9d8329fb47d7eda862d9199b6a2/fav_colour_data.csv";

el = document.getElementById('visSubHeading');

style = window.getComputedStyle(el, null).getPropertyValue('font-size');

fontFamily = window.getComputedStyle(el, null).getPropertyValue('font-family');

subFontSize = parseFloat(style); 

yAxisSpec = {title: null,
             //tickCount: 5,
             ticks: false,
             domain: false,
             orient: "left",
             labelFontSize: subFontSize - 2,
             labelFont: fontFamily,
             labelFlush: false,
             //labelPadding: -20,
             values: [0, 0.2, 0.4, 0.6, 0.8, 1],
             grid: true};
             
xAxisSpec = {title: "Hue",
             grid: false,
             //tickCount: 5,
             maxExtent: 40,
             orient: "bottom",
             minExtent: 40,
             labelPadding: 20,
             titleFontSize: subFontSize - 1,
             titleFont: fontFamily,
             titlePadding: 5,
             labelFontSize: subFontSize - 1,
             labelFont: fontFamily,
             domain:false,
             values: [0, 0.2, 0.4, 0.6, 0.8, 1],
             ticks: false}
             
width = document.getElementById("vis").offsetWidth;
             
if (width > 450) {
  sizeLegendOrient = "right"
  sizeLegendDirection = "vertical"
  sizeLegendTitle = ["Share of", " responses"]
} else {
  sizeLegendOrient = "top"
  sizeLegendDirection = "horizontal"
  sizeLegendTitle = "Share of responses"
}
    
             
sizeLegend =  {title: sizeLegendTitle,
               titleFontSize: subFontSize - 3,
               titleFont: fontFamily,
               labelFontSize: subFontSize - 3,
               labelFont: fontFamily,
               direction: sizeLegendDirection,
               padding: 0,
               //orient: "none",
               orient: sizeLegendOrient,
               //legendX: 325,
               //legendY: -5.5,
               values: [0.01, 0.05, 0.1, 0.15],
               //offset: 0,
               format: "%"}
               
minPointSize = 20
maxPointSize =  1200
               
sizeScale = {range: [minPointSize, maxPointSize], 
             nice: false,
             clamp: false}
               
autosizeSpec = {type: "fit", 
                resize: true, 
                contains: "padding"}
                
myToolTip = ["colour",
                      "colour_hex", 
                      "prop_total",
                      "color_hue"]
                      
myBetterToolTip = [
      {"field": "colour",
       title: "Colour name",
       "type": "nominal"},
      {"field": "prop_total", 
       "type": "quantitative", 
       format: ".2%", 
       title: "Share of reponses"}
    ]

const plot = vl
        .markPoint({filled: true})
        .data(vl.csv(url_string))
        .encode(
          vl.x()
            .fieldQ("color_hue")
            .scale({domain: [-0.05, 1]})
            .axis(xAxisSpec),
          vl.y()
            .fieldQ("color_saturation")
            .scale({domain: [-0, 1]})
            .axis(yAxisSpec),
          vl.size()
            .fieldQ("prop_total")
            .scale(sizeScale)
            .legend(sizeLegend),
          vl.color()
            .fieldN("colour_hex")
            .scale(null),
          vl.fillOpacity().value(100),
          vl.tooltip(myBetterToolTip)
        )
        .width("container")
        .height(500)
        .autosize("fit")
        .config({style: {cell: {stroke: "transparent"}},
                 background: null})
        .toJSON();



opt = ({
      "actions": false,
      "tooltip": true
    });
    
vegaEmbed("#vis", plot, opt);

//vis.style.transform = "translateY(-20px)";

</script>

</body>

</html>