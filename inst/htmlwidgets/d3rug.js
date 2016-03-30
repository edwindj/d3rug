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

    var x = d3.scale.linear()
      .range([5, width - 5])
      ;

    var nametip = svg.append("text")
      .attr({ "y" : 20
            , "x" : 5  //default value
            })
      .style({ "font-size" : "18px"
             , "opacity"   : 0
      });
    var _options = {values: [], labels: []};

    function renderValue(options){
        _options = options;
        var values = options.values;
        var labels = options.labels;
        var opacity = options.opacity;
        var group = options.group || labels;
        var unit  = options.unit || "";
        var color_hover = options.color_hover;

        var selected_group = null;

        function color(_, i){
          return (group[i] == selected_group)? color_hover[i]: options.colors[i];
        }

        function opac(_, i){
          return (group[i] == selected_group)? 1 : opacity;
        }

        x.domain(d3.extent(values));

        var x_axis = d3.svg.axis()
          .scale(x)
          ;

        // update the visual axis
        g_axis.call(x_axis);

        var lines = svg.selectAll("line.value").data(values);
        lines.enter()
          .append("line")
            .attr({ "class": "value"
                  , "id"   : function(d, i){return "value_" + labels[i];}
                  , "x1"   : x
                  , "x2"   : x
                  , "y1"   : 50
                  , "y2"   : height
            })
            .style({ "stroke"       : color
                   , "stroke-width" : 2
                   , "opacity"      : opacity
                   })
            .on("mouseover", function(value, i){
              d3.select(this)
                .transition()
                  .duration(100)
                .attr({ y1: 0 })
                .style({ "stroke-width" : 3
                       , "opacity"      : 1
                       //, "stroke"       : color_hover
                })
                ;

              selected_group = group[i];

              lines.style({"stroke" : color
                          , "opacity": opac
              });

              var label = labels[i];
              nametip
               .attr({ "text-anchor": function(){
                  return (x(value) > width/2)? "end" : "start";
               }})
               .transition()
                 .duration(100)
               .style({ "opacity" : 1
                      , "fill" : function(){return color_hover[i];}
                      //, "stroke-width" :  0.5
               })
               .text(label + ": " + value + unit)
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
                      , "stroke"       : function(){return color(null, i);}
               })
              ;
              selected_group = null;

              lines.style({ "stroke" : color
                          , "opacity": opac
              });

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
        console.log("x", x.range());
        x.range([5, width - 5]);
        console.log("x", x.range());
        svg.attr({ width : width
                 , height: height});

        var lines = svg.selectAll("line.value");
        lines.attr({"x1": x, "x2": x, "y2": height});
        console.log(lines);
        g_axis.call(d3.svg.axis().scale(x));
      }
    };
  }
});
