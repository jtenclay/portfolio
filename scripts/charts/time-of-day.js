const D3Node = require('d3-node');
const fs = require('fs');
const simplify = require('simplify-js');

const timeOfDayData = JSON.parse(fs.readFileSync('data/music-log-time-of-day.json'));
const totalEntries = JSON.parse(fs.readFileSync('data/music-log.json')).length;
const layout = fs.readFileSync('source/partials/_time-of-day-layout.erb');

// Initialize D3 and a container element
const d3n = new D3Node({
  container: layout,
  selector: '.d3-vis__chart',
});

const width = 1440;
const height = 900;

const containerSVG = d3n.createSVG(width, height)
  .attr('viewBox', `0 0 ${width}, ${height}`)
  .style('width', '100%')
  .style('height', 'auto');

// Format data
const data = timeOfDayData.map((count, i) => (
  {
    x: i, // the time index
    y: count / totalEntries * 100, // format as percentage of total entries
  }
));

const simplifiedData = simplify(data, 0.75, true);

const x = D3Node.d3.scaleLinear()
  .domain(D3Node.d3.extent(data, d => d.x))
  .range([0, width]);

const y = D3Node.d3.scaleLinear()
  .domain([0, D3Node.d3.max(data, d => d.y)]).nice()
  .range([height, 0]);

// Draw the area
const area = D3Node.d3.area()
  .curve(D3Node.d3.curveStepBefore)
  .x(d => x(d.x))
  .y0(height)
  .y1(d => y(d.y));

containerSVG.append('path')
  .datum(data)
  .attr('class', 'd3-vis__area')
  .attr('stroke-width', 1.5)
  .attr('stroke-linejoin', 'round')
  .attr('stroke-linecap', 'round')
  .attr('d', area);

// Draw the smoothed area
const smoothedArea = D3Node.d3.area()
  .curve(D3Node.d3.curveBasis)
  .x(d => x(d.x))
  .y0(height)
  .y1(d => y(d.y));

containerSVG.append('path')
  .datum(simplifiedData)
  .attr('class', 'd3-vis__smoothed-area')
  .attr('stroke-width', 1.5)
  .attr('stroke-linejoin', 'round')
  .attr('stroke-linecap', 'round')
  .attr('d', smoothedArea);

// Create axes
const xAxis = g => g
  .attr('transform', `translate(0, ${height})`)
  .call(D3Node.d3.axisBottom(x)
    .tickValues([0, 360, 720, 1080, 1440])); // every six hours

const yAxis = g => g
  .call(D3Node.d3.axisLeft(y)
    .ticks(4));

// Reformat axes
const yAxisEl = D3Node.d3.select(d3n.document.querySelector('.d3-vis__y-axis'));

yAxisEl.append('div')
  .attr('class', 'temp')
  .call(yAxis);

yAxisEl
  .selectAll('g')
  .each((d, i, nodes) => {
    const transformY = D3Node.d3.select(nodes[i]).attr('transform').match(/,([\d.]*)\)/)[1];
    const topY = parseInt(transformY, 10) / 900 * 100;

    yAxisEl.append('div')
      .attr('class', 'd3-vis__y-tick')
      .style('top', topY + '%')
      .append('div')
      .attr('class', 'd3-vis__y-tick-text')
      .text(d + '%\xa0');
  });

const xAxisEl = D3Node.d3.select(d3n.document.querySelector('.d3-vis__x-axis'));

xAxisEl.append('div')
  .attr('class', 'temp')
  .call(xAxis);

xAxisEl
  .selectAll('g')
  .each((d, i, nodes) => {
    const transformX = D3Node.d3.select(nodes[i]).attr('transform').match(/\(([\d.]*),/)[1];
    const leftX = parseInt(transformX, 10) / 1440 * 100;

    xAxisEl.append('div')
      .attr('class', 'd3-vis__x-tick')
      .style('left', leftX + '%')
      .text(d / 60 + 'h');
  });

D3Node.d3.select(d3n.document).selectAll('.temp')
  .remove();

// Prep output
const output = d3n.html().replace(/(<\/?html>)|(<\/?head>)|(<\/?body>)/g, '');

// Write to file
fs.writeFile('source/partials/_bar-chart.html.erb', output, (err) => {
  if (err) console.log(err); // eslint-disable-line no-console
  else console.log('D3 charts created.'); // eslint-disable-line no-console
});
