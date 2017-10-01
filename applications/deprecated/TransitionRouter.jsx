import React from 'react';
import CSSTransitionGroup from 'preact-css-transition-group';
import { Router } from 'preact-router';
import PropTypes from 'prop-types';


const TransitionRouter = ({
  children,
  ...props
}) => (
  <Router {...props}>
    {children.map(child => (
      <CSSTransitionGroup
        {...child.attributes}
        component="div"
        transitionName="PROJECT__route"
        transitionAppear={false}
        transitionEnter
        transitionEnterTimeout={500}
        transitionLeave
        transitionLeaveTimeout={500}
      >
        {child}
      </CSSTransitionGroup>
    ))}
  </Router>
);

TransitionRouter.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
};


export default TransitionRouter;
