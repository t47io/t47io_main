const factory = require('react-spark-scroll-rekapi')({
  invalidateAutomatically: true,

  formulas: {
    topPct: (element, container, rect, containerRect, offset) => Math.floor(
      rect.top - containerRect.top - (offset * container.clientHeight / 100)
    ),
    centerPct: (element, container, rect, containerRect, offset) => Math.floor(
      rect.top + rect.height / 2 - (containerRect.top - offset * container.clientHeight / 100)
    ),
    bottomPct: (element, container, rect, containerRect, offset) => Math.floor(
      rect.bottom - containerRect.top - (offset * container.clientHeight / 100)
    ),
  },
});

const { SparkScroll, SparkProxy } = factory;


export default {
  SparkScroll,
  SparkProxy,
};
