import React from 'react';
import ReactDOM from 'react-dom';
import Page from '../../common/js/Page';

import 'Common/scss/main.scss';
import '../scss/styles.scss';

import Container from './Container';

const App = () => (
  <Page>
    <Container />
  </Page>
);

ReactDOM.render(<App />, document.getElementById('app'));
