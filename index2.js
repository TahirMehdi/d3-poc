window.onload = () => {
    const hm = new HeatMap();
    hm.render();
};

class HeatMap {

    render() {
        const width = window.innerWidth / 2;
        const height = window.innerHeight / 2;

        const paper = d3.select('#paper')
            .append('canvas')
            .attr('width', width)
            .attr('height', height)
            .canvasResolution(1)
            .canvas(true);

        paper.append('rect')
            .attr('x', 0)
            .attr('y', 0)
            .attr('width', width)
            .attr('height', height)
            .style('stroke-width', '0px')
            .style('opacity', 0);

        const tooltip = d3.select('body').append('div').classed('tooltip', 1).style('opacity', 0).html('<a href="google.com">Hey, buddy! I\'m the tooltip!</a>');

        const mouseover = function(d) {
            tooltip.style('top', `${d3.event.pageY}px`).style('left', `${d3.event.pageX}px`).style('opacity', 1);
        };

        const mouseout = function(d) {
            tooltip.style('opacity', 0);
        };

        const mousemove = function(d) {
            tooltip.style('top', `${d3.event.pageY}px`).style('left', `${d3.event.pageX}px`);
        };
        const root = paper.append('circle')
            .attr("r", 100)
            .style("fill", "#fff")
            .attr('transform', `translate(${width / 2},${height / 2})`)
            .on('mouseenter.hover', mouseover)
            .on('mouseleave.hover', mouseout)
            .on('mousemove', mousemove)
            .on('click', () => { console.log('click'); });

    }
}

