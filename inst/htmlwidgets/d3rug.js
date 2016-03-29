HTMLWidgets.widget({

  name: 'd3rug',

  type: 'output',

  factory: function(el, width, height) {
    var svg = d3.select(el)
    .append("svg")
      .attr({ width : width
            , height: height
      })
    ;

    var g_axis = svg.append("g")
    .attr({ "class"    : "x axis"
         ,  "transform": "translate(0,"+25+")"
    });

    var nametip = svg.append("text")
      .attr({ "y" : 20
            , "x" : 5  //default value
            })
      .style({ "font-size" : "18px"
             , "opacity"   : 0
      });
    //var div = d3.select(el).append("div");

    var _options = {values: [], labels: []};

    function renderValue(options){
        _options = options;
        var values = options.values;
        var labels = options.labels;
        var opacity = options.opacity || 0.3;
/*        var width = options.width || width;
        var height = options.height  || height;
*/
        var x = d3.scale.linear()
          .range([5, width-5])
          .domain(d3.extent(values))
          ;

        var x_axis = d3.svg.axis()
          .scale(x)
          ;

        // update the visual axis
        g_axis.call(x_axis);

        var lines = svg.selectAll("line.value").data(values);
        lines.enter()
          .append("line")
            .attr({ "className": "value"
                  , "id"   : function(d, i){return "value_" + labels[i];}
                  , "x1"   : x
                  , "x2"   : x
                  , "y1"   : 50
                  , "y2"   : height
            })
            .style({ "stroke"       : "#2c3b78"
                   , "stroke-width" : 2
                   , "opacity"      : opacity
                   })
            .on("mouseover", function(value, i){
              d3.select(this)
                .transition()
                  .duration(100)
                .attr({ y1: 0 })
                .style({ "stroke-width" : 3
                       , "opacity"      : 1 })
                ;


              var label = labels[i];
              nametip
               .attr({ "text-anchor": function(){
                  return (x(value) > width/2)? "end" : "start";
               }})
               .transition()
                 .duration(100)
               .style({"opacity" : 1})
               .text(label + " " + value)
               .attr({"x" : function(){
                 var _x = x(value);
                 if (_x > width/2){
                   return _x - 5;
                 }
                 return _x + 5;
               }})
               ;
              nametip.text(label);
            })
            .on("mouseout", function(_, i){
              d3.select(this)
               .transition()
                 .delay(100)
               .attr({ "y1" : 50 })
               .style({ "stroke-width" : 2
                      , "opacity"      : opacity
               })
              ;
              nametip
              .transition()
                .delay(100)
              .text("")
              .style({ "opacity":0})
              ;
            })
            ;
    }

    return {
      renderValue: renderValue,
      resize: function(width, height) {
        svg.attr({ width : width
                 , height: height});
      }
    };
  }
});
