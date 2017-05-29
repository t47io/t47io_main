import React from 'react';
import CSSTransitionGroup from 'preact-css-transition-group';
import { Router } from 'preact-router';


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
  children: React.PropTypes.oneOfType([
    React.PropTypes.node,
    React.PropTypes.arrayOf(React.PropTypes.node),
  ]).isRequired,
};


export default TransitionRouter;
