import React from 'react';
import PropTypes from 'prop-types';
import Chart from 'frappe-charts/dist/frappe-charts.esm.js';


class FrappeChart extends React.PureComponent {
  static propTypes = {
    data: PropTypes.shape({
      labels: PropTypes.arrayOf(PropTypes.any),
      datasets: PropTypes.arrayOf(PropTypes.object),
    }),
    title: PropTypes.string,
    colors: PropTypes.arrayOf(PropTypes.string),
    height: PropTypes.number,
    logScale: PropTypes.bool,
    className: PropTypes.string,
  };
  static defaultProps = {
    data: {
      labels: [],
      datasets: [{}],
    },
    title: '',
    colors: [],
    height: 128,
    logScale: false,
    className: '',
  };

  state = { chart: null };

  componentDidMount() {
    const {
      title,
      colors,
      height,
      logScale,
      ...props
    } = this.props;
    const formatYAxis = logScale ? {
      format_tooltip_y: d => (
        // eslint-disable-next-line no-restricted-properties
        d ? Math.round(Math.pow(10, Math.abs(d))) : 0
      ),
    } : {};

    this.chart = new Chart({
      parent: this.state.chart,
      title,
      colors,
      height,
      type: 'line',
      dot_radius: 3,
      is_series: true,
      region_fill: true,
      ...formatYAxis,
      ...props,
    });
  }
  componentWillUnmount() {
    this.chart = null;
  }

  render() {
    return (
      <div
        className={this.props.className}
        ref={(c) => { this.setState({ chart: c }); }}
      />
    );
  }
}


export default FrappeChart;