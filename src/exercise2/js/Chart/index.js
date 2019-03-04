import d3 from './d3';
import merge from 'lodash/merge';

export default () => ({
  /**
   * Develop your chart in this render function.
   *
   * For more details about this pattern, see Mike Bostock's proposal for
   * reusable charts: https://bost.ocks.org/mike/chart/
   */
  render() {
    /**
     * Set default chart properties in this object. Users can overwrite them
     * by passing a props object through the module's create or update methods.
     */
    let props = {
      margins: {
        top: 10,
        right: 5,
        bottom: 10,
        left: 5,
      },
    };

    function chart(selection) {
      selection.each((data, i, elements) => {
        /**
         * YOUR D3 CODE HERE 📈 📊 🌐
         */
        const node = elements[i]; // the selected element
        const { width, height } = node.getBoundingClientRect();
        const { margins } = props;

        const g = d3
          .select(node)
          .appendSelect('svg') // see docs in ./d3.js
          .attr('width', width)
          .attr('height', height)
          .appendSelect('g')
          .attr('transform', `translate(${margins.left}, ${margins.top})`);
      });
    }

    /**
     * Getter-setters merge any user-provided properties with the defaults.
     */
    chart.props = obj => {
      if (!obj) return props;
      props = merge(props, obj);
      return chart;
    };

    return chart;
  },

  /**
   * Draws the chart by calling the idempotent render function with
   * a selected element.
   */
  draw() {
    const chart = this.render().props(this._props);

    d3.select(this._selection)
      .datum(this._data)
      .call(chart);
  },

  /**
   * Creates the chart initially.
   */
  create(selection, data, props = {}) {
    this._selection = selection;
    this._data = data;
    this._props = props;

    this.draw();
  },

  /**
   * Updates the chart with new data and/or props.
   */
  update(data, props = {}) {
    this._data = data || this._data;
    this._props = merge({}, this._props, props);
    this.draw();
  },
});
