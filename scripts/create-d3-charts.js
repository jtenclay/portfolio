const D3Node = require('d3-node');
const fs = require('fs');

const timeOfDayData = JSON.parse(fs.readFileSync('data/music-log-time-of-day.json'));

// Initialize D3 and a container element
const d3n = new D3Node();
const containerSVG = d3n.createSVG(1440, 900)
  .attr('viewBox', '0 0 1440, 900')
  .style('width', '100%')
  .style('height', 'auto');

// Draw our bars
containerSVG.selectAll('rect')
  .data(timeOfDayData)
  .enter()
  .append('rect')
  .attr('x', (d, i) => i)
  .attr('y', 0)
  .attr('width', 1)
  .attr('height', d => d * 100);

// Write to file
const output = d3n.svgString();
fs.writeFile('source/partials/_bar-chart.html.erb', output, (err) => {
  if (err) console.log(err); // eslint-disable-line no-console
  else console.log('D3 charts created.'); // eslint-disable-line no-console
});
