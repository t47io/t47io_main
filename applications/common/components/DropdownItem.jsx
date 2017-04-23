import React from 'react';
import { Link } from 'react-router-component';


const DropdownItem = ({
  item,
}) => (
  <li className="">
    <Link
      href={`/project/${item}`}
      activeClassName="active"
    >
      {item}
    </Link>
  </li>
);

DropdownItem.propTypes = {
  item: React.PropTypes.string,
};
DropdownItem.defaultProps = {
  item: '',
};


export default DropdownItem;
