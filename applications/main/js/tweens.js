
const home = {
  color: (state, setState) => {
    const textClassNames = ['white', 'light-green', 'green', 'dark-green', 'green', 'light-green'];
    let count = 0;

    setInterval(() => {
      setState({
        ...state,
        textColor: textClassNames[count],
        arrowColor: (state.arrowColor === 'white') ? 'light-green' : 'white',
      });
      count = (count + 1) % 6;
    }, 2000);
  },
  fade: {
    bottomBottom: {
      transform: 'translateY(0px)',
      ...fadeEnd,
    },
    bottomCenter: {
      transform: 'translateY(-100px)',
      ...fadeHalf,
    },
  },
};


export {
  home,
  func,
};
