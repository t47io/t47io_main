import React from 'react';
import ReactTooltip from 'react-tooltip';

import Carousel from '../components/Carousel.jsx';
import FeatureList from '../components/FeatureList.jsx';
import SectionTitle from '../components/SectionTitle.jsx';

const imgCelica = require('../images/pm_celica.jpg');


const CelicaPage = ({
  project,
  title,
  description,
  carousels,
  lists,
  subtitles,
}) => {
  if (!title) {
    return null;
  }

  return (
    <div>
      <div className="row">
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center">
          <h1>{title}</h1>
          <p className="lead">{description}</p>
          <p className="thumbnail">
            <a
              href="/img/t47/t47_celica.jpg"
              target="_blank" rel="noopener noreferrer"
            >
              <img
                src={imgCelica}
                alt={title}
                style={{ maxWidth: '100%' }}
              />
            </a>
          </p>
          <hr />
          <SectionTitle
            title={subtitles.story.title}
            icon={subtitles.story.icon}
          />
          <br />
        </div>
      </div>
      <div className="row">
        <FeatureList {...lists[0]} />
        <Carousel
          items={carousels[0]}
          index={1}
          project={project}
        />
      </div>
      <div className="row">
        <Carousel
          items={carousels[1]}
          index={2}
          project={project}
        />
        <FeatureList {...lists[1]} />
      </div>
      <div className="row">
        <FeatureList {...lists[2]} />
        <Carousel
          items={carousels[2]}
          index={3}
          project={project}
        />
      </div>

      <ReactTooltip effect="solid" place="top" id="PROJECT__tooltip" />
    </div>
  );
};

CelicaPage.propTypes = {

};
CelicaPage.defaultProps = {

};


export default CelicaPage;
