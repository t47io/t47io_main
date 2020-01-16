export const noOp = () => {};

export const svgUrlRegex = /\.\/(.*)-.*$/g;
export const svgReactRegex = /\.\/(.*)\.svg/g;
export const svgAvatarRegex = /\.\/t47_avatar-([1-4])\.svg/g;
export const svgThesisRegex = /\.\/t47_thesis-([0-2])\.svg/g;

export const getContextObject = (context, regex = svgUrlRegex) => (
  context.keys().map(key => ({
    [key.replace(regex, '$1')]: context(key),
  }))
  .reduce((obj, item) => ({
    ...obj,
    ...item,
  }), {})
);


export const delayFor = (time = 0, callback) => (
  new Promise((resolve, reject) => {
    try {
      setTimeout(() => {
        if (typeof callback === 'function') { callback(); }
        resolve();
      }, time);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
      reject(err);
    }
  })
);


export const getPlayState = shouldAnimate => (shouldAnimate ? 'running' : 'finished');

export const year = new Date().getFullYear();
