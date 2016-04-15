library(magrittr)


labels <- rownames(USArrests)
group <- substr(labels, 1, 1)

d3rug( USArrests$UrbanPop
     , labels = labels
     , alpha=0.3
     , col="brown"
     , col_hover="steelblue"
     , unit = "%"
#     , group = group
     )
