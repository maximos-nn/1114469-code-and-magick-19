'use strict';

(function () {
  var ESC_KEY = 'Escape';
  var ENTER_KEY = 'Enter';

  var dialog = document.querySelector('.setup');
  var openDialogControl = document.querySelector('.setup-open');
  var closeDialogControl = dialog.querySelector('.setup-close');

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
    dialog.removeAttribute('style');
    document.removeEventListener('keydown', onDialogEscPress);
  }

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

  window.wizardRenderSimilar(dialog);
  window.wizardSetAppearance(dialog);
  window.dialogSetDragHandler(dialog);
})();
