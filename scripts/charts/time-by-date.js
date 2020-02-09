const D3Node = require('d3-node');
const fs = require('fs');

const timeByDateData = JSON.parse(fs.readFileSync('data/music-log-by-date.json'));
const erbLayout = fs.readFileSync('source/partials/_time-by-date-layout.erb');

// Initialize D3 and a container element
const d3n = new D3Node({
  container: erbLayout,
  selector: '.d3-vis__chart',
});

const width = 1440;
const height = 900;

const containerSVG = d3n.createSVG(width, height)
  .attr('viewBox', `0 0 ${width}, ${height}`)
  .style('width', '100%')
  .style('height', 'auto');

// Format data
const data = timeByDateData.map(datum => (
  {
    x: new Date(datum.date),
    y: datum.duration,
  }
));

const x = D3Node.d3.scaleTime()
  .domain(D3Node.d3.extent(data, d => d.x))
  .range([0, width]);

const y = D3Node.d3.scaleLinear()
  .domain([0, D3Node.d3.max(data, d => d.y)]).nice()
  .range([height, 0]);

const croppedY = D3Node.d3.scaleLinear()
  .domain([0, 120]).nice()
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

// Create axes
const xAxis = g => g
  .attr('transform', `translate(0, ${height})`)
  .call(D3Node.d3.axisBottom(x)
    .ticks(4));

const yAxis = g => g
  .call(D3Node.d3.axisLeft(y)
    .ticks(4));

const croppedYAxis = g => g
  .call(D3Node.d3.axisLeft(croppedY)
    .ticks(4));

// Reformat axes

function reformatYAxis(axis, selector) {
  const yAxisEl = D3Node.d3.select(d3n.document.querySelector(selector));

  yAxisEl.append('div')
    .attr('class', 'temp')
    .call(axis);

  yAxisEl
    .selectAll('g')
    .each((d, i, nodes) => {
      const transformY = D3Node.d3.select(nodes[i]).attr('transform').match(/,([\d.]*)\)/)[1];
      const topY = parseInt(transformY, 10) / 900 * 100;

      // Format hours and minutes
      const hours = Math.floor(d / 60);
      const minutes = d % 60;

      yAxisEl.append('div')
        .attr('class', 'd3-vis__y-tick')
        .style('top', topY + '%')
        .append('div')
        .attr('class', 'd3-vis__y-tick-text')
        .text(`${hours}:${minutes > 9 ? minutes : '0' + minutes}`);
    });
}

reformatYAxis(yAxis, '.d3-vis__y-axis--uncropped');
reformatYAxis(croppedYAxis, '.d3-vis__y-axis--cropped');

const xAxisEl = D3Node.d3.select(d3n.document.querySelector('.d3-vis__x-axis'));

xAxisEl.append('div')
  .attr('class', 'temp')
  .call(xAxis);

xAxisEl
  .selectAll('g')
  .each((d, i, nodes) => {
    const $node = D3Node.d3.select(nodes[i]);
    const transformX = $node.attr('transform').match(/\(([\d.]*),/)[1];
    const leftX = parseInt(transformX, 10) / 1440 * 100;

    xAxisEl.append('div')
      .attr('class', 'd3-vis__x-tick')
      .style('left', leftX + '%')
      .text($node.text());
  });

D3Node.d3.select(d3n.document).selectAll('.temp')
  .remove();

// Prep output
const output = d3n.html().replace(/(<\/?html>)|(<\/?head>)|(<\/?body>)/g, '');

// const layoutWithFullGraph = createChart(erbLayout, null, '.d3-vis--time-by-date');
// const layoutWithBothGraphs = createChart(layoutWithFullGraph, 120, '.d3-vis--time-by-date-cropped');

const scaleAmount = D3Node.d3.scaleLinear()
  .domain([0, D3Node.d3.max(data, d => d.y)])
  .nice()
  .domain()[1] / 120;

const finalOutput = output + `
  <style type="text/css">
    .d3-vis--cropped-graph .d3-vis__chart svg {
      transform: scaleY(${scaleAmount});
    }
  </style>
`;


// Write to file
fs.writeFile('source/partials/_time-by-date-chart.html.erb', finalOutput, (err) => {
  if (err) console.log(err); // eslint-disable-line no-console
  else console.log('D3 charts created.'); // eslint-disable-line no-console
});
