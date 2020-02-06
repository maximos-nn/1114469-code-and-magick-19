'use strict';

(function () {
  var dialog;
  var dialogHandler;

  function onMouseDown(evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };
    var dragged = false;

    function onMouseMove(moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      dialog.style.top = (dialog.offsetTop - shift.y) + 'px';
      dialog.style.left = (dialog.offsetLeft - shift.x) + 'px';
    }

    function onClickPreventDefault(clickEvt) {
      clickEvt.preventDefault();
      dialogHandler.removeEventListener('click', onClickPreventDefault);
    }

    function onMouseUp(upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      if (dragged) {
        dialogHandler.addEventListener('click', onClickPreventDefault);
      }
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }

  function setDragHandler(setupDialog) {
    dialog = setupDialog;
    dialogHandler = dialog.querySelector('.upload');
    dialogHandler.addEventListener('mousedown', onMouseDown);
  }

  window.dialogSetDragHandler = setDragHandler;
})();
