const delay = (time = 0, callback) => (
  new Promise((resolve, reject) => {
    try {
      setTimeout(() => {
        if (typeof callback === 'function') { callback(); }
        resolve();
      }, time);
    } catch (err) {
      console.log(err);
      reject(err);
    }
  })
);


export default delay;
