import React from 'react';


const ErrorPage = ({logo, code, color, img, title, text}) => (
  <div className="LOAD__container">
    <div className="LOAD__content UTIL__image-RNA">
      <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
        <div className="green" dangerouslySetInnerHTML={{__html: logo}} ></div>
        <img src={img} height="auto" />
        <div className="hidden-xs"></div>
      </div>
      <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
        <h2>
          <span className={`label label-${color}`} >{title.custom}</span>
        </h2>
        <p>
          <b dangerouslySetInnerHTML={{__html: text.custom.replace(/\n/g, "<br/>")}} ></b>
        </p>
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
