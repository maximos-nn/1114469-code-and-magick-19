'use strict';

(function () {
  var URL_UPLOAD = 'https://js.dump.academy/code-and-magick';
  var URL_DOWNLOAD = 'https://js.dump.academy/code-and-magick/data';
  var TIMEOUT_IN_MS = 2000;
  var LoadMethod = {XHR: 'XHR', JSONP: 'JSONP'};
  var currentLoadMethod = LoadMethod.XHR;
  var StatusCode = {OK: 200};

  function getRequestObject(onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = TIMEOUT_IN_MS;
    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    return xhr;
  }

  function loadXHR(onLoad, onError) {
    var xhr = getRequestObject(onLoad, onError);
    xhr.open('GET', URL_DOWNLOAD);
    xhr.send();
  }

  function loadJSONP(onLoad, onError) {
    var isScriptOk = false;
    window.backend.getJSONPData = function (data) {
      isScriptOk = true;
      delete window.backend.getJSONPData;
      onLoad(data);
    };
    function checkJSONPHandler() {
      if (isScriptOk) {
        return;
      }
      delete window.backend.getJSONPData;
      onError('Ошибка загрузки данных с сервера');
    }
    var loader = document.createElement('script');
    loader.src = URL_DOWNLOAD + '?callback=backend.getJSONPData';
    loader.onload = checkJSONPHandler;
    loader.onerror = checkJSONPHandler;
    document.body.append(loader);
  }

  function save(data, onLoad, onError) {
    var xhr = getRequestObject(onLoad, onError);
    xhr.open('POST', URL_UPLOAD);
    xhr.send(data);
  }

  function load(onLoad, onError) {
    switch (currentLoadMethod) {
      case LoadMethod.XHR:
        loadXHR(onLoad, onError);
        break;
      case LoadMethod.JSONP:
        loadJSONP(onLoad, onError);
        break;
      default:
        throw new Error('Неизвестный метод загрузки данных: "' + currentLoadMethod + '"');
    }
  }

  window.backend = {
    save: save,
    load: load
  };
})();
