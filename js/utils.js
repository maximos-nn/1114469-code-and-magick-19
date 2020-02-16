'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500;

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  function getRandomElement(array) {
    return array[getRandomInt(array.length)];
  }

  function showTransferError(message) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = message;
    document.body.insertAdjacentElement('afterbegin', node);
  }

  function debounce(cb) {
    var lastTimeout = null;
    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cb.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  }

  window.utils = {
    getRandomInt: getRandomInt,
    getRandomElement: getRandomElement,
    showTransferError: showTransferError,
    debounce: debounce
  };
})();
