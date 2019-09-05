+++
# Projects widget.
widget = "projects"
active = true
#headless = false
date = 2016-04-20T00:00:00

title = "Projects"
subtitle = "My personal projects."

# Order that this section will appear in.
weight = 50

# Content.
# Display content from the following folder.
# For example, `folder = "project"` displays content from `content/project/`.
folder = "project"

[design]
# Choose how many columns the section has. Valid values: 1 or 2.
columns = "2"

# View.
# Customize how projects are displayed.
# Legend: 0 = list, 1 = cards.
view = 1

# Filter toolbar.

# Default filter index (e.g. 0 corresponds to the first `[[filter]]` instance below).
filter_default = 0

# Add or remove as many filters (`[[filter]]` instances) as you like.
# To show all items, set `tag` to "*".
# To filter by a specific tag, set `tag` to an existing tag name.
# To remove toolbar, delete/comment all instances of `[[filter]]` below.
[[filter]]
  name = "All"
  tag = "*"

[[filter]]
  name = "R packages"
  tag = "R packages"

# [[filter]]
#   name = "Other"
#   tag = "Demo"

+++

