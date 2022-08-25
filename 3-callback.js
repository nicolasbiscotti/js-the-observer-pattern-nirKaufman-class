// collection is an object with getValues
/* 
the bad with this implementation is that when I
import collection then I get all the methods at once
and this days I wanna import just I wanna use
*/
export const oldCollection = {
  getValues: function (callbackFn) {
    const items = [1, 2, 3, 4, 5, 6];
    for (let item of items) {
      callbackFn(item);
    }
  },
  map: function (mapFn) {
    const self = this;
    return {
      getValues: function (callbackFn) {
        self.getValues((value) => {
          const mappedValue = mapFn(value);
          callbackFn(mappedValue);
        });
      },
    };
  },
  filter: function (filterFn) {},
  reduce: function (reduceFn) {},
};
// this way you can import only wath you need
// collection is an object with getValues and manipulate methods
export const collection = {
  getValues: function (callbackFn) {
    const items = [1, 2, 3, 4, 5, 6];
    for (let item of items) {
      callbackFn(item);
    }
  },
  manipulate: function (manipulateFn) {
    return manipulateFn(this);
  },
};

export function map(mapFn) {
  return function (inputCollection) {
    return {
      getValues: function (callbackFn) {
        inputCollection.getValues((value) => {
          const mappedValue = mapFn(value);
          callbackFn(mappedValue);
        });
      },
      manipulate: function (manipulateFn) {
        return manipulateFn(this);
      },
    };
  };
}

export function filter(filterFn) {
  return function (inputCollection) {
    return {
      getValues: function (callbackFn) {
        inputCollection.getValues((value) => {
          if (filterFn(value)) {
            callbackFn(value);
          }
        });
      },
      manipulate: function (manipulateFn) {
        return manipulateFn(this);
      },
    };
  };
}
