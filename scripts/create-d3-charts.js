const D3Node = require('d3-node');
const fs = require('fs');

const timeOfDayData = JSON.parse(fs.readFileSync('data/music-log-time-of-day.json'));
const totalEntries = JSON.parse(fs.readFileSync('data/music-log.json')).length;

// Initialize D3 and a container element
const d3n = new D3Node();
// const containerSVG = d3n.createSVG(1440, 900)
//   .attr('viewBox', '0 0 1440, 900')
//   .style('width', '100%')
//   .style('height', 'auto');

// // Draw our bars
// containerSVG.selectAll('rect')
//   .data(timeOfDayData)
//   .enter()
//   .append('rect')
//   .attr('x', (d, i) => i)
//   .attr('y', 0)
//   .attr('width', 1)
//   .attr('height', d => d * 100);

const width = 1440;
const height = 900;
const margin = {
  top: 20,
  right: 30,
  bottom: 30,
  left: 40,
};

const containerSVG = d3n.createSVG(1440, 900)
  .attr('viewBox', `0 0 ${width}, ${height}`)
  .style('width', '100%')
  .style('height', 'auto');

const data = timeOfDayData.map((count, i) => (
  {
    timeIndex: i,
    count: count / totalEntries * 100, // format as percentage of total entries
  }
));

const x = D3Node.d3.scaleLinear()
  .domain(D3Node.d3.extent(data, d => d.timeIndex))
  .range([margin.left, width - margin.right]);

const y = D3Node.d3.scaleLinear()
  .domain([0, D3Node.d3.max(data, d => d.count)]).nice()
  .range([height - margin.bottom, margin.top]);

const area = D3Node.d3.area()
  .x(d => x(d.timeIndex))
  .y0(height - margin.bottom)
  .y1(d => y(d.count));

// Draw the area
containerSVG.append('path')
  .datum(data)
  .attr('fill', 'steelblue')
  .attr('stroke', 'steelblue')
  .attr('stroke-width', 1.5)
  .attr('stroke-linejoin', 'round')
  .attr('stroke-linecap', 'round')
  .attr('d', area);

// Create axes
const xAxis = g => g
  .attr('transform', `translate(0, ${height - margin.bottom})`)
  .call(D3Node.d3.axisBottom(x)
    .tickValues([0, 360, 720, 1080, 1440]) // every six hours
    .tickFormat(minute => `${minute / 60}h`)
    .tickSizeOuter(0));

const yAxis = g => g
  .attr('transform', `translate(${margin.left}, 0)`)
  .call(D3Node.d3.axisLeft(y)
    .ticks(4)
    .tickFormat(percent => `${percent}%`));

containerSVG.append('g')
  .call(xAxis);

containerSVG.append('g')
  .call(yAxis);

// Write to file
const output = d3n.svgString();
fs.writeFile('source/partials/_bar-chart.html.erb', output, (err) => {
  if (err) console.log(err); // eslint-disable-line no-console
  else console.log('D3 charts created.'); // eslint-disable-line no-console
});
