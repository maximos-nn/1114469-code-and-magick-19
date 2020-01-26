'use strict';

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

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function getRandomName() {
  return WIZARD_NAMES[getRandomInt(WIZARD_NAMES.length)] + ' ' + WIZARD_SURNAMES[getRandomInt(WIZARD_SURNAMES.length)];
}

function getRandomCoatColor() {
  return COAT_COLORS[getRandomInt(COAT_COLORS.length)];
}

function getRandomEyesColor() {
  return EYES_COLORS[getRandomInt(EYES_COLORS.length)];
}

function getRandomWizard() {
  var wizard = {};
  wizard.name = getRandomName();
  wizard.coatColor = getRandomCoatColor();
  wizard.eyesColor = getRandomEyesColor();
  return wizard;
}

function createWizards() {
  var wizards = [];
  for (var i = 0; i < 4; i++) {
    wizards[i] = getRandomWizard();
  }
  return wizards;
}

function renderWizard(template, wizard) {
  var wizardElement = template.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  return wizardElement;
}

function renderSimilarList(listElement, wizards) {
  var template = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(template, wizards[i]));
  }
  listElement.appendChild(fragment);
}

function showSimilar(similarElement) {
  var similarList = similarElement.querySelector('.setup-similar-list');
  renderSimilarList(similarList, createWizards());
  similarElement.classList.remove('hidden');
}

function showSetup() {
  var dialog = document.querySelector('.setup');
  var similar = dialog.querySelector('.setup-similar');
  showSimilar(similar);
  dialog.classList.remove('hidden');
}

showSetup();
