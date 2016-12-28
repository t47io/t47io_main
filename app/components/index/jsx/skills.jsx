import React from 'react';

const data = require('../../../config/skills.json');


const ProgressBar = ({value, tag, title}) => (
  <div className={`SKILLS__progress ${tag}`}>
    <div className="SKILLS__bar" role="progressbar" aria-valuenow={`${value}`} aria-valuemin="0" aria-valuemax="100" style={{width: `${value}%`}} >{title}</div>
  </div>
);

const SkillsPanel = ({title, icon, tag, items}) => (
  <div>
    <div className="SKILLS__title">
      <h6><i className={`fa fa-fw fa-lg ${icon}`}></i> {title}</h6>
    </div>
    {items.map((item) => (<ProgressBar {...item} tag={tag} />))}
  </div>
);

const SkillsSection = () => (
  <section id="SKILLS__section">
    <div className="extra-space-xxl SKILLS__trigger"></div>
    <div className="container">
      <div className="page-header text-center SKLLLS__header">
        <h2>my skills</h2>
        <div className="divider"></div>
        <p className="subtitle">what I learned</p>
      </div>
    </div>

    <div className="container">
      <div className="row">
        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
          <div className="SKILLS__panel left">
            {data.items.left.map((panel) => (<SkillsPanel {...panel} tag="left" />))}
          </div>
        </div>
        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
          <div className="SKILLS__panel right">
            {data.items.left.map((panel) => (<SkillsPanel {...panel} tag="right" />))}
          </div>
        </div>
      </div>
    </div>
  </section>
);


export default SkillsSection;
