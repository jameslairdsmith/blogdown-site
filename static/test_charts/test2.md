+++
# Date this page was created.
date = 2020-06-05T00:00:00

# Project title.
#title = "Sanctions hammer Iran's economy"

# Project summary to display on homepage.
summary = "Test2"

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
</head>

<style>
#observablehq-661e032d {
  width: 100%;
  margin: auto;
  background: #ccc;
}

</style>
<body>

<div id="observablehq-661e032d"></div>

<script type="module">

import {Runtime, Inspector} from "https://cdn.jsdelivr.net/npm/@observablehq/runtime@4/dist/runtime.js";

import define from "https://api.observablehq.com/@jameslairdsmith/charting-with-vega-lite.js?v=3";

const inspect = Inspector.into("#observablehq-661e032d");

(new Runtime).module(define, name => name === "res" ? inspect() : undefined);

</script>

</body>
</html>

some text