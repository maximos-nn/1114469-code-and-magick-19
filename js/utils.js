'use strict';

(function () {
  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
  function getRandomElement(array) {
    return array[getRandomInt(array.length)];
  }
  window.utils = {
    getRandomInt: getRandomInt,
    getRandomElement: getRandomElement
  };
})();
