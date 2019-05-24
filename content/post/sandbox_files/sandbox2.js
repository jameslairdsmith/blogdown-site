var width = document.getElementById("pppvis2").offsetWidth;
  
    var maxWidth = 550; // setting the maximum width of the chart.
    //var width = 300;

    var getWorkingWidth = function(width,maxWidth){
                                                if(width < maxWidth)
                                                {return 1 * width}
                                                else{return maxWidth}
                                              };

    var workingWidth = getWorkingWidth(width, maxWidth);
    
    var height = Math.max(2/3 * workingWidth, 500)
    
    //var height = 7/10 * workingWidth
  
    
    var leftMargin = (width - workingWidth)/2;
    
    var rightMargin = leftMargin;
    
    document.getElementById("ppphead2")
    .setAttribute(
      "style",`
      margin-left: ${leftMargin}px;
      margin-right: ${rightMargin}px`);
    
    document.getElementById("pppsubhead2")
    .setAttribute(
      "style",`
      margin-left: ${leftMargin}px;
      margin-right: ${rightMargin}px;
      font-style: italic;
      margin-bottom: 10;
      text-align:left;`);
    
    document.getElementById("pppsource2")
    .setAttribute(
      "style", `
      margin-left: ${leftMargin}px; 
      margin-right: ${rightMargin}px;
      font-size: 0.7rem;
      color: #696969;
      //margin-bottom: 0; 
      text-align:right;`);
    
    
    var el = document.getElementById('pppsubhead2');
    var style = window.getComputedStyle(el, null).getPropertyValue('font-size');
    var fontFamily = window.getComputedStyle(el, null).getPropertyValue('font-family');
    var subFontSize = parseFloat(style); 
  
    var yourVlSpec = {
  "$schema": "https://vega.github.io/schema/vega-lite/v3.json",
  "width": workingWidth,
      "height": height,
      "autosize": {
        "type": "fit",
        "contains": "padding"
      },
  "data": {
    "url": "https://gist.githubusercontent.com/jameslairdsmith/68081008a67515d3d565482816d78508/raw/d3acd665c1119def9386b25e4bca903a0038595a/clean_country_ppp.csv"
  },
  "transform": [{"calculate": "datum.ZAF_adj_ppp-0", "as": "ZAF_adj_ppp2"}],
  "mark": "bar",
  "encoding": {
    "x": {
      "field": "ZAF_adj_ppp2",
      "type": "quantitative",
      "scale": {"domain": [-1.5, 9]},
      "axis":{
        "labelFontSize": subFontSize-3,
        "labelFont": fontFamily,
        "title": null
      }
    },
    "y": {
      "field": "country_name",
      "type": "nominal",
      "sort": {"op": "sum", "field": "ZAF_adj_ppp2", "order":"descending"},
      "axis":{
        "labelFontSize": subFontSize-3,
        "labelFont": fontFamily,
        "title": null
      }  
    },
    "color": {
      "field": "continent",
      "type": "nominal",
      "legend": {
        "labelFontSize": subFontSize-3,
        "labelFont": fontFamily,
        "title": null,
        "orient":"bottom-right"
      }
    }
  }
}
    
    var opt = {
      "actions": false,
      "tooltip": false
    }
    vegaEmbed("#pppvis2", yourVlSpec, opt);