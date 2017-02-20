import React from 'react';


class AsyncComponent extends React.Component {
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
  loader: React.PropTypes.func.isRequired,
  placeholder: React.PropTypes.string,
};


export default AsyncComponent;
