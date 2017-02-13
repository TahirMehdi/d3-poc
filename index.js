(function () {
    var flareData = {
        "name": "analytics",
        "children": [
            {
                "name": "cluster",
                "children": [
                    {"name": "AgglomerativeCluster", "size": 30, "color": "#0c9797"},
                    {"name": "CommunityStructure", "size": 9, "color": "#bf574d"},
                    {"name": "HierarchicalCluster", "size": 9, "color": "#bb7a00"},
                    {"name": "MergeEdge", "size": 9, "color": "#bf574d"},
                    {"name": "AgglomerativeCluster", "size": 4, "color": "#bf574d"},
                    {"name": "CommunityStructure", "size": 4, "color": "#bb7a00"},
                    {"name": "AgglomerativeCluster", "size": 4, "color": "#bf574d"},
                    {"name": "CommunityStructure", "size": 4, "color": "#0c9797"},
                    {"name": "MergeEdge", "size": 1, "color": "#bb7a00"},
                    {"name": "MergeEdge", "size": 1, "color": "#bf574d"},
                    {"name": "AgglomerativeCluster", "size": 1, "color": "#0c9797"},
                    {"name": "AgglomerativeCluster", "size": 1, "color": "#0c9797"},
                    {"name": "AgglomerativeCluster", "size": 1, "color": "#bf574d"},
                    {"name": "AgglomerativeCluster", "size": 1, "color": "#bb7a00"},
                    {"name": "AgglomerativeCluster", "size": 1, "color": "#0c9797"},
                    {"name": "AgglomerativeCluster", "size": 1, "color": "#bf574d"},
                    {"name": "AgglomerativeCluster", "size": 1, "color": "#0c9797"},
                    {"name": "AgglomerativeCluster", "size": 1, "color": "#bf574d"},
                    {"name": "AgglomerativeCluster", "size": 1, "color": "#bb7a00"},
                    {"name": "AgglomerativeCluster", "size": 1, "color": "#0c9797"},
                    {"name": "AgglomerativeCluster", "size": 1, "color": "#0c9797"},
                    {"name": "AgglomerativeCluster", "size": 1, "color": "#0c9797"},
                    {"name": "AgglomerativeCluster", "size": 1, "color": "#bf574d"},
                    {"name": "AgglomerativeCluster", "size": 1, "color": "#bb7a00"},
                    {"name": "AgglomerativeCluster", "size": 1, "color": "#0c9797"},
                    {"name": "AgglomerativeCluster", "size": 1, "color": "#bf574d"},
                    {"name": "AgglomerativeCluster", "size": 1, "color": "#0c9797"},
                    {"name": "AgglomerativeCluster", "size": 1, "color": "#bb7a00"},
                    {"name": "AgglomerativeCluster", "size": 1, "color": "#bb7a00"},
                    {"name": "AgglomerativeCluster", "size": 1, "color": "#0c9797"},
                    {"name": "AgglomerativeCluster", "size": 1, "color": "#bf574d"},
                    {"name": "AgglomerativeCluster", "size": 1, "color": "#0c9797"},
                    {"name": "AgglomerativeCluster", "size": 1, "color": "#0c9797"},
                    {"name": "AgglomerativeCluster", "size": 1, "color": "#bf574d"},
                    {"name": "MergeEdge", "size": 1, "color": "#000"},
                    {"name": "MergeEdge", "size": 1, "color": "#000"},
                    {"name": "MergeEdge", "size": 1, "color": "#000"},
                    {"name": "MergeEdge", "size": 1, "color": "#000"},
                    {"name": "MergeEdge", "size": 1, "color": "#000"},
                    {"name": "MergeEdge", "size": 1, "color": "#000"},
                    {"name": "MergeEdge", "size": 1, "color": "#000"},
                    {"name": "MergeEdge", "size": 1, "color": "#000"}
                ]
            }
            ,
            {
                "name": "graph",
                "children": [
                    {"name": "BetweennessCentrality", "size": 20, "color":"#0c9797"},
                    {"name": "LinkDistance", "size": 9, "color":"#bb7a00"},
                    {"name": "MaxFlowMinCut", "size": 15, "color":"#0c9797"},
                    {"name": "ShortestPaths", "size": 4, "color":"#bb7a00"},
                    {"name": "SpanningTree", "size": 1, "color":"#bf574d"},
                    {"name": "AgglomerativeCluster", "size": 4, "color": "#bf574d"},
                    {"name": "CommunityStructure", "size": 4, "color": "#0c9797"},
                    {"name": "MergeEdge", "size": 1, "color": "#bb7a00"},
                    {"name": "MergeEdge", "size": 1, "color": "#bf574d"},
                    {"name": "AgglomerativeCluster", "size": 1, "color": "#0c9797"},
                    {"name": "AgglomerativeCluster", "size": 1, "color": "#0c9797"}
                ]
            },
            {
                "name": "optimization",
                "children": [
                    {"name": "AspectRatioBanker", "size": 25, "color":"#0c9797"},
                    {"name": "AspectRatioBanker", "size": 4, "color":"#bf574d"},
                    {"name": "AgglomerativeCluster", "size": 1, "color": "#bf574d"},
                    {"name": "AgglomerativeCluster", "size": 1, "color": "#0c9797"},
                    {"name": "AgglomerativeCluster", "size": 1, "color": "#bb7a00"},
                    {"name": "AgglomerativeCluster", "size": 1, "color": "#bb7a00"},
                    {"name": "AgglomerativeCluster", "size": 1, "color": "#0c9797"},
                    {"name": "AgglomerativeCluster", "size": 1, "color": "#bf574d"},
                    {"name": "AgglomerativeCluster", "size": 1, "color": "#0c9797"},
                    {"name": "AgglomerativeCluster", "size": 1, "color": "#0c9797"},
                    {"name": "AgglomerativeCluster", "size": 1, "color": "#bf574d"},
                    {"name": "MergeEdge", "size": 1, "color": "#000"},
                    {"name": "MergeEdge", "size": 1, "color": "#000"}
                    ]
            }
        ]
    };
    var width = (920),
        height = (920);

    var svg = d3.select('#paper')
        .attr('width', width)
        .attr('height', height)
        .canvas(true);

    var treemap = d3.treemap()
        .tile(d3.treemapSquarify.ratio(1))
        .size([width, height])
        .paddingInner(1)
        .paddingOuter(3);

        data = flareData;

        var root = d3.hierarchy(data)
            .sum((d, i) => d.size);

        treemap(root);

        var cell = svg.selectAll("g")
            .data(root.leaves())
            .enter().append("g")
            .attr("transform", function (d) {
                return "translate(" + d.x0 + "," + d.y0 + ")";
            });

        cell.append("rect")
            .attr("width", function (d) {
                return d.x1 - d.x0;
            })
            .attr("height", function (d) {
                return d.y1 - d.y0;
            })
            .attr("fill", function (d) {
                return d.data.color;
            });
})();