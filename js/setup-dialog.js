'use strict';

(function () {
  var ESC_KEY = 'Escape';
  var ENTER_KEY = 'Enter';

  var dialog = document.querySelector('.setup');
  var openDialogControl = document.querySelector('.setup-open');
  var closeDialogControl = dialog.querySelector('.setup-close');
  var dialogForm = dialog.querySelector('.setup-wizard-form');

  function onDialogEscPress(evt) {
    if (evt.key === ESC_KEY && evt.target.className !== 'setup-user-name') {
      closeDialog();
    }
  }

  function onFormUploadSuccess() {
    closeDialog();
  }

  function onFormUploadError(message) {
    window.utils.showTransferError(message);
  }

  function onFormSubmit(evt) {
    evt.preventDefault();
    window.backend.save(new FormData(dialogForm), onFormUploadSuccess, onFormUploadError);
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

  dialogForm.addEventListener('submit', onFormSubmit);

  window.wizardRenderSimilar(dialog);
  window.wizardSetAppearance(dialog);
  window.dialogSetDragHandler(dialog);
})();
