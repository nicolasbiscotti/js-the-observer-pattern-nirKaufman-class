// collection is an object with getValues and manipulate methods
// when you create a collection, tell me how to getValues
function createCollection(getValues) {
  return {
    getValues,
    manipulate: function (manipulateFn) {
      return manipulateFn(this);
    },
  };
}

// create collection from array
export function fromArray(array) {
  const getValues = (callbackFn) => {
    for (const item of array) {
      callbackFn(item);
    }
  };
  return createCollection(getValues);
}

export function map(mapFn) {
  return function (inputCollection) {
    const getValues = (callbackFn) => {
      inputCollection.getValues((value) => {
        const mappedValue = mapFn(value);
        callbackFn(mappedValue);
      });
    };
    return createCollection(getValues);
  };
}

export function filter(filterFn) {
  return function (inputCollection) {
    return createCollection(function (callback) {
      inputCollection.getValues((value) => {
        filterFn(value) && callback(value);
      });
    });
  };
}
