import React from 'react';


const ErrorPage = ({logo, code, color, img, title, text}) => (
  <div className="container theme-showcase">
    <div className="row bgimg2-lg">
      <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
        <div style="height:72px; width:135.5px;" dangerouslySetInnerHTML={{__html: logo}} ></div>
        <img src={img} height="auto" style="max-width:100%;" />
        <div className="hidden-xs"></div>
      </div>
      <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12" style="text-align:left;">
        <h2 style="margin-bottom:20px;">
          <span className={`label label-${color}`} >{title.custom}</span>
        </h2>
        <p style="font-weight:bold; font-size:16px;">
          <b dangerouslySetInnerHTML={{__html: text.custom.replace(/\n/g, "<br/>")}} ></b>
        </p>
        <br/>
        <p><i>In other words,</i></p>
        <h3>
          <span className={`label label-${color}`} >{code}: {title.standard}</span>
        </h3>
        <p dangerouslySetInnerHTML={{__html: text.standard.replace(/\n/g, "<br/>")}} ></p>
      </div>
    </div>
  </div>
);


export default ErrorPage;
