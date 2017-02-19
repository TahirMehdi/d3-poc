function updateRenderer(renderType, width, height) {
    if (this.renderer) {

    } else {
        // var d3_canvas = d3_canvas_imp;
        console.log(renderType);
        if (renderType == 'svg') {
            return this.renderer = d3.select(this.element.type)
                .append(renderType)
                .attr('class', renderType)
                .attr('width', width)
                .attr('height', height);
        } else if (renderType == 'canvas') {
            var paper = d3.select(this.element.type)
                .append(renderType)
                .attr('class', renderType)
                .attr('width', width)
                .attr('height', height)
                .canvas(true);
            return this.renderer = paper;
        }
    }
}

function render() {
    var data = this.data,
        width, height;
    width = height = Math.min(this.element.clientWidth, this.element.clientHeight);
    var paper = this.updateRenderer('canvas', width, height);
    console.log(paper);
    paper
        .on('contextmenu', () => {
            d3.event.preventDefault();
            d3.event.stopPropagation();
        });
    var treemap = d3.treemap()
        .tile(d3.treemapSquarify.ratio(1))
        .size([width, height])
        .paddingInner(this.config.paddingInner)
        .paddingOuter(this.config.paddingOuter);
    var colorify;
    var setTextSize;
    drawTreeMap(initTreeMap(data));
/////////////////////////////////////////////////////////////////////////////////////////////////////
    function initTreeMap(data) {
        var root = d3.hierarchy(data);
        root.sum((d) => {
            if (!d.size) {
                d.size = 0;
                return 0;
            }
            return Math.log(d.size) + 1;
            // return d.size ? Math.log(d.size) + 2 : 1;
        })
            .sort(function (a, b) {
                return b.height - a.height || b.value - a.value;
            });
        treemap(root);

        colorify = (d) => d.data.color || d3.scaleSequential(d3.interpolateWarm).domain([0, root.value / 8])(d.value); // colorify = (d)=>{ return d3.scaleSequential(d3.interpolateViridis).domain([0,root.height])(d.depth); };
        setTextSize = (d) => width / 75 + 'px'; //setTextSize = (d) => (d.x1 - d.x0) / d.data.name.length + 'px';
        return root;
    }

/////////////////////////////////////////////////////////////////////////////////////////////////////
    function drawTreeMap(node) {
        function ascendNode(d) {
            d.depth--;
            d.children && d.children.forEach(ascendNode);
        }

        function descendNode(d) {
            d.depth++;
            d.children && d.children.forEach(descendNode);
        }

        // var outerNode = paper.selectAll("g")
        //     .data(node.children || [node]);
        // outerNode = outerNode
        //     .enter()
        //     .append("g")
        //     .attr('class', 'outernode');
        //
        // // var cell = outerNode
        // var cell = outerNode.selectAll('.outernode')
        //     .data(node.children)
        //     .enter()
        //     .append("g")
        //     .attr('class', 'innernode');

        var cell = paper.selectAll("g")
            .data(node.children || [node]);
        cell = cell
            .enter()
            .append("g");
        // .filter((d) => d.data.size > 0)

        cell
            .append("rect")
            .attr("width", (d) => Math.round(d.x1 - d.x0))
            .attr("height", (d) => Math.round(d.y1 - d.y0))
            .attr("fill", colorify)
            .on('click', (n) => {
                d3.event.stopPropagation();
                var p = n.path(node);
                var nextNode = p[p.length - 2];
                if (nextNode) {
                    ascendNode(nextNode);
                    treemap(nextNode);
                    cell.remove();
                    drawTreeMap(nextNode);
                } else {
                    nextNode = n;
                }
            })
            .on('contextmenu', () => {
                d3.event.preventDefault();
                d3.event.stopPropagation();
                var nextNode = node.parent;
                if (nextNode) {
                    descendNode(node);
                    treemap(nextNode);
                    cell.remove();
                    drawTreeMap(nextNode);
                } else {
                    nextNode = node;
                }
            })
            .transition()
            .duration(500)
            .attr("fill-opacity", 1);
        cell
            .append('text')
            .attr('x', (d) => Math.round(d.x1 - d.x0) / 2)
            .attr('y', (d) => Math.round(d.y1 - d.y0) / 2)
            .attr('font-family', 'sans-serif')
            .attr('font-size', setTextSize)
            .attr('fill', 'black')
            .attr('text-anchor', 'middle')
            .text((d) => d.data.name)

        cell.attr("transform", (d) => "translate(" + d.x0 + "," + d.y0 + ")")
            .transition()
            .duration(500)
            .attr("fill-opacity", 1)

    }
}


