import React from 'react';
import { Link } from 'react-router-dom';

import noArt from '../Images/NoArt.png';

import '../Styles/HomeCard.css';

function HomeCard({title, desc, image, id, type}) {
  return (
    <Link className="homecard__link" to={`/${type}/${id}`}>
      <div className="homecard">
        <div className="homecard__image">
          <div style={{backgroundImage: image ? `url(${image})` : `url(${noArt})`, borderRadius: type === 'artist' ? '50%' : (type === 'show' ? '12px' : '2px')}}></div>
        </div>
        <span>
          <h4>{title}</h4>
          <p>{desc}</p>
        </span>
      </div>
    </Link>
  );
}

export default HomeCard;

/*import React from 'react';
import { useHistory } from 'react-router-dom';

import '../Styles/HomeCard.css';

function HomeCard({title, desc, image, id, type}) {
  const history = useHistory();
  return (
    <div className="homecard__link" onClick={() => history.push(`/${type}/${id}`)}>
      <div className="homecard">
        <div className="homecard__image">
          <div style={{backgroundImage: `url(${image})`, borderRadius: type === 'artist' ? '50%' : '1px'}}></div>
        </div>
        <span>
          <h4>{title}</h4>
          <p>{desc}</p>
        </span>
      </div>
    </div>
  );
}

export default HomeCard;*/