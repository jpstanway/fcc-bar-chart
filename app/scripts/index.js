
// get GDP/year data
const dataset = [
    [1, 1920],
    [2, 1930],
    [3, 1940],
    [4, 1950],
    [5, 1960],
    [6, 1970],
    [7, 1980],
    [8, 1990],
    [9, 2000],
    [10, 2010]
];

// set chart dimensions
const w = 960;
const h = 500;
const padding = 20;

// set x and y scales
const xScale = d3.scaleLinear()
                .domain([0, d3.max(dataset, (d) => d[0])])
                .range([padding, w - padding]);

const yScale = d3.scaleLinear()
                .domain([d3.min(dataset, (d) => d[1]), d3.max(dataset, (d) => d[1])])
                .range([h - padding, padding]);

// create svg area in container
const svg = d3.select('#container')
                .append('svg')
                .attr('width', w)
                .attr('height', h);

// set axes and append to DOM
const xAxis = d3.axisBottom(xScale);
const yAxis = d3.axisRight(yScale);                

svg.append('g')
    .attr('transform', `translate(0, ${h - padding})`)
    .attr('id', 'x-axis')
    .call(xAxis);

svg.append('g')
    .attr('transform', `translate(0, 0)`)
    .attr('id', 'y-axis')
    .call(yAxis);