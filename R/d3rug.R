#' Interactive Rug plot
#'
#' \code{d3rug} creates an interactive rug plot.
#' The rugplot is heavily inspired by the Lambrechts Strip Plot (reference).
#'
#' @import htmlwidgets
#' @export
d3rug <- function(values, labels = names(values), width = NULL, height = 150) {


  if (is.null(labels)){
    labels <- seq_along(values)
  }

  x = list(
    values = unname(values),
    labels = labels
  )

  # create widget
  htmlwidgets::createWidget(
    name = 'd3rug',
    x,
    width = width,
    height = height,
    package = 'd3rug'
  )
}

#' Shiny bindings for d3rug
#'
#' Output and render functions for using d3rug within Shiny
#' applications and interactive Rmd documents.
#'
#' @param outputId output variable to read from
#' @param width,height Must be a valid CSS unit (like \code{'100\%'},
#'   \code{'400px'}, \code{'auto'}) or a number, which will be coerced to a
#'   string and have \code{'px'} appended.
#' @param expr An expression that generates a d3rug
#' @param env The environment in which to evaluate \code{expr}.
#' @param quoted Is \code{expr} a quoted expression (with \code{quote()})? This
#'   is useful if you want to save an expression in a variable.
#'
#' @name d3rug-shiny
#'
#' @export
d3rugOutput <- function(outputId, width = '100%', height = '150px'){
  htmlwidgets::shinyWidgetOutput(outputId, 'd3rug', width, height, package = 'd3rug')
}

#' @rdname d3rug-shiny
#' @export
renderD3rug <- function(expr, env = parent.frame(), quoted = FALSE) {
  if (!quoted) { expr <- substitute(expr) } # force quoted
  htmlwidgets::shinyRenderWidget(expr, d3rugOutput, env, quoted = TRUE)
}
