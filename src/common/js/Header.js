import React from 'react';

class Header extends React.Component {
  render() {
    return (
      <nav className='navbar' role='navigation' aria-label='main navigation'>
        <div className='navbar-brand'>
          <a className='is-title'>
            d3+Re<span className='red bold'>A</span>ct
          </a>
        </div>
      </nav>
    );
  }
}

export default Header;
