'use strict';

(function () {
  var COAT_COLORS = [
    'rgb(101, 137, 164)',
    'rgb(241, 43, 107)',
    'rgb(146, 100, 161)',
    'rgb(56, 159, 117)',
    'rgb(215, 210, 55)',
    'rgb(0, 0, 0)'
  ];
  var EYES_COLORS = [
    'black',
    'red',
    'blue',
    'yellow',
    'green'
  ];
  var FIREBALL_COLORS = [
    '#ee4830',
    '#30a8ee',
    '#5ce6c0',
    '#e848d5',
    '#e6e848'
  ];
  var WIZARDS_COUNT = 4;
  var onWizardsCreated;

  function onWizardsLoadSuccess(wizards) {
    if (wizards.length <= WIZARDS_COUNT) {
      onWizardsCreated(wizards);
      return;
    }
    var randomIndex = window.utils.getRandomInt(wizards.length - WIZARDS_COUNT + 1);
    onWizardsCreated(wizards.slice(randomIndex, randomIndex + WIZARDS_COUNT));
  }

  function onWizardsLoadError(message) {
    window.utils.showTransferError(message);
  }

  function createWizards(onDone) {
    onWizardsCreated = onDone;
    window.backend.load(onWizardsLoadSuccess, onWizardsLoadError);
  }

  window.wizardData = {
    COAT_COLORS: COAT_COLORS,
    EYES_COLORS: EYES_COLORS,
    FIREBALL_COLORS: FIREBALL_COLORS,
    createWizards: createWizards
  };
})();
