impress.callbacks["title"] = function() {
  d3.select("#bad-puns .warning").attr("style", "display:none");
};

impress.callbacks["bad-puns"] = function() {
  d3.select("#bad-puns .warning").attr("style", "");
};

impress.callbacks["cliff"] = function() {
  clearChildren('#cliff .chart');

  var container = d3.select('#cliff .chart');
  var svg = container.append('svg')
    .attr("width", "500")
    .attr("height", "300");

  var height = d3.scaleLinear()
                 .domain([0, 10])
                 .range([10, 290]);
  //var y = height.range([290, 10]);
  var y = d3.scaleLinear()
                 .domain([0, 10])
                 .range([290, 10]);
  var barWidth = 30;

  svg.selectAll("rect")
     .data([0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.8, 1.2, 1.5, 1.8, 3, 9, 9.5, 9.8, 10])
     .enter()
     .append("rect")
     .attr("x", function(d, i) { return i * (barWidth + 1) })
     .attr("y", function(d) { return y(d) })
     .attr("width", barWidth)
     .attr("height", function(d) { return height(d) })
     .attr("fill", "green");
};

impress.callbacks["reverse-coordinates"] = function() {
  clearChildren('#reverse-coordinates .chart');

  var x = d3.scaleIdentity().domain([0,450]);
  var y = d3.scaleIdentity().domain([0,300]);

  var chart = d3.select("#reverse-coordinates .chart")
    .append("svg")
      .attr("class", "chart")
      .attr("width", 550)
      .attr("height", 400)
      .append("g")
       .attr("transform", "translate(50,50)");

  chart.selectAll("line.x")
    .data(x.ticks(10))
    .enter().append("line")
    .attr("class", "x")
    .attr("x1", x)
    .attr("x2", x)
    .attr("y1", 0)
    .attr("y2", 300)
    .style("stroke", "#ccc");

  chart.selectAll("line.y")
    .data(y.ticks(10))
    .enter().append("line")
    .attr("class", "y")
    .attr("x1", 0)
    .attr("x2", 450)
    .attr("y1", y)
    .attr("y2", y)
    .style("stroke", "#ccc");

  chart.append("circle")
    .attr("cx", 50)
    .attr("cy", 50)
    .attr("r", 25)
    .attr("stroke", "red")
    .attr("stroke-width", 3)
    .attr("fill", "none")

  chart.append("marker")
     .attr('id', 'triangle')
     .attr('viewBox', '0 0 10 10')
     .attr('refX', 0).attr('refY', 5)
     .attr('markerUnits', 'strokeWidth')
     .attr('markerWidth', 4)
     .attr('markerHeight', 3)
     .attr('orient', 'auto')
     .append('path').attr('d', "M 0 0 L 10 5 L 0 10 z").attr('fill', 'red');

  chart.append("line")
     .attr("x1",  75).attr("y1", 50)
     .attr("x2", 175).attr("y2", 50)
     .attr("fill", "red")
     .attr("stroke", "red")
     .attr("stroke-width", 3)
     .attr("marker-end", 'url(#triangle)')
     .transition().duration(10000)
     .attr("x2", 375)

  chart.append("line")
     .attr("x1", 50).attr("y1", 75)
     .attr("x2", 50).attr("y2", 175)
     .attr("fill", "red")
     .attr("stroke", "red")
     .attr("stroke-width", 3)
     .attr("marker-end", 'url(#triangle)')
     .transition().duration(10000)
     .attr('y2', 275)

  chart.append("rect")
     .attr("x", 125)
     .attr("y", 225)
     .attr("width", 50)
     .attr("height", 75)
     .attr("stroke", '#003366')
     .attr("fill", '#3399CC')
     .transition().duration(10000)
     .attr("y", 100)
     .attr("height", 200)

  chart.append('g')
    .attr("class", "axis")
    .call(d3.axisTop(x));

  chart.append('g')
    .attr("class", "axis")
    .call(d3.axisLeft(y).ticks(5));
};

impress.callbacks["not-d3-code"] = function() {
  d3.select("#not-d3-code .warning").attr("style", "");
};

