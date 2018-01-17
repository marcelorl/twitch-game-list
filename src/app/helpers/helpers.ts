const dependencies = { window };

export const calcLimit = (injection: Object = {}): number => {
  const { window } = Object.assign({}, dependencies, injection);

  const width = window.innerWidth;
  if (width < 576) {
    return 25;
  } else if (width < 992) {
    return 50;
  }
  return 100;
};
