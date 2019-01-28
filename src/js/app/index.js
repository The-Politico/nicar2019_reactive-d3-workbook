import React from 'react';

import Header from './Header';
import ChartComponent from './../component';

const App = () => (
  <div>
    <Header />
    <section className="hero is-large is-bold">
      <div className="hero-body">
        <ChartComponent />
      </div>
    </section>
  </div>
);

export default App;
