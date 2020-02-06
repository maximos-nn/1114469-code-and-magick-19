'use strict';

(function () {
  var WIZARD_NAMES = [
    'Иван',
    'Хуан Себастьян',
    'Мария',
    'Кристоф',
    'Виктор',
    'Юлия',
    'Люпита',
    'Вашингтон'
  ];
  var WIZARD_SURNAMES = [
    'да Марья',
    'Верон',
    'Мирабелла',
    'Вальц',
    'Онопко',
    'Топольницкая',
    'Нионго',
    'Ирвинг'
  ];
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
  function getRandomName() {
    return window.utils.getRandomElement(WIZARD_NAMES) + ' ' + window.utils.getRandomElement(WIZARD_SURNAMES);
  }
  function getRandomWizard() {
    return {
      name: getRandomName(),
      coatColor: window.utils.getRandomElement(COAT_COLORS),
      eyesColor: window.utils.getRandomElement(EYES_COLORS)
    };
  }
  function createWizards() {
    var wizards = [];
    for (var i = 0; i < 4; i++) {
      wizards[i] = getRandomWizard();
    }
    return wizards;
  }
  window.wizardData = {
    WIZARD_NAMES: WIZARD_NAMES,
    WIZARD_SURNAMES: WIZARD_SURNAMES,
    COAT_COLORS: COAT_COLORS,
    EYES_COLORS: EYES_COLORS,
    FIREBALL_COLORS: FIREBALL_COLORS,
    createWizards: createWizards
  };
})();
