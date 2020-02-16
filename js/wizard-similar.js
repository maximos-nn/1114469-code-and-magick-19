'use strict';

(function () {
  var setupDialog;
  var similarList;

  function renderWizard(wizard) {
    var wizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
    var wizardElement = wizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;
    return wizardElement;
  }

  function renderSimilarWizards(similarWizards) {
    var fragment = document.createDocumentFragment();
    similarWizards.forEach(function (wizard) {
      fragment.appendChild(renderWizard(wizard));
    });
    similarList.appendChild(fragment);
  }

  function renderLoadedWizards(wizards) {
    var similar = setupDialog.querySelector('.setup-similar');
    similarList = similar.querySelector('.setup-similar-list');
    similar.classList.remove('hidden');
    renderSimilarWizards(wizards);
  }

  function updateSimilarWizards() {
    similarList.innerHTML = '';
    renderSimilarWizards(window.wizardData.getWizards());
  }

  function onWizardCoatChange(color) {
    window.wizardData.setSortParams(color, window.wizardAppearance.getWizardEyesColor());
    updateSimilarWizards();
  }

  function onWizardEyesChange(color) {
    window.wizardData.setSortParams(window.wizardAppearance.getWizardCoatColor(), color);
    updateSimilarWizards();
  }

  function showSimilarWizards(dialog) {
    setupDialog = dialog;
    window.wizardAppearance.setWizardCoatChangeCb(window.utils.debounce(onWizardCoatChange));
    window.wizardAppearance.setWizardEyesChangeCb(window.utils.debounce(onWizardEyesChange));
    window.wizardData.setSortParams(
        window.wizardAppearance.getWizardCoatColor(),
        window.wizardAppearance.getWizardEyesColor()
    );
    window.wizardData.createWizards(renderLoadedWizards);
  }

  window.wizardRenderSimilar = showSimilarWizards;
})();
