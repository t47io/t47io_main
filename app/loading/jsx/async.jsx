import React from 'react';


class AsyncComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      component: null,
      props: {}
    };
  }

  componentDidMount() {
    this.props.loader((component, props) => {
      const Component = component.default;
      this.setState({
        component: Component,
        props
      });
    });
  }

  renderPlaceholder() {
    return (<div>Loading ...</div>);
  }

  render() {
    if (this.state.component) {
      return (<this.state.component {...(this.state.props)} />);      
    }
    return (this.props.placeholder || this.renderPlaceholder());
  }
}


export default AsyncComponent;
