# Next up

* Consider downgrading postcss below 1.0.0 to see if that fixes sourcemaps etc.
* Show median on the time by date graph?
* Tag vis (network graph with circles?)
  * https://bl.ocks.org/jmcmurry/361baa73ad989048be54f9114f2f13c8 but restricted viewport like https://observablehq.com/@d3/disjoint-force-directed-graph
  * Possibly animating to horizontal mirrored area graphs with date on the x axis, although this may be weird with overlaps or lots of tags
* Description/links exploration
  * Display on hover for time by date chart? Make this zoomable?...
  * Or otherwise consider a little fact card that pops up and says all its info:
    * Little time of day plot with duration
    * Sun, Feb 9, 2020
    * Description with links
    * Tags
    * Arrows for next day and prev day, and if there's no data then put a sad message in there
* Consider days of the week graph vs time if it seems interesting, although it may be boring as a bar chart. Maybe it could animate between time (bar chart) and time of day (multiple mirrored area charts)
