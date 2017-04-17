import React from 'react';

import Carousel from '../components/Carousel.jsx';
import FeatureList from '../components/FeatureList.jsx';
import PageTitle from '../components/PageTitle.jsx';
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
          <PageTitle
            title={title}
            description={description}
            image={imgCelica}
          />
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
    </div>
  );
};

CelicaPage.propTypes = {

};
CelicaPage.defaultProps = {

};


export default CelicaPage;
