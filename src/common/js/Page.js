import React from 'react';

import Header from './Header';

const Page = (props) => (
  <div>
    <Header />
    <section className='hero is-large is-bold'>
      <div className='hero-body'>
        {props.children}
      </div>
    </section>
  </div>
);

export default Page;
