const D3Node = require('d3-node');
const fs = require('fs');

const rawLogData = JSON.parse(fs.readFileSync('data/everyday-log.json'));
const erbLayout = fs.readFileSync('source/partials/_everyday-chart-layout.erb');

// Format data into weeks
const weekData = [{
  date: rawLogData[0].date,
  bikeMiles: 0,
  wandrerMiles: 0,
}];
rawLogData.forEach(dayEntry => {
  const date = new Date(dayEntry.date);
  let week = weekData[weekData.length - 1];

  if (date.getDay() === 1) {
    // If it's a Monday, start a new week
    week = {
      date: dayEntry.date,
      bikeMiles: 0,
      wandrerMiles: 0,
    };
    weekData.push(week);
  }

  week.bikeMiles += dayEntry.bike_miles;
  week.wandrerMiles += dayEntry.wandrer_miles;
});

// Initialize D3 and a container element
const d3n = new D3Node({
  container: erbLayout,
  selector: '.d3-vis__chart',
});

const width = 1440;
const height = 900;

const containerSVG = d3n.createSVG(width, height)
  .attr('viewBox', `0 0 ${width}, ${height}`)
  .attr('aria-labelledby', 'everyday-chart-desc')
  .style('width', '100%')
  .style('height', 'auto')
  .attr('role', 'img');

containerSVG.append('desc')
  .text('Bar chart with fitness activities on the y-axis and date on the x-axis')
  .attr('id', 'everyday-chart-desc');

// Format data
const data = weekData.map(datum => (
  {
    x: new Date(datum.date),
    y: datum.bikeMiles,
  }
));

const x = D3Node.d3.scaleTime()
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

// Create axes
const xAxis = g => g
  .attr('transform', `translate(0, ${height})`)
  .call(D3Node.d3.axisBottom(x)
    .ticks(4));

const yAxis = g => g
  .call(D3Node.d3.axisLeft(y)
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

      yAxisEl.append('div')
      .attr('class', 'd3-vis__y-tick')
      .style('top', topY + '%')
      .append('div')
      .attr('class', 'd3-vis__y-tick-text')
      .text(d + 'mi\xa0');
    });
}

reformatYAxis(yAxis, '.d3-vis__y-axis--uncropped');

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

// Write to file
fs.writeFile('source/partials/_everyday-chart.html.erb', output, (err) => {
  if (err) console.log(err); // eslint-disable-line no-console
  else console.log('D3 charts created.'); // eslint-disable-line no-console
});
