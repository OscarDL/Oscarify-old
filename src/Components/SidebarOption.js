import React from 'react';
import { Link } from "react-router-dom";

import '../Styles/SidebarOption.css';

function SidebarOption({ id, title, type, Icon }) {
  return (
    <Link to={id !== '' && `/${type}/${id}`} className='sidebarOption'>
      {id !== ''
        &&
      <span className="sidebarOption__link">
        {Icon !== '' && <Icon className="sidebarOption__icon" size="24px"/>}
        {title}
      </span>}
    </Link>
  );
}

export default SidebarOption;