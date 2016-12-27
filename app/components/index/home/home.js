import React from 'react';

require('./home.scss');

const HomeSection = () => {
  return (
    <section id="HOME__section" className="parallax" style="background-image:url('/img/t47/t47_avatar.jpg')">
      <div className="cover HOME__shade"></div>
      <div className="container">
        <div className="HOME__content text-white">
          <img src='/img/t47/t47_name_2_line.gif' alt="Siqi Tian" width="480" id="img_name" style="opacity:0;" />
          <p className="text-white" id="subtitle_0" style="margin-top: -10px;">&nbsp;</p>
          <p className="text-white" id="subtitle_1" style="height: 25px;"></p>
          <p className="text-white" id="subtitle_2" style="height: 25px;"></p>
        </div>
        <div className="HOME__scroll_down">
          <i className="fa fa-3x fa-fw fa-arrow-circle-down"></i>
        </div>

      </div>
    </section>
  );
};


export default HomeSection;
