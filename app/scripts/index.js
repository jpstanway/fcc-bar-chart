
// API url and variables
let req, json, date;
let dataset = [];
const url = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json';

// get JSON data
req = new XMLHttpRequest();
req.open('GET', url, true);
req.send();
req.onload = function() {
    json = JSON.parse(req.responseText);
    // loop through json data
    json.data.forEach(function(item) {
        // get just the year from the date string
        const date = Date.parse(item[0]);
        dataset.push([date, item[1], item[0]]);
    });

    // set chart dimensions
    const w = 960;
    const h = 500;
    const padding = 20;

    // set x and y scales
    const xScale = d3.scaleLinear()
                    .domain([d3.min(dataset, (d) => d[0]), d3.max(dataset, (d) => d[0])])
                    .range([padding, w - padding]);

    const yScale = d3.scaleLinear()
                    .domain([0, d3.max(dataset, (d) => d[1])])
                    .range([h - padding, padding]);

    // create tooltip
    const tip = d3.tip()
                    .attr('class', 'd3-tip')
                    .attr('id', 'tooltip')
                    .html((d) => {
                        d3.select('#tooltip').attr('data-date', d[2]);
                        const formatTime = d3.timeFormat("%B %Y");
                        const formatNum = d3.format("~s")(d[1] * 1000000000);
                        return `${formatTime(new Date(d[2]))}<br>$${formatNum}`;
                    });                    

    // create svg area in container
    const svg = d3.select('#container')
                    .append('svg')
                    .attr('width', w)
                    .attr('height', h)
                    .call(tip);               

    // create bar elements and text for tooltips
    svg.selectAll('rect')
        .data(dataset)
        .enter()
        .append('rect')
        .attr('width', 3.5)
        .attr('height', (d) => (h - padding) - yScale(d[1]))
        .attr('x', (d) => xScale(d[0]))
        .attr('y', (d) => yScale(d[1]))
        .attr('class', 'bar')
        .attr('data-date', (d) => d[2])
        .attr('data-gdp', (d) => d[1])
        .style('fill', '#39ff14')
        .on('mouseover', tip.show)
        .on('mouseout', tip.hide);

    // set axes and append to DOM
    const xAxis = d3.axisBottom(xScale)
                    .tickFormat(d3.timeFormat('%Y'));
    const yAxis = d3.axisRight(yScale);                

    svg.append('g')
        .attr('transform', `translate(0, ${h - padding})`)
        .attr('id', 'x-axis')
        .call(xAxis)
    
    svg.append('g')
        .attr('transform', 'translate(0, 0)')
        .attr('id', 'y-axis')
        .call(yAxis);

    // set text for axes and append to DOM
    svg.append('text')
        .attr('transform', `translate(440, ${h - padding - 10})`)
        .attr('class', 'axis-text')
        .text('Year (Quarterly)')
        .style('pointer-events', 'none');

    svg.append('text')
       .attr('transform', 'translate(70, 290)rotate(270)')
       .attr('class', 'axis-text')
       .text('GDP (in billions)');   
};