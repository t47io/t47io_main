import React from 'react';
import PropTypes from 'prop-types';


class AsyncComponent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      component: null,
      props: {},
    };
  }

  componentDidMount() {
    this.props.loader((component, props) => {
      const Component = component.default;
      this.setState({
        component: Component,
        props,
      });
    });
  }

  render() {
    if (this.state.component) {
      return (<this.state.component {...(this.state.props)} />);
    }
    return (this.props.placeholder || <div>Loading ...</div>);
  }
}

AsyncComponent.propTypes = {
  loader: PropTypes.func,
  placeholder: PropTypes.string,
};
AsyncComponent.defaultProps = {
  loader: () => {},
  placeholder: '',
};


export default AsyncComponent;
