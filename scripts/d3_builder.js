var d3Builder = function(head) {
  //root object is used to access the nodes as D3 objects.
  var buildRoot = function(node) {
    if (!node.next) return { name : node.text || '', children : []};
    return {
      name     : node.text,
      children : [buildRoot(node.next)]
    }
  };

  var buildD3 = function(root) {
    var width = 400,
        height = 600;

    var cluster = d3.layout.cluster()
        .size([height, width - 160]);

    var diagonal = d3.svg.diagonal()
        .projection(function(d) { return [d.y, d.x]; });

    var svg = d3.select("body").append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(40,0)");

    var nodes = cluster.nodes(root),
        links = cluster.links(nodes);

    var link = svg.selectAll(".link")
        .data(links)
        .enter().append("path")
        .attr("class", "link")
        .attr("d", diagonal);

    var node = svg.selectAll(".node")
        .data(nodes)
        .enter().append("g")
        .attr("class", "node")
        .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; })

    node.append("circle")
        .attr("r", 4.5);

    node.append("text")
        .attr("dx", function(d) { return d.children ? -8 : 8; })
        .attr("dy", 3)
        .style("text-anchor", function(d) { return d.children ? "end" : "start"; })
        .text(function(d) { return d.name; });

    d3.select(self.frameElement).style("height", height + "px");
  };

  //execution. biuldroot returns the root (to convert to D3 nodes, buildD3 takes the root and displays on page)
  if   (head) buildD3(buildRoot(head));
  else d3.select("body").append("p").text(function(d) { return 'No nodes here!'; });
};
