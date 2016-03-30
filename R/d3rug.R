#' Interactive Rug plot
#'
#' \code{d3rug} creates an interactive rug plot.
#' The rugplot is heavily inspired by the Lambrechts Strip Plot (reference).
#'
#' @param values \code{numeric} with values to be plotted
#' @param labels \code{character} of same lenght as \code{values}. These will be used to
#' annotate a value when hovered.
#' @param color \code{character} with colors. Either a scalar or length of \code{values}.
#' @param alpha transparancy of values which are not hovered or selected.
#' @param unit \code{character} text to be appended to value.
#' @param ... extra parameters
#' @param width width of plot
#' @param height height of plot
#'
#' @import htmlwidgets
#' @export
d3rug <- function( values
                 , labels = names(values)
                 , col = "steelblue"
                 , col_hover = col
                 , alpha = 0.3
                 , unit = NULL
                 , group = NULL
                 , select = NULL
                 , col_select = "red"
                 , main = deparse(substitute(values))
                 , ...
                 , width = "100%"
                 , height = "150px"
                 ) {

  if (is.null(labels)){
    labels <- seq_along(values)
  }

  if (length(col) == 1){
    col <- rep(col, length(values))
  }

  if (length(col_hover) == 1){
    col_hover <- rep(col_hover, length(values))
  }

  # if (!is.logical(select)){
  #   select <- values %in% select
  # }

  if (length(col_select) == 1){
    col_select <- rep(col_select, length(values))
  }

    x = list(
    values      = unname(values),
    labels      = labels,
    colors      = col,
    color_hover = col_hover,
    opacity     = alpha,
    unit        = unit,
    group       = group,
    selected    = select,
    col_select  = col_select,
    ...
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
