import d3 from 'Common/js/d3';
import * as stats from 'simple-statistics';

class ChartComponent {
  selection(selector) {
    if (!selector) return this._selection;

    this._selection = d3.select(selector);
    return this;
  }

  voteData(arr) {
    if (!arr) return this._voteData;

    this._voteData = arr;
    return this;
  }

  censusData(arr) {
    if (!arr) return this._censusData;

    this._censusData = arr;
    return this;
  }

  draw() {
    const margin = 60;
    const node = this.selection().node();
    const { width } = node.getBoundingClientRect();
    const height = width;
    const t = d3.transition()
      .duration(750);

    const voteData = this.voteData();
    const censusData = this.censusData();

    const nonWhitePercent = Object.keys(censusData).map(fips => censusData[fips]);

    const x = d3.scaleLinear()
      .domain([1.1, -0.1]) // plus a little offset
      .range([0, width - margin]);

    const y = d3.scaleLinear()
      .domain([
        d3.min(nonWhitePercent) - 0.1,
        d3.max(nonWhitePercent) + 0.1,
      ])
      .range([height - margin, 0]);

    const g = this.selection()
      .appendSelect('svg')
      .attr('width', width)
      .attr('height', height)
      .appendSelect('g')
      .attr('transform', `translate(${margin / 2}, ${margin / 2})`);

    g.appendSelect('rect')
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', width - margin)
      .attr('height', height - margin)
      .style('fill', '#eee');

    const dots = g.selectAll('.dot')
      .data(voteData, d => d.fips);

    dots.enter().append('circle')
      .attr('class', 'dot')
      .style('stroke-width', '1px')
      .style('fill-opacity', 0.3)
      .attr('r', 5)
      .attr('cy', d => y(censusData[d.fips]))
      .attr('cx', d => x(d.dem))
      .merge(dots)
      .style('fill', d => d.dem > 0.5 ? '#3571C0' : '#FE5C40')
      .style('stroke', d => d.dem > 0.5 ? '#3571C0' : '#FE5C40')
      .transition(t)
      .attr('cy', d => y(censusData[d.fips]))
      .attr('cx', d => x(d.dem));

    const forLinReg = voteData.map((d, i) => [d.dem, censusData[d.fips]]);
    // calculate linear regression and correlations
    const linReg = stats.linearRegression(forLinReg);

    // Draw line of best fit
    let x1 = d3.min(voteData, d => d.dem);
    let x2 = d3.max(voteData, d => d.dem);
    let y1 = d3.min(voteData, d => d.dem) * linReg.m + linReg.b;
    let y2 = d3.max(voteData, d => d.dem) * linReg.m + linReg.b;

    const yMin = y.domain()[0];
    const yMax = y.domain()[1];
    // Check y overflow for positive slope
    if (linReg.m > 0) {
      if (y1 < yMin) {
        x1 = (yMin - linReg.b) / linReg.m;
        y1 = yMin;
      }
      if (y2 > yMax) {
        x2 = (yMax - linReg.b) / linReg.m;
        y2 = yMax;
      }
    // for negative slope
    } else {
      if (y1 > yMax) {
        x1 = (yMax - linReg.b) / linReg.m;
        y1 = yMax;
      }
      if (y2 < yMin) {
        x2 = (yMin - linReg.b) / linReg.m;
        y2 = yMin;
      }
    }

    g.appendSelect('line', 'linReg')
      .style('stroke', 'black')
      .style('stroke-width', 3)
      .transition(t)
      .attr('x1', x(x1))
      .attr('x2', x(x2))
      .attr('y1', y(y1))
      .attr('y2', y(y2));

    g.appendSelect('text', 'axis dem')
      .attr('x', 0)
      .attr('y', height - margin / 2 - 15)
      .text('← More Dem');
    g.appendSelect('text', 'axis gop')
      .attr('x', width - margin)
      .attr('y', height - margin / 2 - 15)
      .text('More GOP →')
      .style('text-anchor', 'end');
    g.appendSelect('text', 'axis max')
      .attr('x', -100)
      .attr('y', -5)
      .attr('transform', 'rotate(-90, 0, 0)')
      .text('Least white →');
  }
}

export default ChartComponent;
