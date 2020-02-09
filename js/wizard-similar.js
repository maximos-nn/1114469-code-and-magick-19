'use strict';

(function () {
  function renderWizard(wizard) {
    var wizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
    var wizardElement = wizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;
    return wizardElement;
  }
  function renderSimilarWizards(dialog) {
    window.wizardData.createWizards(function (similarWizards) {
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < similarWizards.length; i++) {
        fragment.appendChild(renderWizard(similarWizards[i]));
      }
      var similar = dialog.querySelector('.setup-similar');
      similar.querySelector('.setup-similar-list').appendChild(fragment);
      similar.classList.remove('hidden');
    });
  }
  window.wizardRenderSimilar = renderSimilarWizards;
})();