impress.callbacks["transition"] = function() {
  clearChildren('#transition .chart');

  var container = d3.select('#transition .chart');
  var svg = container.append('svg')
    .attr("width", "800")
    .attr("height", "500");

  var xSkew = d3.scaleLinear()
                .domain([0,4])
                .range([-350, 350]);

  var yScale = d3.scaleOrdinal()
                 .domain([0,1,2,3,4])
                 .range([1, 0.8, 0.6, 0.53, 0.5]);

  var yPos = d3.scaleOrdinal()
                 .domain([0,1,2,3,4])
                 .range([400, 320, 260, 240, 230]);

  function xPos(point) {
    return 400 + (xSkew(point.x) * yScale(point.y));
  }

  function zOffset(point) {
    return point.z * 10 * yScale(point.y);
  }

  var points = [
    {x: 0, y: 0, z: 0},
    {x: 1, y: 0, z: 10},
    {x: 2, y: 0, z: 2},
    {x: 3, y: 0, z: 5},
    {x: 4, y: 0, z: 0},

    {x: 0, y: 1, z: 10},
    {x: 1, y: 1, z: 12},
    {x: 2, y: 1, z: 15},
    {x: 3, y: 1, z: 9},
    {x: 4, y: 1, z: 7},

    {x: 0, y: 2, z: 12},
    {x: 1, y: 2, z: 18},
    {x: 2, y: 2, z: 20},
    {x: 3, y: 2, z: 17},
    {x: 4, y: 2, z: 11},

    {x: 0, y: 3, z: 15},
    {x: 1, y: 3, z: 19},
    {x: 2, y: 3, z: 25},
    {x: 3, y: 3, z: 19},
    {x: 4, y: 3, z: 17},

    {x: 0, y: 4, z: 17},
    {x: 1, y: 4, z: 20},
    {x: 2, y: 4, z: 25},
    {x: 3, y: 4, z: 22},
    {x: 4, y: 4, z: 20},
  ];

  function square(x, y) {
    base = y * 5 + x;

    var bl = points[base],
        tl = points[base + 5],
        tr = points[base + 6],
        br = points[base + 1];

    var zs = [bl.z, tl.z, tr.z, br.z, bl.z];
    var xslope = [(tr.z - tl.z), (br.z - bl.z)].sort().pop();
    var yslope = [(tl.z - bl.z), (tr.z - br.z)].sort().pop();

    return {
      "start": [startPos(bl), startPos(tl), startPos(tr), startPos(br)],
      "end":   [endPos(bl), endPos(tl), endPos(tr), endPos(br)],
      "slope": (xslope * yslope)
    };
  }

  function startPos(point) {
    return { x: xPos(point), y: yPos(point.y) };
  }

  function endPos(point) {
    return { x: xPos(point), y: yPos(point.y) - zOffset(point) };
  }

  var squares = [];
  for (var x=0; x<4; x++) {
    for (var y=0; y<4; y++) {
      squares.push(square(x, y));
    }
  }

  var line = d3.line()
     .curve(d3.curveLinearClosed)
     .x(function(p) { return p.x })
     .y(function(p) { return p.y });

  var slopeShade = d3.scaleLinear()
                     .domain([-50, -25, 0, 50])
                     .range(['red', 'brown', 'orange', 'green'])

  svg.selectAll("path.square")
     .data(squares.reverse())
     .enter().append("path")
     .attr("class", "square")
     .attr("d", function(s) { return line(s.start) })
     .attr("fill", "green")
     .transition().duration(20000)
     .attr("d", function(s) { return line(s.end) })
     .attr("fill", function(s) { return slopeShade(s.slope) });
};

