import React from 'react';


const AboutItem = ({title, icon, description}) => (
  <div className="col-lg-3 col-md-3 col-sm-6 col-xs-6">
    <a href="javascript:void(0)" className="ABOUT__box text-center">
      <span className="ABOUT__icon"><i className={`fa fa-fw fa-${icon}`}></i></span>
      <div className="ABOUT__text">
        <h4>{title}</h4>
        <p dangerouslySetInnerHTML={{__html: description.replace(/\n/g, '<br/>')}} ></p>
      </div>
    </a>
  </div>
);

const AboutSection = ({items}) => (
  <section id="ABOUT__section" className="text-center">
    <div className="extra-space-l ABOUT__trigger"></div>
    <div className="container">
      <div className="page-header text-center ABOUT__header">
        <h2>What I do</h2>
        <div className="divider"></div>
        <p className="subtitle">what I enjoy &amp; good at</p>
      </div>
    </div>

    <div className="ABOUT__content">
      <div className="container">
        <div className="row">
          {items.map((item) => (<AboutItem {...item} />))}
        </div>
      </div>
    </div>
  </section>
);


export default AboutSection;
