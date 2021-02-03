import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
/* import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons'; */

const Navbar = (props) => {
  return (
    <nav className='navbar bg-primary'>
      <h1>
        <i className={props.icon} />
        {props.title}
      </h1>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/about'>About</Link>
        </li>
      </ul>
    </nav>
  );
};

Navbar.defaultProps = {
  title: 'Github finder',
  icon: 'fa fa-github',
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
};

export default Navbar;
