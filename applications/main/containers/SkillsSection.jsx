import React from 'react';

import SectionHeader from '../../common/components/Header.jsx';
import SkillsPanel from '../components/SkillsPanel.jsx';

import { skills as tween } from '../js/tweens.js';
import '../stylesheets/SkillsSection.scss';


const SkillsSection = ({ items }) => (
  <section id="SKILLS__section">
    <div className="UTIL__spacer-hg SKILLS__trigger" />
    <SectionHeader title="my skills" subtitle="what I learned"
      proxyId="SKLLLS__header"
      tween={tween.header}
    />

    <div className="container">
      <div className="row">
        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
          <div className="SKILLS__panel left">
            {items.left.map((panel, i) => (
              <SkillsPanel {...panel} tag="Left" index={i} />
            ))}
          </div>
        </div>
        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
          <div className="SKILLS__panel right">
            {items.right.map((panel, i) => (
              <SkillsPanel {...panel} tag="Right" index={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

SkillsSection.propTypes = {
  items: React.PropTypes.shape({
    left: React.PropTypes.array.isRequired,
    right: React.PropTypes.array.isRequired,
  }),
};


export default SkillsSection;
