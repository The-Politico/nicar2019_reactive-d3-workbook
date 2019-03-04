import d3 from 'Common/js/d3';
import merge from 'lodash/merge';

class ChartComponent {
  selection(selector) {
    if (!selector) return this._selection;

    this._selection = d3.select(selector);
    return this;
  }

  defaultProps = {
    stroke: '#ccc',
    strokeWidth: '2px',
    fill: 'steelblue',
    count: 0,
  }

  props(obj) {
    if (!obj) return this._props || this.defaultProps;

    this._props = merge(this._props || this.defaultProps, obj);
    return this;
  }

  defaultData = [60, 40, 20]

  data(arr) {
    if (!arr) return this._data || this.defaultData;

    this._data = arr;
    return this;
  }

  draw() {
    const data = this.data();
    const props = this.props();

    const node = this.selection().node();
    const { width, height } = node.getBoundingClientRect();
    const t = d3.transition()
      .duration(750);

    const g = this.selection()
      .appendSelect('svg')
      .attr('width', width)
      .attr('height', height)
      .appendSelect('g')
      .attr('transform', `translate(${width / 2 - 62}, 60)`);

    const circles = g.selectAll('circle')
      .data(data, (d, i) => i);

    circles
      .style('fill', props.fill)
      .style('stroke', props.stroke);

    circles.enter().append('circle')
      .style('fill', props.fill)
      .style('stroke', props.stroke)
      .style('stroke-width', props.strokeWidth)
      .attr('cy', '0')
      .attr('cx', (d, i) =>
        data.slice(0, i).reduce((a, b) => a + b, 0) + (d / 2)
      )
      .merge(circles)
      .transition(t)
      .attr('cx', (d, i) =>
        data.slice(0, i).reduce((a, b) => a + b, 0) + (d / 2)
      )
      .attr('r', d => d / 2);

    circles.exit()
      .transition(t)
      .attr('r', 0)
      .remove();
  }
}

export default ChartComponent;
