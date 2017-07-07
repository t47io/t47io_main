import React from 'react';

import PubsLink from './PubsLink.jsx';
import PubsTitle from './PubsTitle.jsx';


const PubsThesis = ({
  title,
  url,
  sizes,
}) => (
  <div className="row PUBS__entry PUBS__thesis">
    <div className="col-lg-1 col-md-1 hidden-sm hidden-xs" />
    <div className="col-lg-10 col-md-10 col-sm-12 col-xs-12 PUBS__text">
      <p>
        <b>{'"'}</b>
        <PubsTitle title={title} />
        <b>{'"'}</b>
      </p>
      <p>
        <PubsLink
          url={url}
          icon="file-word"
          size="Stanford Library"
        />
        <PubsLink
          url="/pdf/PhD_dissertation.pdf"
          icon="file-pdf"
          size="100 MB"
        />
        <PubsLink
          url="/pdf/PhD_dissertation_figures.pdf"
          icon="file-archive"
          size="100 MB"
        />
        <PubsLink
          url="/pdf/PhD_defense_slides.pdf"
          icon="file-image"
          size="100 MB"
        />
      </p>
    </div>
    <div className="col-lg-1 col-md-1 hidden-sm hidden-xs" />
  </div>
);

PubsThesis.propTypes = {
  title: React.PropTypes.string,
  url: React.PropTypes.string,
  sizes: React.PropTypes.shape({
    dissertation: React.PropTypes.string,
    figures: React.PropTypes.string,
    slides: React.PropTypes.string,
  }),
};
PubsThesis.defaultProps = {
  title: '',
  url: '',
  sizes: {
    dissertation: '',
    figures: '',
    slides: '',
  },
};


export default PubsThesis;
