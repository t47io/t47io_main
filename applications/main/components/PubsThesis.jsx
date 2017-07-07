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
      <h5 className="PUBS__find-more text-center">
        <span className="fa-stack">
          <i className="fa fa-fw fa-blank fa-stack-2x text-main-light" />
          <i className="fa fa-fw fa-graduation-cap fa-stack-1x text-white" />
        </span>
        Ph.D. Dissertation
      </h5>
      <h3 className="PUBS__thesis-title">
        <PubsTitle title={title} />
        <a
          href={url}
          target="_blank" rel="noopener noreferrer external"
        >
          <i className="fa fa-fw fa-sm fa-link-ext" />
        </a>
      </h3>
      <p>
        <PubsLink
          url="/pdf/PhD_dissertation.pdf"
          icon="file-pdf"
          size="100 MB"
          data-tip="Augmented Dissertation"
          data-for="PUBS__tooltip"
        />
        <PubsLink
          url="/pdf/PhD_dissertation_figures.pdf"
          icon="file-archive"
          size="100 MB"
          data-tip="Hi-Resolution Figures"
          data-for="PUBS__tooltip"
        />
        <PubsLink
          url="/pdf/PhD_defense_slides.pdf"
          icon="file-image"
          size="100 MB"
          data-tip="Defense Slides"
          data-for="PUBS__tooltip"
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
