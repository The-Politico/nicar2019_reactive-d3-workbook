import React from 'react';

import Chart from 'module-nicar2019-chart';

import Map from 'module-nicar2019-map';

class ChartContainer extends React.Component {
  chart = new Chart()
  map = new Map()

  state = {
    selectedState: null,
  }

  componentDidMount() {
    this.map
      .selection('#map')
      .props({
        highlightState: this.state.selectedState,
        onClick: (selectedState) => {
          if (this.state.selectedState === selectedState) {
            this.setState({ selectedState: null });
          } else {
            this.setState({ selectedState });
          }
        },
      })
      .draw();
    this.chart
      .selection('#chart')
      .props({ filterState: this.state.selectedState })
      .draw();
  }

  componentDidUpdate() {
    this.map
      .props({ highlightState: this.state.selectedState })
      .draw();

    this.chart
      .props({ filterState: this.state.selectedState })
      .draw();
  }

  render() {
    return (
      <div className='chart-container'>
        <div id='map' />
        <div id='chart' />
      </div>
    );
  }
}

export default ChartContainer;
