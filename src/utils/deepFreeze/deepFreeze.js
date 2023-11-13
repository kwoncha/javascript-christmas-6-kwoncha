const deepFreeze = object => {
  Object.freeze(object);

  Object.keys(object).forEach(key => {
    if (typeof object[key] === 'object' && object[key] !== null && !Object.isFrozen(object[key])) {
      deepFreeze(object[key]);
    }
  });

  return object;
};

export default deepFreeze;
