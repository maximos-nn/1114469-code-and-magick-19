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
  var wizards;
  var sortParams = {};

  function getWizardRank(wizard) {
    var rank = 0;
    if (wizard.colorCoat === sortParams.wizardCoatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === sortParams.wizardEyesColor) {
      rank += 1;
    }
    return rank;
  }

  function namesComparator(left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  }

  function sortCallback(left, right) {
    var rankDiff = getWizardRank(right) - getWizardRank(left);
    if (rankDiff === 0) {
      rankDiff = namesComparator(left.name, right.name);
    }
    return rankDiff;
  }

  function getWizards() {
    return wizards.slice().sort(sortCallback).slice(0, WIZARDS_COUNT);
  }

  function getWizardsLoadSuccessHandler(onWizardsCreated) {
    return function (loadedWizards) {
      wizards = loadedWizards;
      onWizardsCreated(getWizards());
    };
  }

  function onWizardsLoadError(message) {
    window.utils.showTransferError(message);
  }

  function createWizards(onDone) {
    window.backend.load(getWizardsLoadSuccessHandler(onDone), onWizardsLoadError);
  }

  function setSortParams(wizardCoatColor, wizardEyesColor) {
    sortParams.wizardCoatColor = wizardCoatColor;
    sortParams.wizardEyesColor = wizardEyesColor;
  }

  window.wizardData = {
    COAT_COLORS: COAT_COLORS,
    EYES_COLORS: EYES_COLORS,
    FIREBALL_COLORS: FIREBALL_COLORS,
    createWizards: createWizards,
    setSortParams: setSortParams,
    getWizards: getWizards
  };
})();
