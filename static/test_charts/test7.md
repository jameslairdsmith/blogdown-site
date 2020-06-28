+++
# Date this page was created.
date = 2020-06-05T00:00:00

# Project title.
#title = "Sanctions hammer Iran's economy"

# Project summary to display on homepage.
summary = "Test7"

# Optional image to display on homepage (relative to `static/img/` folder).
image_preview = "iran_gdp_chart.png"

# Tags: can be used for filtering projects.
# Example: `tags = ["machine-learning", "deep-learning"]`
## tags = ["Economics", "Politics"]

# Optional external URL for project (replaces project detail page).
#external_link = "https://jameslairdsmith.github.io/gs/"

# Does the project detail page use math formatting?
math = false

+++
<html>
<head>
<title>This is my title.</title>
<script src="https://cdn.jsdelivr.net/npm/vega@5"></script>
<script src="https://cdn.jsdelivr.net/npm/vega-lite@4"></script>
<script src="https://cdn.jsdelivr.net/npm/vega-embed@6"></script>
<script src="https://cdn.jsdelivr.net/npm/vega-lite-api@0.11.0"></script>
</head>

<style>

#visContainer {
  width: min(630px, 100%);
  margin: auto;
  background: red;
}

#vis {
  width: 100%;
  margin: auto;
  background: #ccc;
}

</style>

<body>

<div id="visContainer">

<div id="vis"></div>

</div>

<script type="text/javascript">

myValues = [
            {a: 'A', b: 28},
            {a: 'B', b: 55},
            {a: 'C', b: 43},
            {a: 'D', b: 91},
            {a: 'E', b: 81},
            {a: 'F', b: 53},
            {a: 'G', b: 19},
            {a: 'H', b: 87},
            {a: 'I', b: 52}
          ];

const yourVlSpec = vl
        .markBar()
        .data(myValues)
        .encode(
          vl.x().fieldQ("b"),
          vl.y().fieldN("a"),
          vl.tooltip(["b", "a"])
        )
        .width("container")
        .height(200)
        .autosize("fit")
        .toJSON();
      
opt = ({
  "actions": false,
  "tooltip": false
});
      
vegaEmbed('#vis', yourVlSpec, opt);
      
</script>

</body>

</html>

some text