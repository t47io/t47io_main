import React from 'react';
import PropTypes from 'prop-types';
import { Chart } from 'frappe-charts/dist/frappe-charts.esm.js';

import '../../vendor/frappe.scss';


class FrappeChart extends React.PureComponent {
  chart = null;

  static propTypes = {
    data: PropTypes.shape({
      labels: PropTypes.arrayOf(PropTypes.any),
      datasets: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        values: PropTypes.arrayOf(PropTypes.number),
      })),
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
      datasets: [],
    },
    title: '',
    colors: [],
    height: 160,
    logScale: false,
    className: '',
  };

  componentDidMount() {
    const {
      title,
      colors,
      height,
      logScale,
      ...props
    } = this.props;
    const tooltipOptions = logScale ? {
      formatTooltipY: d => (
        // eslint-disable-next-line no-restricted-properties
        d ? Math.round(Math.pow(10, Math.abs(d))) : 0
      ),
    } : {};

    this.chart = new Chart(this.chart, {
      title,
      colors,
      height,
      type: 'line',
      lineOptions: {
        dotSize: 3,
        regionFill: true,
      },
      axisOptions: {
        xAxisMode: 'tick',
        xIsSeries: true,
      },
      tooltipOptions,
      ...props,
    });
  }

  componentWillUnmount() {
    this.chart.unbindWindowEvents();
    this.chart = null;
  }

  render() {
    return (
      <div
        className={this.props.className}
        ref={(c) => { this.chart = c; }}
      />
    );
  }
}


export default FrappeChart;
