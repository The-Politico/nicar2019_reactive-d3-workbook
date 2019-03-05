import React from 'react';
import Chart from '../Chart';

class ChartContainer extends React.Component {
  chart = new Chart()

  componentDidMount() {
    this.chart
      .selection('#chart')
      .draw();

    setTimeout(() => {
      this.chart
        .data([20, 34, 48, 60])
        .props({ fill: '#F86F00' })
        .draw();
    }, 1000);

    setTimeout(() => {
      this.chart
        .data([30, 50, 30])
        .props({ fill: '#007BC7' })
        .draw();
    }, 2000);
  }

  render() {
    return (
      <div id='chart' />
    );
  }
}

export default ChartContainer;
