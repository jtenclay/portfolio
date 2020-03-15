const D3Node = require('d3-node');
const fs = require('fs');

const entries = JSON.parse(fs.readFileSync('data/music-log.json'));
const tags = Object.keys(JSON.parse(fs.readFileSync('data/music-log-totals.json')).entries_by_tag);
const layout = fs.readFileSync('source/partials/_tags-layout.erb');

// Initialize D3 and a container element
const d3n = new D3Node({
  container: layout,
  selector: '.d3-vis__chart',
});

const width = 1440;
const height = 60;

tags.forEach((tag) => {
  const containerSVG = d3n.createSVG(width, height)
    .attr('viewBox', `0 0 ${width}, ${height}`)
    .attr('preserveAspectRatio', 'none')
    .attr('data-tag', tag)
    .attr('class', tag === 'improv' ? 'active' : '')
    .style('width', '100%')
    .style('height', '60px');

  // Format data
  const data = entries.map((entry, i) => (
    {
      x: i, // the date
      y: entry.tags.includes(tag) ? 1 : 0, // format as percentage of total entries
    }
  ));

  const x = D3Node.d3.scaleLinear()
    .domain(D3Node.d3.extent(data, d => d.x))
    .range([0, width]);

  const y = D3Node.d3.scaleLinear()
    .domain([0, 1])
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
    .attr('d', area);

  D3Node.d3.select(d3n.document.querySelector('.d3-vis__tags'))
    .append('div')
    .text(tag);
});

// Prep output
const output = d3n.html().replace(/(<\/?html>)|(<\/?head>)|(<\/?body>)/g, '');

// Write to file
fs.writeFile('source/partials/_tags-chart.html.erb', output, (err) => {
  if (err) console.log(err); // eslint-disable-line no-console
  else console.log('D3 charts created.'); // eslint-disable-line no-console
});