impress.callbacks["maze"] = function() {
      var row, col, rowSquares,
          squares = [],
          s = 20;

      for (row=0; row<s; row++) {
        rowSquares = [];
        for (col=0; col<s; col++) {
          rowSquares.push({r:row,c:col,n:1,e:1,s:1,w:1,v:0});
        }
        squares.push(rowSquares);
      }

      function coordinates(direction) {
        switch (direction) {
          case 'n':
            return [0,0,1,0]
          case 'e':
            return [1,0,1,1]
          case 's':
            return [1,1,0,1]
          case 'w':
            return [0,1,0,0]
        }
      }

      var solution = [],
          solutions = [],
          unvisited = s * s - 1;

      solution.push(squares[s-1][s-1]);

      while (solution.length > 0 && unvisited > 0) {
        visit(solution[solution.length - 1]);
        solutions.push(solution.slice());

        while (solution.length > 0 && unvisitedNeighbors(solution[solution.length - 1]).length < 1) {
          solution[solution.length - 1].v = 1;
          solution.pop();
        }
      }

      var routeSolution = solutions.sort().pop();

      function validate(r, c) {
        return (r > -1) && (r < s) && (c > -1) && (c < s);
      }

      function unvisitedNeighbors(square) {
        var c,i,un = [];
        for (i = -1; i<=1; i = i + 2) {
          var r1 = square.r + i, c1 = square.c,
              r2 = square.r, c2 = square.c + i;

          if (validate(r1, c1)) {
            c = squares[r1][c1];
            if (c.v == 0) {
              un.push(c);
            }
          }
          if (validate(r2, c2)) {
            c = squares[r2][c2];
            if (c.v == 0) {
              un.push(c);
            }
          }
        }
        return un;
      }

      function visit(square) {
        square.v = 1;

        var candidates = unvisitedNeighbors(square);
        var chosen = candidates[Math.floor(Math.random()*candidates.length)];

        // remove wall in square and candidate
        if (chosen.r === square.r) {
          if (chosen.c > square.c) {
            square.e = chosen.w = 0;
          } else {
            square.w = chosen.e = 0;
          }
        } else {
          if (chosen.r > square.r) {
            square.s = chosen.n = 0;
          } else {
            square.n = chosen.s = 0;
          }
        }

        solution.push(chosen);
        unvisited--;
      }

      var w = 500,
          h = 500,
          sw = w / s;

      clearChildren('#maze .chart');
      var svg = d3.select("#maze .chart").append("svg")
        .attr("width", w).attr("height", h);

      var rows = svg.selectAll("g.row")
          .data(squares)
          .enter().append("g")
          .attr("class", "row")
          .attr("transform", function(d, i) { return "translate(0," + (i*sw) + ")" });

      rows.each(function(row) {
        var squares = d3.select(this).selectAll("g.square")
          .data(row)
          .enter().append("g")
          .attr("class", "square")
          .attr("transform", function(d, i) { return "translate(" + (i*sw) + ",0)" });

        squares.each(function(sd) {
          var square = d3.select(this);
          var i, directions = ['n','e','s','w'];

          for(i=0; i<directions.length; i++) {
            var dir = directions[i];

            if (sd[dir] == 1) {
              var c = coordinates(dir);
              square.append("line")
                    .attr("x1", c[0] * sw).attr("y1", c[1] * sw)
                    .attr("x2", c[2] * sw).attr("y2", c[3] * sw);
            }
          }
        });
      });

      var line = d3.line()
                   .curve(d3.curveLinear)
                   .x(function(s) { return (s.c + 0.5) * sw })
                   .y(function(s) { return (s.r + 0.5) * sw });

      var route = svg.selectAll("path")
          .data([routeSolution])
          .enter().append("path")
          .attr("class", "route")
          .attr("fill", "none")
          .attr("stroke", "red")
          .attr("stroke-width", 3)
          .attr("d", function(s) { return line(s) })

};

impress.callbacks["example1-dom"] = function() {
  clearChildren('#example1-dom .left');
  var data = "Data Driven Documents".split(" ");
  var div = d3.select("#example1-dom .left");

  var color = d3.scaleOrdinal()
                .domain([0,1,2])
                .range(['yellow','white','dodgerblue']);

  div.selectAll("p")
    .data(data)
    .enter().append("p")
    .text(function(d) { return d })
    .attr('style', function(d,i) {
      return 'background-color: '+color(i)
    });
};

