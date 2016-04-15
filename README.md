[![CRAN_Status_Badge](http://www.r-pkg.org/badges/version/d3rug)](http://cran.r-project.org/package=d3rug)
[![Build Status](https://travis-ci.org/edwindj/d3rug.svg?branch=master)](https://travis-ci.org/edwindj/d3rug)
[![AppVeyor Build Status](https://ci.appveyor.com/api/projects/status/github/edwindj/d3rug?branch=master&svg=true)](https://ci.appveyor.com/project/edwindj/d3rug)

# d3rug: interactive rug plots

d3rug is a R package and function that generates interactive rug plots. 
It is heavily inspired
by the interactive [strip plot of Maarten Lambrechts](http://www.maartenlambrechts.be/portfolio/grafieken/interactieve-strip-plots/).
The interactive plot is a [htmlwidget](http://www.htmlwidgets.org/) 
and thus can be used within 
**RStudio**, **R-markdown** documents and **Shiny** dashboards.

## Install

`d3rug` is currently not available on CRAN but can be installed with `devtools` 

```r
devtools::install_github("edwindj/d3rug")
```

## Use

The package contains one function: `d3rug`.

```r
library(d3rug)
income_by_state <- state.x77[,2]
labels <- names(income_by_state)

d3rug( income_by_state
     , labels    = labels
     , col       = "brown"
     , col_hover ="steelblue"
     , alpha     = 0.4
     )
``` 

generate the following plot (the example shown here is a captured animated gif)
![example of d3rug](README-fig/example.gif)
