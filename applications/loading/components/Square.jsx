import React from 'react';

// import '../stylesheets/Square.scss';


const Square = () => (
  <div className="LOAD__square center-block">
    <div className="row clearfix">
      <div className="LOAD__square-block LOAD__square-block--1" />
      <div className="LOAD__square-block LOAD__square-block--2" />
      <div className="LOAD__square-block LOAD__square-block--3" />
    </div>
    <div className="row clearfix">
      <div className="LOAD__square-block LOAD__square-block--8" />
      <div className="LOAD__square-block LOAD__square-block--9" />
      <div className="LOAD__square-block LOAD__square-block--4" />
    </div>
    <div className="row clearfix">
      <div className="LOAD__square-block LOAD__square-block--7" />
      <div className="LOAD__square-block LOAD__square-block--6" />
      <div className="LOAD__square-block LOAD__square-block--5" />
    </div>
  </div>
);


export default Square;
