// width and height are already defined by r2d3

 // ------ Load scripts ---------------//
 
//var   vega_script = document.createElement('script');
//var   vega_lite_script = document.createElement('script');
//var   vega_embed_script = document.createElement('script');


//vega_script.setAttribute('src','https://cdn.jsdelivr.net/npm/vega@4.2.0');
//vega_lite_script.setAttribute('src','https://cdn.jsdelivr.net/npm/vega-lite@3.0.0-rc6');
//vega_embed_script.setAttribute('src','https://cdn.jsdelivr.net/npm/vega-embed@3.19.2');

//document.head.appendChild(vega_script);
//document.head.appendChild(vega_lite_script);
//document.head.appendChild(vega_embed_script);

vega_explicit = {
  const [Vega, VegaLite] = await Promise.all([
    require("vega@3/build/vega.min.js"),
    require("vega-lite@2/build/vega-lite.min.js")
  ]);
  return async spec => {
    //const div = document.createElement("div");
    const view = new Vega.View(Vega.parse(VegaLite.compile(spec).spec));
    await view.initialize(div).runAsync();
    return div;
  };
};

//div.attr("id", "vis");

vega_explicit({
  data: {url: "https://vega.github.io/vega-lite/data/seattle-weather.csv"},
  mark: "tick",
  encoding: {
    x: {field: "precipitation", type: "quantitative"}
  }
})