data = {
    "name": "analytics",
    "children": [
        {
            "name": "graph",
            "children": [
                {
                    "name": "1REUT",
                    "size": 1000,
                    "color": "#FAAE71"
                },
                {
                    "name": "1XIG",
                    "size": 9,
                    "color": "#4EB79F"
                },
                {
                    "name": "1REUT",
                    "size": 9,
                    "color": "#FAAE71"
                },
                {
                    "name": "gra6ph",
                    "children": [
                        {
                            "name": "REUT",
                            "size": 1000,
                            "color": "#FAAE71"
                        },
                        {
                            "name": "XIG",
                            "size": 9,
                            "color": "#4EB79F"
                        },
                        {
                            "name": "REUT",
                            "size": 9,
                            "color": "#FAAE71"
                        },
                        {
                            "name": "BBG",
                            "size": 1,
                            "color": "#F66D79"
                        },
                        {
                            "name": "BBG",
                            "size": 4,
                            "color": "#F66D79"
                        },
                        {
                            "name": "XIG",
                            "size": 4,
                            "color": "#4EB79F"
                        },
                        {
                            "name": "XIG",
                            "size": 1,
                            "color": "#FAAE71"
                        },
                        {
                            "name": "XIG",
                            "size": 1,
                            "color": "#F66D79"
                        },
                        {
                            "name": "BBG",
                            "size": 1,
                            "color": "#4EB79F"
                        },
                        {
                            "name": "BBG",
                            "size": 1,
                            "color": "#4EB79F"
                        }
                    ]
                },
                {
                    "name": "BBG",
                    "size": 1,
                    "color": "#F66D79"
                },
                {
                    "name": "BBG",
                    "size": 4,
                    "color": "#F66D79"
                },
                {
                    "name": "XIG",
                    "size": 4,
                    "color": "#4EB79F"
                },
                {
                    "name": "XIG",
                    "size": 1,
                    "color": "#FAAE71"
                },
                {
                    "name": "XIG",
                    "size": 1,
                    "color": "#F66D79"
                },
                {
                    "name": "BBG",
                    "size": 1,
                    "color": "#4EB79F"
                },
                {
                    "name": "BBG",
                    "size": 1,
                    "color": "#4EB79F"
                }
            ]
        },
        {
            "name": "cluster",
            "children": [
                {
                    "name": "BBG",
                    "size": 100,
                    "color": "#4EB79F"
                },
                {
                    "name": "XIG",
                    "size": 100,
                    "color": "#F66D79"
                },
                {
                    "name": "REUT",
                    "size": 10,
                    "color": "#FAAE71"
                },
                {
                    "name": "XIG",
                    "size": 10,
                    "color": "#F66D79"
                },
                {
                    "name": "BBG",
                    "size": 10000,
                    "color": "#F66D79"
                },
                {
                    "name": "XIG",
                    "size": 1000,
                    "color": "#FAAE71"
                },
                {
                    "name": "BBG",
                    "size": 1000,
                    "color": "#F66D79"
                },
                {
                    "name": "XIG",
                    "size": 100,
                    "color": "#4EB79F"
                },
                {
                    "name": "XIG",
                    "size": 1,
                    "color": "#FAAE71"
                },
                {
                    "name": "XIG",
                    "size": 1,
                    "color": "#F66D79"
                },
                {
                    "name": "BBG",
                    "size": 1,
                    "color": "#4EB79F"
                },
                {
                    "name": "BBG",
                    "size": 1,
                    "color": "#4EB79F"
                },
                {
                    "name": "BBG",
                    "size": 1,
                    "color": "#F66D79"
                },
                {
                    "name": "BBG",
                    "size": 1,
                    "color": "#FAAE71"
                },
                {
                    "name": "BBG",
                    "size": 10,
                    "color": "#4EB79F"
                },
                {
                    "name": "BBG",
                    "size": 1,
                    "color": "#F66D79"
                },
                {
                    "name": "BBG",
                    "size": 1,
                    "color": "#4EB79F"
                },
                {
                    "name": "BBG",
                    "size": 10,
                    "color": "#F66D79"
                },
                {
                    "name": "BBG",
                    "size": 1000,
                    "color": "#FAAE71"
                },
                {
                    "name": "BBG",
                    "size": 100,
                    "color": "#4EB79F"
                },
                {
                    "name": "BBG",
                    "size": 1,
                    "color": "#4EB79F"
                },
                {
                    "name": "BBG",
                    "size": 100,
                    "color": "#4EB79F"
                },
                {
                    "name": "BBG",
                    "size": 100,
                    "color": "#F66D79"
                },
                {
                    "name": "BBG",
                    "size": 1,
                    "color": "#FAAE71"
                },
                {
                    "name": "BBG",
                    "size": 1,
                    "color": "#4EB79F"
                },
                {
                    "name": "BBG",
                    "size": 1000,
                    "color": "#F66D79"
                },
                {
                    "name": "BBG",
                    "size": 1,
                    "color": "#4EB79F"
                },
                {
                    "name": "BBG",
                    "size": 1,
                    "color": "#FAAE71"
                },
                {
                    "name": "BBG",
                    "size": 1000,
                    "color": "#FAAE71"
                },
                {
                    "name": "BBG",
                    "size": 1,
                    "color": "#4EB79F"
                },
                {
                    "name": "BBG",
                    "size": 10,
                    "color": "#FAAE71"
                },
                {
                    "name": "BBG",
                    "size": 100,
                    "color": "#4EB79F"
                },
                {
                    "name": "BBG",
                    "size": 1,
                    "color": "#4EB79F"
                },
                {
                    "name": "BBG",
                    "size": 1,
                    "color": "#F66D79"
                }
            ]
        },
        {
            "name": "cluster",
            "children": [
                {
                    "name": "BBG",
                    "size": 50,
                    "color": "#4EB79F"
                },
                {
                    "name": "XIG",
                    "size": 30,
                    "color": "#F66D79"
                },
                {
                    "name": "REUT",
                    "size": 1,
                    "color": "#FAAE71"
                },
                {
                    "name": "XIG",
                    "size": 9,
                    "color": "#4EB79F"
                },
                {
                    "name": "BBG",
                    "size": 40,
                    "color": "#F66D79"
                },
                {
                    "name": "XIG",
                    "size": 20,
                    "color": "#FAAE71"
                },
                {
                    "name": "BBG",
                    "size": 35,
                    "color": "#F66D79"
                },
                {
                    "name": "XIG",
                    "size": 68,
                    "color": "#4EB79F"
                },
                {
                    "name": "XIG",
                    "size": 350,
                    "color": "#FAAE71"
                },
                {
                    "name": "XIG",
                    "size": 60,
                    "color": "#F66D79"
                },
                {
                    "name": "BBG",
                    "size": 1,
                    "color": "#4EB79F"
                },
                {
                    "name": "BBG",
                    "size": 1,
                    "color": "#4EB79F"
                },
                {
                    "name": "BBG",
                    "size": 1,
                    "color": "#F66D79"
                },
                {
                    "name": "BBG",
                    "size": 1,
                    "color": "#FAAE71"
                },
                {
                    "name": "BBG",
                    "size": 1,
                    "color": "#4EB79F"
                },
                {
                    "name": "BBG",
                    "size": 1,
                    "color": "#F66D79"
                },
                {
                    "name": "BBG",
                    "size": 1,
                    "color": "#4EB79F"
                },
                {
                    "name": "BBG",
                    "size": 1,
                    "color": "#F66D79"
                },
                {
                    "name": "BBG",
                    "size": 1,
                    "color": "#FAAE71"
                },
                {
                    "name": "BBG",
                    "size": 1,
                    "color": "#4EB79F"
                },
                {
                    "name": "BBG",
                    "size": 10,
                    "color": "#4EB79F"
                },
                {
                    "name": "BBG",
                    "size": 1,
                    "color": "#4EB79F"
                },
                {
                    "name": "BBG",
                    "size": 1,
                    "color": "#F66D79"
                },
                {
                    "name": "BBG",
                    "size": 1,
                    "color": "#FAAE71"
                },
                {
                    "name": "BBG",
                    "size": 1,
                    "color": "#4EB79F"
                },
                {
                    "name": "BBG",
                    "size": 20,
                    "color": "#F66D79"
                },
                {
                    "name": "BBG",
                    "size": 1,
                    "color": "#4EB79F"
                },
                {
                    "name": "BBG",
                    "size": 1,
                    "color": "#FAAE71"
                },
                {
                    "name": "BBG",
                    "size": 1,
                    "color": "#FAAE71"
                },
                {
                    "name": "BBG",
                    "size": 1,
                    "color": "#4EB79F"
                },
                {
                    "name": "BBG",
                    "size": 1,
                    "color": "#F66D79"
                },
                {
                    "name": "BBG",
                    "size": 1,
                    "color": "#4EB79F"
                },
                {
                    "name": "BBG",
                    "size": 1,
                    "color": "#4EB79F"
                },
                {
                    "name": "BBG",
                    "size": 1,
                    "color": "#F66D79"
                }
            ]
        },
        {
            "name": "REUTsssss",
            "size": 500,
            "color": "#4EB79F"
        },
        {
            "name": "graph",
            "children": [
                {
                    "name": "REUT",
                    "size": 4,
                    "color": "#4EB79F"
                },
                {
                    "name": "REUT",
                    "size": 16,
                    "color": "#FAAE71"
                },
                {
                    "name": "XIG",
                    "size": 9,
                    "color": "#4EB79F"
                },
                {
                    "name": "REUT",
                    "size": 9,
                    "color": "#FAAE71"
                },
                {
                    "name": "BBG",
                    "size": 1,
                    "color": "#F66D79"
                },
                {
                    "name": "BBG",
                    "size": 4,
                    "color": "#F66D79"
                },
                {
                    "name": "XIG",
                    "size": 4,
                    "color": "#4EB79F"
                },
                {
                    "name": "XIG",
                    "size": 1,
                    "color": "#FAAE71"
                },
                {
                    "name": "XIG",
                    "size": 1,
                    "color": "#F66D79"
                },
                {
                    "name": "BBG",
                    "size": 1,
                    "color": "#4EB79F"
                },
                {
                    "name": "BBG",
                    "size": 1,
                    "color": "#4EB79F"
                }
            ]
        },
        {
            "name": "optimization",
            "children": [
                {
                    "name": "REUT",
                    "size": 9,
                    "color": "#4EB79F"
                },
                {
                    "name": "XIG",
                    "size": 4,
                    "color": "#F66D79"
                },
                {
                    "name": "BBG",
                    "size": 1,
                    "color": "#F66D79"
                },
                {
                    "name": "BBG",
                    "size": 1,
                    "color": "#4EB79F"
                },
                {
                    "name": "BBG",
                    "size": 1,
                    "color": "#FAAE71"
                },
                {
                    "name": "BBG",
                    "size": 1,
                    "color": "#FAAE71"
                },
                {
                    "name": "BBG",
                    "size": 1,
                    "color": "#4EB79F"
                },
                {
                    "name": "BBG",
                    "size": 1,
                    "color": "#F66D79"
                },
                {
                    "name": "BBG",
                    "size": 1,
                    "color": "#4EB79F"
                },
                {
                    "name": "BBG",
                    "size": 1,
                    "color": "#4EB79F"
                },
                {
                    "name": "BBG",
                    "size": 1,
                    "color": "#F66D79"
                }
            ]
        },
        {
            "name": "cluster",
            "children": [
                {
                    "name": "BBG",
                    "size": 9,
                    "color": "#4EB79F"
                },
                {
                    "name": "XIG",
                    "size": 9,
                    "color": "#F66D79"
                },
                {
                    "name": "REUT",
                    "size": 9,
                    "color": "#FAAE71"
                },
                {
                    "name": "XIG",
                    "size": 9,
                    "color": "#F66D79"
                },
                {
                    "name": "BBG",
                    "size": 4,
                    "color": "#F66D79"
                },
                {
                    "name": "XIG",
                    "size": 4,
                    "color": "#FAAE71"
                },
                {
                    "name": "BBG",
                    "size": 4,
                    "color": "#F66D79"
                },
                {
                    "name": "XIG",
                    "size": 4,
                    "color": "#4EB79F"
                },
                {
                    "name": "XIG",
                    "size": 1,
                    "color": "#FAAE71"
                },
                {
                    "name": "XIG",
                    "size": 1,
                    "color": "#F66D79"
                },
                {
                    "name": "BBG",
                    "size": 1,
                    "color": "#4EB79F"
                },
                {
                    "name": "BBG",
                    "size": 1,
                    "color": "#4EB79F"
                },
                {
                    "name": "BBG",
                    "size": 1,
                    "color": "#F66D79"
                },
                {
                    "name": "BBG",
                    "size": 1,
                    "color": "#FAAE71"
                },
                {
                    "name": "BBG",
                    "size": 1,
                    "color": "#4EB79F"
                },
                {
                    "name": "BBG",
                    "size": 1,
                    "color": "#F66D79"
                },
                {
                    "name": "BBG",
                    "size": 1,
                    "color": "#4EB79F"
                },
                {
                    "name": "BBG",
                    "size": 4,
                    "color": "#F66D79"
                },
                {
                    "name": "BBG",
                    "size": 4,
                    "color": "#FAAE71"
                },
                {
                    "name": "BBG",
                    "size": 4,
                    "color": "#4EB79F"
                },
                {
                    "name": "BBG",
                    "size": 1,
                    "color": "#4EB79F"
                },
                {
                    "name": "BBG",
                    "size": 9,
                    "color": "#4EB79F"
                },
                {
                    "name": "BBG",
                    "size": 9,
                    "color": "#F66D79"
                },
                {
                    "name": "BBG",
                    "size": 1,
                    "color": "#FAAE71"
                },
                {
                    "name": "BBG",
                    "size": 1,
                    "color": "#4EB79F"
                },
                {
                    "name": "BBG",
                    "size": 3,
                    "color": "#F66D79"
                },
                {
                    "name": "BBG",
                    "size": 1,
                    "color": "#4EB79F"
                },
                {
                    "name": "BBG",
                    "size": 1,
                    "color": "#FAAE71"
                },
                {
                    "name": "BBG",
                    "size": 9,
                    "color": "#FAAE71"
                },
                {
                    "name": "BBG",
                    "size": 1,
                    "color": "#4EB79F"
                },
                {
                    "name": "BBG",
                    "size": 1,
                    "color": "#F66D79"
                },
                {
                    "name": "BBG",
                    "size": 1,
                    "color": "#4EB79F"
                },
                {
                    "name": "BBG",
                    "size": 1,
                    "color": "#4EB79F"
                },
                {
                    "name": "BBG",
                    "size": 1,
                    "color": "#F66D79"
                }
            ]
        },
        {
            "name": "graph",
            "children": [
                {
                    "name": "REUT",
                    "size": 9,
                    "color": "#4EB79F"
                },
                {
                    "name": "REUT",
                    "size": 9,
                    "color": "#FAAE71"
                },
                {
                    "name": "XIG",
                    "size": 9,
                    "color": "#4EB79F"
                },
                {
                    "name": "BBG",
                    "size": 4,
                    "color": "#FAAE71"
                },
                {
                    "name": "XIG",
                    "size": 1,
                    "color": "#F66D79"
                },
                {
                    "name": "BBG",
                    "size": 4,
                    "color": "#F66D79"
                },
                {
                    "name": "XIG",
                    "size": 4,
                    "color": "#4EB79F"
                },
                {
                    "name": "XIG",
                    "size": 1,
                    "color": "#FAAE71"
                },
                {
                    "name": "XIG",
                    "size": 1,
                    "color": "#F66D79"
                },
                {
                    "name": "BBG",
                    "size": 1,
                    "color": "#4EB79F"
                },
                {
                    "name": "BBG",
                    "size": 1,
                    "color": "#4EB79F"
                }
            ]
        },
        {
            "name": "optimization",
            "children": [
                {
                    "name": "REUT",
                    "size": 9,
                    "color": "#4EB79F"
                },
                {
                    "name": "XIG",
                    "size": 4,
                    "color": "#F66D79"
                },
                {
                    "name": "BBG",
                    "size": 1,
                    "color": "#F66D79"
                }
            ]
        }
    ]
};
var main = {};
main.render = render;
main.updateRenderer = updateRenderer;
main.config = {
    paddingInner: 0.8,
    paddingOuter: 1.5,
};
main.data = data;
main.element = {
    type: '#paper',
    clientWidth: 870,
    clientHeight: 870
};
main.render();

function fasfasfasf() {
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
};