export const COMMIT_CHART_OPTIONS = {
  chartArea: { width: '90%', left: '10%' },
  legend: { position: 'none' },
  title: 'Commit Activity',
  titleTextStyle: {
    bold: false,
    fontSize: 16,
  },
  vAxis: {
    title: 'Count (#)',
    titleTextStyle: { bold: true },
    format: '#',
  },
  hAxis: {
    gridlines: { count: -1 },
    textStyle: { italic: true },
    format: 'MMM yy',
  },
  tooltip: { showColorCode: true },
  lineWidth: 2,
  pointSize: 5,
  pointShape: 'square',
  colors: ['#03a9f4'],
  animation: {
    startup: true,
    duration: 1000,
    easing: 'inAndOut',
  },
};

export const ADD_DEL_CHART_OPTIONS = {
  chartArea: {
    width: '90%',
    left: '10%',
  },
  legend: { position: 'bottom' },
  title: 'Code Frequency',
  titleTextStyle: {
    bold: false,
    fontSize: 16,
  },
  vAxis: {
    title: 'Count (#)',
    titleTextStyle: { bold: true },
    scaleType: 'mirrorLog',
    format: 'scientific',
    gridlines: { count: 5 },
  },
  hAxis: {
    gridlines: { count: -1 },
    textStyle: { italic: true },
    format: 'MMM yy',
  },
  tooltip: { showColorCode: true },
  focusTarget: 'category',
  lineWidth: 2,
  pointSize: 3,
  colors: ['#9fc906', '#f44336'],
  animation: {
    startup: true,
    duration: 1000,
    easing: 'inAndOut',
  },
};