var rainfallData = [
  {"Denver": 0.51, "Portland": 5.07},
  {"Denver": 0.49, "Portland": 4.18},
  {"Denver": 1.28, "Portland": 3.71},
  {"Denver": 1.93, "Portland": 2.64},
  {"Denver": 2.32, "Portland": 2.38},
  {"Denver": 1.56, "Portland": 1.59},
  {"Denver": 2.16, "Portland": 0.72},
  {"Denver": 1.82, "Portland": 0.93},
  {"Denver": 1.14, "Portland": 1.65},
  {"Denver": 0.99, "Portland": 2.88},
  {"Denver": 0.98, "Portland": 5.61},
  {"Denver": 0.63, "Portland": 5.71}
];

impress.callbacks["example2-chart-step1"] = function() {
  d3.selectAll(".example2 .right").attr("style", "display:none");
  d3.selectAll("#example2-chart-step1 .right").attr("style", "");
  clearChildren('#example2-chart-step3 .left');
  clearChildren('#example2-chart-step4 .left');
  clearChildren('#example2-chart-step5 .left');
  clearChildren('#example2-chart-step6 .left');
  clearChildren('#example2-chart .left');
}

impress.callbacks["example2-chart-step2"] = function() {
  d3.selectAll(".example2 .right").attr("style", "display:none");
  d3.selectAll("#example2-chart-step2 .right").attr("style", "");
  clearChildren('#example2-chart-step3 .left');
  clearChildren('#example2-chart-step4 .left');
  clearChildren('#example2-chart-step5 .left');
  clearChildren('#example2-chart-step6 .left');
  clearChildren('#example2-chart .left');
}

impress.callbacks["example2-chart-step3"] = function() {
  d3.selectAll(".example2 .right").attr("style", "display:none");
  d3.selectAll("#example2-chart-step3 .right").attr("style", "");

  clearChildren('#example2-chart-step3 .left');
  clearChildren('#example2-chart-step4 .left');
  clearChildren('#example2-chart-step5 .left');
  clearChildren('#example2-chart-step6 .left');
  clearChildren('#example2-chart .left');
  var w = 400, h = 700,
      margin = { left: 10, top: 30 },
      div = d3.select("#example2-chart-step3 .left"),
      svg = div.append("svg")
               .attr("height", h)
               .attr("width", w)
      barHeight = 20,
      width = d3.scaleLinear()
                .domain([0, 6])
                .range([0, 350])
      y = d3.scaleLinear()
                .domain([0, 11])
                .range([52, 680]);

  svg.append('g')
    .attr('class', 'x axis')
    .attr('transform', 'translate('+margin.left+','+(margin.top-2)+')')
    .call(d3.axisTop(width).ticks(7));
}

impress.callbacks["example2-chart-step4"] = function() {
  d3.selectAll(".example2 .right").attr("style", "display:none");
  d3.selectAll("#example2-chart-step4 .right").attr("style", "");

  clearChildren('#example2-chart-step4 .left');
  clearChildren('#example2-chart-step5 .left');
  clearChildren('#example2-chart-step6 .left');
  clearChildren('#example2-chart .left');
  var w = 400, h = 700,
      margin = { left: 10, top: 30 },
      div = d3.select("#example2-chart-step4 .left"),
      svg = div.append("svg")
               .attr("height", h)
               .attr("width", w)
      barHeight = 20,
      width = d3.scaleLinear()
                .domain([0, 6])
                .range([0, 350])
      y = d3.scaleLinear()
                .domain([0, 11])
                .range([52, 680]);

  // var xAxis = d3.svg.axis()
  //               .scale(width)
  //               .orient('top')
  //               .ticks(7);

  svg.append('g')
    .attr('class', 'grid')
    .attr('transform', 'translate('+margin.left+','+(margin.top-2)+')')
    .call(d3.axisTop(width).ticks(7).tickSize(-h, 0, 0).tickFormat(''));
}

