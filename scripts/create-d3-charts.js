const D3Node = require('d3-node');
const fs = require('fs');

const timeOfDayData = JSON.parse(fs.readFileSync('data/music-log-time-of-day.json'));
const totalEntries = JSON.parse(fs.readFileSync('data/music-log.json')).length;

// Initialize D3 and a container element
const d3n = new D3Node({
  container: `
    <div class="time-of-day">
      <div class="time-of-day__y-axis">
        <div class="time-of-day__y-axis-line"></div>
      </div>
      <div class="time-of-day__chart">
        <div class="time-of-day__tooltip"></div>
      </div>
      <div class="time-of-day__x-axis">
        <div class="time-of-day__x-axis-line"></div>
      </div>
    </div>`,
  selector: '.time-of-day__chart',
});
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
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
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
  .call(D3Node.d3.axisLeft(y)
    .ticks(4)
    .tickFormat(percent => `${percent}%`));

const yAxisEl = D3Node.d3.select(d3n.document.querySelector('.time-of-day__y-axis'));

yAxisEl.append('div')
  .attr('class', 'temp')
  .call(yAxis);

yAxisEl
  .selectAll('g')
  .each((d, i, nodes) => {
    const transformY = D3Node.d3.select(nodes[i]).attr('transform').match(/,([\d.]*)\)/)[1];
    const topY = parseInt(transformY, 10) / 900 * 100;

    yAxisEl.append('div')
      .attr('class', 'time-of-day__y-tick')
      .style('top', topY + '%')
      .text(d + '%\xa0');
  });

const xAxisEl = D3Node.d3.select(d3n.document.querySelector('.time-of-day__x-axis'));

xAxisEl.append('div')
  .attr('class', 'temp')
  .call(xAxis);

xAxisEl
  .selectAll('g')
  .each((d, i, nodes) => {
    const transformX = D3Node.d3.select(nodes[i]).attr('transform').match(/\(([\d.]*),/)[1];
    const leftX = parseInt(transformX, 10) / 1440 * 100;

    xAxisEl.append('div')
      .attr('class', 'time-of-day__x-tick')
      .style('left', leftX + '%')
      .text(d / 60 + 'h');
  });

D3Node.d3.select(d3n.document).selectAll('.temp')
  .remove();

// containerSVG.append('g')
//   .call(yAxis);

// Write to file
let output = d3n.html();

output += `
  <script>
    var totalEntries = ${totalEntries};
    var timeOfDayData = ${JSON.stringify(timeOfDayData)};
  </script>
`;

fs.writeFile('source/partials/_bar-chart.html.erb', output, (err) => {
  if (err) console.log(err); // eslint-disable-line no-console
  else console.log('D3 charts created.'); // eslint-disable-line no-console
});
