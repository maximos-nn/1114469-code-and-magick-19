'use strict';

(function () {
  var wizardAppearance;
  var wizardCoat;
  var wizardCoatInput;
  var wizardEyes;
  var wizardEyesInput;
  var wizardFireball;
  var wizardFireballInput;
  function fillWizardCoat() {
    var color = window.utils.getRandomElement(window.wizardData.COAT_COLORS);
    wizardCoat.style.fill = color;
    wizardCoatInput.value = color;
  }
  function fillWizardEyes() {
    var color = window.utils.getRandomElement(window.wizardData.EYES_COLORS);
    wizardEyes.style.fill = color;
    wizardEyesInput.value = color;
  }
  function fillWizardFireball() {
    // var color = getRandomElement(window.wizardData.FIREBALL_COLORS);
    if (typeof fillWizardFireball.index === 'undefined') {
      fillWizardFireball.index = 0;
    }
    var color = window.wizardData.FIREBALL_COLORS[fillWizardFireball.index++];
    if (fillWizardFireball.index === window.wizardData.FIREBALL_COLORS.length) {
      fillWizardFireball.index = 0;
    }
    wizardFireball.style.background = color;
    wizardFireballInput.value = color;
  }
  function setWizardAppearance(dialog) {
    wizardAppearance = dialog.querySelector('.setup-wizard-appearance');
    wizardCoat = wizardAppearance.querySelector('.wizard-coat');
    wizardCoatInput = wizardAppearance.querySelector('input[name="coat-color"]');
    wizardEyes = wizardAppearance.querySelector('.wizard-eyes');
    wizardEyesInput = wizardAppearance.querySelector('input[name="eyes-color"]');
    wizardFireball = dialog.querySelector('.setup-fireball-wrap');
    wizardFireballInput = wizardFireball.querySelector('input[name="fireball-color"]');

    wizardCoat.addEventListener('click', fillWizardCoat);
    wizardEyes.addEventListener('click', fillWizardEyes);
    wizardFireball.addEventListener('click', fillWizardFireball);
    // wizardFireball.addEventListener('click', function () {
    //   var index = 0;
    //   return function () {
    //     var color = window.wizardData.FIREBALL_COLORS[index++];
    //     wizardFireball.style.background = color;
    //     wizardFireballInput.value = color;
    //     if (index === window.wizardData.FIREBALL_COLORS.length) {
    //       index = 0;
    //     }
    //   };
    // }());
  }
  window.wizardSetAppearance = setWizardAppearance;
})();
