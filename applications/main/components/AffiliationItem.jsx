import React from 'react';

import AffiliationRewardItem from './AffiliationRewardItem.jsx';
import AffiliationRole from './AffiliationRole.jsx';
import WebAnimation from '../../common/components/WebAnimation.jsx';


const AffiliationItem = ({
  year,
  title,
  url,
  geo,
  role,
  rewards,
  tag,
  shouldAnimate,
}) => {
  const zIndex = shouldAnimate ? 15 : 10;
  const contentClassName = shouldAnimate ? 'active' : '';

  return (
    <WebAnimation
      className="AFFILIATION__entry"
      keyframes={[]}
      timing={{}}
      shouldAnimate={shouldAnimate}
      style={{ zIndex }}
    >
      <div className={`AFFILIATION__content ${contentClassName}`}>
        <span className="AFFILIATION__year">{year}</span>
        <div className="AFFILIATION__panel row">
          <div className="AFFILIATION__title col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <a
              href={url}
              target="_blank" rel="noopener noreferrer external"
            >
              <div className="SPRITE">
                <div className={`SPRITE__affiliation-${tag}`} />
              </div>
            </a>
            <br />
            <a
              href={url}
              target="_blank" rel="noopener noreferrer external"
            >
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
                {rewards.map((item, i) => (
                  <AffiliationRewardItem
                    key={`AFFILIATION__reward-${year}-${i}`}
                    {...item}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </WebAnimation>
  );
};

AffiliationItem.propTypes = {
  year: React.PropTypes.number,
  title: React.PropTypes.string,
  url: React.PropTypes.string,
  geo: React.PropTypes.string,
  role: React.PropTypes.object,
  rewards: React.PropTypes.arrayOf(React.PropTypes.object),
  tag: React.PropTypes.string,
  shouldAnimate: React.PropTypes.bool,
};
AffiliationItem.defaultProps = {
  year: NaN,
  title: '',
  url: '',
  geo: '',
  role: {},
  rewards: [],
  tag: '',
  shouldAnimate: false,
};


export default AffiliationItem;

