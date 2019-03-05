import d3 from 'Common/js/d3';
// import * as stats from 'simple-statistics';

class ChartComponent {
  selection(selector) {
    if (!selector) return this._selection;

    this._selection = d3.select(selector);
    return this;
  }

  data(arr) {
    if (!arr) return this._data;

    this._data = arr;
    return this;
  }

  draw() {
    console.log('DRAW');
  }
}

export default ChartComponent;
