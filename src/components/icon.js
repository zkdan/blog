import React from 'react';
import icons from '../images/icons';

const Icon =({url, name})=>{
  const c = name.toUpperCase();
  return (
    <li>
      <a href={url}>
        <svg viewBox={icons[c].viewBox}>
          <path d={icons[c].path}/>
        </svg>
      </a>
    </li>
  )
}
export default Icon;