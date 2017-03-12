import React from 'react';

import Scrollspy from '../../common/components/Scrollspy.jsx';
import SectionHeader from '../../common/components/SectionHeader.jsx';
import SkillsPanel from '../components/SkillsPanel.jsx';

import {
  SKILLS_LEFT,
  SKILLS_RIGHT,
} from '../constants/sectionTypes.js';

import '../stylesheets/SkillsSection.scss';


const SkillsSection = ({
  data: {
    items = {
      left: [],
      right: [],
    },
  },
  animations: {
    header = true,
    left = items.left.length,
    right = items.right.length,
  },
  actions: {
    animateHeader = () => {},
    animateLeftBars = () => {},
    animateRightBars = () => {},
  },
}) => (
  <section id="SKILLS__section">
    <div className="UTIL__spacer-hg SKILLS__trigger" />
    <SectionHeader
      title="my skills"
      subtitle="what I learned"
      proxyId="SKLLLS__header"
      shouldAniamte={header}
      onToggleAnimation={animateHeader}
    />

    <div className="container">
      <div className="row">
        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
          <Scrollspy onToggleAnimation={animateLeftBars} />
          <div className="SKILLS__panel left">
            {items.left.map((panel, i) => (
              <SkillsPanel
                key={`SKILLS__chapter-left-${i}`}
                side={SKILLS_LEFT}
                counter={left}
                {...panel}
              />
            ))}
          </div>
        </div>
        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
          <Scrollspy onToggleAnimation={animateRightBars} />
          <div className="SKILLS__panel right">
            {items.right.map((panel, i) => (
              <SkillsPanel
                key={`SKILLS__chapter-right-${i}`}
                side={SKILLS_RIGHT}
                counter={right}
                {...panel}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

SkillsSection.propTypes = {
  data: React.PropTypes.shape({
    items: React.PropTypes.shape({
      left: React.PropTypes.array,
      right: React.PropTypes.array,
    }),
  }),
  animations: React.PropTypes.shape({
    header: React.PropTypes.bool,
    left: React.PropTypes.number,
    right: React.PropTypes.number,
  }),
  actions: React.PropTypes.shape({
    animateHeader: React.PropTypes.func,
    animateLeftBars: React.PropTypes.func,
    animateRightBars: React.PropTypes.func,
  }),

};


export default SkillsSection;
