import React from 'react';
import Chart from '../Chart';

class ChartContainer extends React.Component {
  state = {
    data: [],
    props: {},
  }

  chart = new Chart()

  componentDidMount() {
    this.chart
      .selection('#chart')
      .draw();

    setTimeout(() => {
      this.setState({
        data: [20, 34, 48, 60],
        props: { fill: '#F86F00' },
      });
    }, 1000);

    setTimeout(() => {
      this.setState({
        data: [30, 50, 30],
        props: { fill: '#007BC7' },
      });
    }, 2000);
  }

  componentDidUpdate() {
    this.chart
      .props(this.state.props)
      .data(this.state.data)
      .draw();
  }

  render() {
    return (
      <div id='chart' />
    );
  }
}

export default ChartContainer;
