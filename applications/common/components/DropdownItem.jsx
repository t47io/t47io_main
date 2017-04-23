import React from 'react';
import { Link } from 'preact-router';


const DropdownItem = ({ title }) => (
  <li className="">
    <Link
      href={`/project/${title}`}
      activeClassName="active"
    >
      {title}
    </Link>
  </li>
);

DropdownItem.propTypes = {
  title: React.PropTypes.string,
};
DropdownItem.defaultProps = {
  title: '',
};


export default DropdownItem;