impress.callbacks["example2-chart-step5"] = function() {
  d3.selectAll(".example2 .right").attr("style", "display:none");
  d3.selectAll("#example2-chart-step5 .right").attr("style", "");

  clearChildren('#example2-chart-step5 .left');
  clearChildren('#example2-chart-step6 .left');
  clearChildren('#example2-chart .left');
  var w = 400, h = 700,
      margin = { left: 10, top: 30 },
      div = d3.select("#example2-chart-step5 .left"),
      svg = div.append("svg")
               .attr("height", h)
               .attr("width", w)
      barHeight = 20,
      width = d3.scaleLinear()
                .domain([0, 6])
                .range([0, 350])
      y = d3.scaleLinear()
                .domain([0, 11])
                .range([52, 680]);

  svg.selectAll("rect.denver")
    .data(rainfallData)
    .enter().append("rect")
    .attr('class', 'denver')
    .attr('x', margin.left)
    .attr('y', function(d, i) {
      return y(i) - (barHeight + 1)
    })
    .attr('height', barHeight)
    .attr('width', function(d, i) {
      return width(d.Denver)
    })
    .attr('fill', 'red');
}

impress.callbacks["example2-chart-step6"] = function() {
  d3.selectAll(".example2 .right").attr("style", "display:none");
  d3.selectAll("#example2-chart-step6 .right").attr("style", "");

  clearChildren('#example2-chart-step6 .left');
  var w = 400, h = 700,
      margin = { left: 10, top: 30 },
      div = d3.select("#example2-chart-step6 .left"),
      svg = div.append("svg")
               .attr("height", h)
               .attr("width", w)
      barHeight = 20,
      width = d3.scaleLinear()
                .domain([0, 6])
                .range([0, 350])
      y = d3.scaleLinear()
                .domain([0, 11])
                .range([52, 680]);

  svg.selectAll("rect.portland")
    .data(rainfallData)
    .enter().append("rect")
    .attr('class', 'portland')
    .attr('x', margin.left)
    .attr('y', function(d, i) {
      return y(i) + 1;
    })
    .attr('height', barHeight)
    .attr('width', function(d, i) {
      return width(d.Portland)
    })
    .attr('fill', 'blue');
}

impress.callbacks["example2-chart"] = function() {
  d3.selectAll(".example2 .right").attr("style", "display:none");
  clearChildren('#example2-chart .left');

  var w = 400, h = 700,
      margin = { left: 10, top: 30 },
      div = d3.select("#example2-chart .left"),
      svg = div.append("svg")
               .attr("height", h)
               .attr("width", w)
      barHeight = 20,
      width = d3.scaleLinear()
                .domain([0, 6])
                .range([0, 350])
      y = d3.scaleLinear()
                .domain([0, 11])
                .range([52, 680]);

  // var xAxis = d3.svg.axis()
  //               .scale(width)
  //               .orient('top')
  //               .ticks(7);

  svg.append('g')
    .attr('class', 'x axis')
    .attr('transform', 'translate('+margin.left+','+(margin.top-2)+')')
    .call(d3.axisTop(width).ticks(7));

  svg.append('g')
    .attr('class', 'grid')
    .attr('transform', 'translate('+margin.left+','+(margin.top-2)+')')
    .call(d3.axisTop(width).ticks(7).tickSize(-h, 0, 0).tickFormat(''));

  svg.selectAll("rect.denver")
    .data(rainfallData)
    .enter().append("rect")
    .attr('class', 'denver')
    .attr('x', margin.left)
    .attr('y', function(d, i) {
      return y(i) - (barHeight + 1)
    })
    .attr('height', barHeight)
    .attr('width', function(d, i) {
      return width(d.Denver)
    })
    .attr('fill', 'red');

  svg.selectAll("rect.portland")
    .data(rainfallData)
    .enter().append("rect")
    .attr('class', 'portland')
    .attr('x', margin.left)
    .attr('y', function(d, i) {
      return y(i) + 1;
    })
    .attr('height', barHeight)
    .attr('width', function(d, i) {
      return width(d.Portland)
    })
    .attr('fill', 'blue');

};

function clearChildren(selector) {
  var c = document.querySelector(selector);
  while (c.childNodes.length > 0) {
    c.removeChild(c.childNodes[c.childNodes.length - 1]);
  }
}
