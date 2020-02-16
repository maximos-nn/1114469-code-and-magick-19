'use strict';

(function () {
  var wizardAppearance;
  var wizardCoat;
  var wizardCoatInput;
  var wizardEyes;
  var wizardEyesInput;
  var wizardFireball;
  var wizardFireballInput;
  var wizardChangeSubscribes = {};

  function onWizardCoatClick() {
    var color = window.utils.getRandomElement(window.wizardData.COAT_COLORS);
    wizardCoat.style.fill = color;
    wizardCoatInput.value = color;
    if (typeof wizardChangeSubscribes.onCoatChange === 'function') {
      wizardChangeSubscribes.onCoatChange(color);
    }
  }

  function onWizardEyesClick() {
    var color = window.utils.getRandomElement(window.wizardData.EYES_COLORS);
    wizardEyes.style.fill = color;
    wizardEyesInput.value = color;
    if (typeof wizardChangeSubscribes.onEyesChange === 'function') {
      wizardChangeSubscribes.onEyesChange(color);
    }
  }

  function getWizardFireballClickHandler() {
    var index = 1;
    return function () {
      var color = window.wizardData.FIREBALL_COLORS[index++];
      wizardFireball.style.background = color;
      wizardFireballInput.value = color;
      if (index === window.wizardData.FIREBALL_COLORS.length) {
        index = 0;
      }
    };
  }

  function setWizardAppearance(dialog) {
    wizardAppearance = dialog.querySelector('.setup-wizard-appearance');
    wizardCoat = wizardAppearance.querySelector('.wizard-coat');
    wizardCoatInput = wizardAppearance.querySelector('input[name="coat-color"]');
    wizardEyes = wizardAppearance.querySelector('.wizard-eyes');
    wizardEyesInput = wizardAppearance.querySelector('input[name="eyes-color"]');
    wizardFireball = dialog.querySelector('.setup-fireball-wrap');
    wizardFireballInput = wizardFireball.querySelector('input[name="fireball-color"]');

    wizardCoat.addEventListener('click', onWizardCoatClick);
    wizardEyes.addEventListener('click', onWizardEyesClick);
    wizardFireball.addEventListener('click', getWizardFireballClickHandler());
  }

  function getWizardCoatColor() {
    return wizardCoatInput.value;
  }

  function getWizardEyesColor() {
    return wizardEyesInput.value;
  }

  function setWizardCoatChangeCb(callback) {
    wizardChangeSubscribes.onCoatChange = callback;
  }

  function setWizardEyesChangeCb(callback) {
    wizardChangeSubscribes.onEyesChange = callback;
  }

  window.wizardAppearance = {
    setAppearance: setWizardAppearance,
    getWizardCoatColor: getWizardCoatColor,
    getWizardEyesColor: getWizardEyesColor,
    setWizardCoatChangeCb: setWizardCoatChangeCb,
    setWizardEyesChangeCb: setWizardEyesChangeCb
  };
})();
