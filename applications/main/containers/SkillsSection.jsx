import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import SectionHeader from '../../common/components/SectionHeader.jsx';
import SkillsPanel from '../components/SkillsPanel.jsx';
import Trigger from '../../common/components/Trigger.jsx';

import * as skillsActions from '../actions/skillsActions.js';
import { initialState as skillsProps } from '../reducers/skills.js';
import {
  SKILLS,
  SKILLS_LEFT,
  SKILLS_RIGHT,
} from '../constants/sectionTypes.js';

import '../stylesheets/SkillsSection.scss';


const SkillsSection = ({
  data: { items },
  animations: {
    header,
    left,
    right,
  },
  actions: {
    animateHeader,
    animateLeftBars,
    animateRightBars,
  },
}) => (
  <section id="SKILLS__section">
    <div className="UTIL__spacer-hg SKILLS__trigger" />
    <SectionHeader
      title="my skills"
      subtitle="what I learned"
      shouldAnimate={header}
      onToggleAnimation={animateHeader}
    />

    <div className="container">
      <div className="row">
        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
          <Trigger
            delay={0}
            onToggleAnimation={animateLeftBars}
          />
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
          <Trigger
            delay={0}
            onToggleAnimation={animateRightBars}
          />
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
  data: PropTypes.shape({
    items: PropTypes.shape({
      left: PropTypes.arrayOf(PropTypes.object),
      right: PropTypes.arrayOf(PropTypes.object),
    }),
  }),
  animations: PropTypes.shape({
    header: PropTypes.bool,
    left: PropTypes.bool,
    right: PropTypes.bool,
  }),
  actions: PropTypes.shape({
    animateHeader: PropTypes.func,
    animateLeftBars: PropTypes.func,
    animateRightBars: PropTypes.func,
  }),
};
SkillsSection.defaultProps = {
  ...skillsProps,
  actions: {
    animateHeader: () => {},
    animateLeftBars: () => {},
    animateRightBars: () => {},
  },
};


const mapStateToProps = state => (state[SKILLS]);
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(skillsActions, dispatch),
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SkillsSection);
