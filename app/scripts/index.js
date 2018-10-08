
// get GDP/year data
const dataset = [
    [1910, 0],
    [1920, 1],
    [1930, 2],
    [1940, 3],
    [1950, 4],
    [1960, 5],
    [1970, 6],
    [1980, 7],
    [1990, 8],
    [2000, 9],
    [2010, 10]
];

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

// create svg area in container
const svg = d3.select('#container')
                .append('svg')
                .attr('width', w)
                .attr('height', h);

// create bar elements
svg.selectAll('rect')
    .data(dataset)
    .enter()
    .append('rect')
    .attr('x', (d) => xScale(d[0]))
    .attr('y', (d) => yScale(d[1]))
    .attr('width', 25)
    .attr('height', (d) => (h - padding) - yScale(d[1]))
    .attr('class', 'bar')
    .attr('data-gdp', (d) => d[0])
    .attr('data-date', (d) => d[1]);               

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