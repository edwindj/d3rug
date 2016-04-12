library(shiny)
library(d3rug)

shinyApp(
 ui= fluidPage(
   'bla',
  d3rugOutput("rug"),
   "Hello",
  title="hello"
  ),
 server = function(input, output){
  output$rug <- renderD3rug({
    d3rug(state.x77[,2])
  })
 }
)
