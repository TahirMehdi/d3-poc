(function () {

    var fakeData = [
        {
            title: 'Acromantis',
            subhead: 'insect',
            details: '',
            list: [
                {
                    title: 'Australis',
                    value: 1871,
                    details: ''

                }, {
                    title: 'Dyaka',
                    value: 1920,
                    details: ''
                }, {
                    title: 'Elegans',
                    value: 1993,
                    details: ''
                }, {
                    title: 'Formosana',
                    value: 1911,
                    details: '(Taiwan flower mantis)'
                }, {
                    title: 'Gestri',
                    value: 1915,
                    details: '(Thai boxer mantis, Sumatran Acromantis)'
                }
            ]
        }, {
            title: 'Mantis',
            subhead: 'insect',
            details: '',
            list: [
                {
                    title: 'Acromantis australis',
                    value: 1871,
                    details: ''

                }, {
                    title: 'Acromantis dyaka',
                    value: 1920,
                    details: ''
                }, {
                    title: 'Acromantis elegans',
                    value: 1993,
                    details: ''
                }, {
                    title: 'Acromantis formosana',
                    value: 1911,
                    details: '(Taiwan flower mantis)'
                }, {
                    title: 'Acromantis gestri',
                    value: 1915,
                    details: '(Thai boxer mantis, Sumatran Acromantis)'
                }
            ]
        }, {
            title: 'Mantis',
            subhead: 'insect',
            details: '',
            list: [
                {
                    title: 'Acromantis australis',
                    value: 1871,
                    details: ''

                }, {
                    title: 'Acromantis dyaka',
                    value: 1920,
                    details: ''
                }, {
                    title: 'Acromantis elegans',
                    value: 1993,
                    details: ''
                }, {
                    title: 'Acromantis formosana',
                    value: 1911,
                    details: '(Taiwan flower mantis)'
                }, {
                    title: 'Acromantis gestri',
                    value: 1915,
                    details: '(Thai boxer mantis, Sumatran Acromantis)'
                }
            ]
        }, {
            title: 'Mantis',
            subhead: 'insect',
            details: '',
            list: [
                {
                    title: 'Acromantis australis',
                    value: 1871,
                    details: ''

                }, {
                    title: 'Acromantis dyaka',
                    value: 1920,
                    details: ''
                }, {
                    title: 'Acromantis elegans',
                    value: 1993,
                    details: ''
                }, {
                    title: 'Acromantis formosana',
                    value: 1911,
                    details: '(Taiwan flower mantis)'
                }, {
                    title: 'Acromantis gestri',
                    value: 1915,
                    details: '(Thai boxer mantis, Sumatran Acromantis)'
                }
            ]
        }, {
            title: 'Mantis',
            subhead: 'insect',
            details: '',
            list: [
                {
                    title: 'Acromantis australis',
                    value: 1871,
                    details: ''

                }, {
                    title: 'Acromantis dyaka',
                    value: 1920,
                    details: ''
                }, {
                    title: 'Acromantis elegans',
                    value: 1993,
                    details: ''
                }, {
                    title: 'Acromantis formosana',
                    value: 1911,
                    details: '(Taiwan flower mantis)'
                }, {
                    title: 'Acromantis gestri',
                    value: 1915,
                    details: '(Thai boxer mantis, Sumatran Acromantis)'
                }
            ]
        }, {
            title: 'Mantis',
            subhead: 'insect',
            details: '',
            list: [
                {
                    title: 'Acromantis australis',
                    value: 1871,
                    details: ''

                }, {
                    title: 'Acromantis dyaka',
                    value: 1920,
                    details: ''
                }, {
                    title: 'Acromantis elegans',
                    value: 1993,
                    details: ''
                }, {
                    title: 'Acromantis formosana',
                    value: 1911,
                    details: '(Taiwan flower mantis)'
                }, {
                    title: 'Acromantis gestri',
                    value: 1915,
                    details: '(Thai boxer mantis, Sumatran Acromantis)'
                }
            ]
        }, {
            title: 'Mantis',
            subhead: 'insect',
            details: '',
            list: [
                {
                    title: 'Acromantis australis',
                    value: 1871,
                    details: ''

                }, {
                    title: 'Acromantis dyaka',
                    value: 1920,
                    details: ''
                }, {
                    title: 'Acromantis elegans',
                    value: 1993,
                    details: ''
                }, {
                    title: 'Acromantis formosana',
                    value: 1911,
                    details: '(Taiwan flower mantis)'
                }, {
                    title: 'Acromantis gestri',
                    value: 1915,
                    details: '(Thai boxer mantis, Sumatran Acromantis)'
                }
            ]
        }
    ];
    var N = fakeData.length,
        H = fakeData.length-5,
        generator = d3.randomUniform(1, H - 2),
        color = d3.scaleSequential(d3.interpolateViridis).domain([0, H + 5]);
    console.log(color)
        // areaColor = color(H + 5),
        data = d3.range(0, N).map(function () {
            return generator();
        });

    var width = (window.innerWidth - 20),
        height = (window.innerHeight - 20),
        y = d3.scaleLinear().domain([0, H]).range([height, 0]),
        barWidth = width / fakeData.length;
    // var side = 0.5*width;

    var paper = d3.select('#paper')
        .attr('width', width)
        .attr('height', height)
        .canvas(true);

    paper
        .append('rect')
        .attr('width', width)
        .attr('height', height)
        .style('fill', '#000000');


    paper.append('g')
        .selectAll('rect')
        .data(fakeData)
        .enter()
        .append("rect")
        .attr("transform", function (d, i) {
            return "translate(" + i * barWidth + ")";
        })
        .attr("y", function (d) {
            return y(d);
        })
        .attr("height", function (d) {
            return height - y(d);
        })
        .attr("width", barWidth - 1)
        .attr("fill", function (d,i) {
            console.log(i)
            return color(i);
        })
        .attr("stroke", '#fff')
        .attr("stroke-width", 1)
        .attr("stroke-linejoin", "round");

    // var area = paper
    //     .append('rect')
    //     .style("fill", areaColor)
    //     .style("fill-opacity", 0.6);
})
();