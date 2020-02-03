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

var FIREBALL_COLORS = [
  '#ee4830',
  '#30a8ee',
  '#5ce6c0',
  '#e848d5',
  '#e6e848'
];

var ESC_KEY = 'Escape';
var ENTER_KEY = 'Enter';

var dialog = document.querySelector('.setup');
var similar = dialog.querySelector('.setup-similar');
var wizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var openDialogControl = document.querySelector('.setup-open');
var closeDialogControl = dialog.querySelector('.setup-close');

var wizardAppearance = dialog.querySelector('.setup-wizard-appearance');
var wizardCoat = wizardAppearance.querySelector('.wizard-coat');
var wizardCoatInput = wizardAppearance.querySelector('input[name="coat-color"]');
var wizardEyes = wizardAppearance.querySelector('.wizard-eyes');
var wizardEyesInput = wizardAppearance.querySelector('input[name="eyes-color"]');
var wizardFireball = dialog.querySelector('.setup-fireball-wrap');
var wizardFireballInput = wizardFireball.querySelector('input[name="fireball-color"]');

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function getRandomElement(array) {
  return array[getRandomInt(array.length)];
}

function getRandomName() {
  return getRandomElement(WIZARD_NAMES) + ' ' + getRandomElement(WIZARD_SURNAMES);
}

function getRandomWizard() {
  return {
    name: getRandomName(),
    coatColor: getRandomElement(COAT_COLORS),
    eyesColor: getRandomElement(EYES_COLORS)
  };
}

function createWizards() {
  var wizards = [];
  for (var i = 0; i < 4; i++) {
    wizards[i] = getRandomWizard();
  }
  return wizards;
}

function renderWizard(wizard) {
  var wizardElement = wizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  return wizardElement;
}

function initSetup() {
  var similarWizards = createWizards();
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < similarWizards.length; i++) {
    fragment.appendChild(renderWizard(similarWizards[i]));
  }
  similar.querySelector('.setup-similar-list').appendChild(fragment);
  similar.classList.remove('hidden');
}

function onDialogEscPress(evt) {
  if (evt.key === ESC_KEY && evt.target.className !== 'setup-user-name') {
    closeDialog();
  }
}

function openDialog() {
  dialog.classList.remove('hidden');
  document.addEventListener('keydown', onDialogEscPress);
}

function closeDialog() {
  dialog.classList.add('hidden');
  document.removeEventListener('keydown', onDialogEscPress);
}

function fillWizardCoat() {
  var color = getRandomElement(COAT_COLORS);
  wizardCoat.style.fill = color;
  wizardCoatInput.value = color;
}

function fillWizardEyes() {
  var color = getRandomElement(EYES_COLORS);
  wizardEyes.style.fill = color;
  wizardEyesInput.value = color;
}

function fillWizardFireball() {
  // var color = getRandomElement(FIREBALL_COLORS);
  if (typeof fillWizardFireball.index === 'undefined') {
    fillWizardFireball.index = 0;
  }
  var color = FIREBALL_COLORS[fillWizardFireball.index++];
  if (fillWizardFireball.index === FIREBALL_COLORS.length) {
    fillWizardFireball.index = 0;
  }
  wizardFireball.style.background = color;
  wizardFireballInput.value = color;
}

initSetup();

openDialogControl.addEventListener('click', function () {
  openDialog();
});

openDialogControl.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    openDialog();
  }
});

closeDialogControl.addEventListener('click', function () {
  closeDialog();
});

closeDialogControl.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    closeDialog();
  }
});

wizardCoat.addEventListener('click', fillWizardCoat);
wizardEyes.addEventListener('click', fillWizardEyes);
wizardFireball.addEventListener('click', fillWizardFireball);
// wizardFireball.addEventListener('click', function () {
//   var index = 0;
//   return function () {
//     var color = FIREBALL_COLORS[index++];
//     wizardFireball.style.background = color;
//     wizardFireballInput.value = color;
//     if (index === FIREBALL_COLORS.length) {
//       index = 0;
//     }
//   };
// }());
