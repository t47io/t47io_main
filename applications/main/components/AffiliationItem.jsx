import React from 'react';
import Waypoint from 'react-waypoint';
import AffiliationRewardItem from './AffiliationRewardItem.jsx';
import AffiliationRole from './AffiliationRole.jsx';


const AffiliationItem = ({
  year,
  title,
  url,
  geo,
  role,
  rewards,
  tag,
  scroll,
  onPositionChange,
}) => {
  const zIndex = (year === scroll) ? 15 : 10;
  const contentClassName = (year === scroll) ? 'active' : '';

  return (
    <div className="AFFILIATION__entry" id={`story_${year}`} style={{ zIndex }}>
      <div className={`AFFILIATION__content ${contentClassName}`} >
        <span className="AFFILIATION__year">{year}</span>
        <div className="AFFILIATION__panel row">
          <div className="AFFILIATION__title col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <a href={url} target="_blank" rel="noopener noreferrer external">
              <div className="SPRITE">
                <div className={`SPRITE__affiliation-${tag}`} />
              </div>
            </a>
            <br />
            <a href={url} target="_blank" rel="noopener noreferrer external">
              {title}
              <i className="fa fa-fw fa-sm fa-link-ext" />
            </a>
            <br />
            <span>{geo}</span>
          </div>
          <div className="AFFILIATION__text col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <AffiliationRole {...role} />
            <br className="hidden-xs hidden-sm" />
            <table className="hidden-xs hidden-sm">
              <tbody>
                {rewards.map(item => (<AffiliationRewardItem {...item} />))}
              </tbody>
            </table>
          </div>
        </div>
        <Waypoint onPositionChange={onPositionChange(year)} />
      </div>
    </div>
  );
};

AffiliationItem.propTypes = {
  year: React.PropTypes.number.isRequired,
  title: React.PropTypes.string.isRequired,
  url: React.PropTypes.string.isRequired,
  geo: React.PropTypes.string.isRequired,
  role: React.PropTypes.object.isRequired,
  rewards: React.PropTypes.array.isRequired,
  tag: React.PropTypes.string.isRequired,
  scroll: React.PropTypes.number.isRequired,
  onPositionChange: React.PropTypes.func.isRequired,
};


export default AffiliationItem;

