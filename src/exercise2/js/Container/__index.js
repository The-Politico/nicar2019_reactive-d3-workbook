import React from 'react';

import Chart from '../Chart';

import { fakeFetchVote, fakeFetchCensus } from '../utils/fakeFetch';

class ChartContainer extends React.Component {
  state = {
    censusData: null,
    voteData: null,
  }

  chart = new Chart();

  componentDidMount() {
    fakeFetchVote()
      .then(voteData => this.setState({ voteData }));

    fakeFetchCensus()
      .then(censusData => this.setState({ censusData }));

    // Fetch vote data every 5 seconds
    setInterval(() => {
      fakeFetchVote()
        .then(voteData => this.setState({ voteData }));
    }, 5000);
  }

  componentDidUpdate() {
    if (!this.state.censusData || !this.state.voteData) return;

    this.chart
      .selection('#chart')
      .voteData(this.state.voteData)
      .censusData(this.state.censusData)
      .draw();
  }

  render() {
    return (
      <div id='chart' />
    );
  }
}

export default ChartContainer;
