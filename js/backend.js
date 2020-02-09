'use strict';

(function () {
  var loadMethods = {XHR: 'XHR', JSONP: 'JSONP'};
  var loadMethod = loadMethods.XHR;
  var URL_UPLOAD = 'https://js.dump.academy/code-and-magick';
  var URL_DOWNLOAD = 'https://js.dump.academy/code-and-magick/data';
  var TIMEOUT_IN_MS = 2000;
  var statusCode = {OK: 200};

  function getRequestObject(onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = TIMEOUT_IN_MS;
    xhr.addEventListener('load', function () {
      if (xhr.status === statusCode.OK) {
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

  function getJSONPHandler(onLoad) {
    return function (data) {
      onLoad(data);
    };
  }

  function loadJSONP(onLoad) {
    var loader = document.createElement('script');
    loader.src = URL_DOWNLOAD + '?callback=backend.getJSONPData';
    document.body.append(loader);
    window.backend.getJSONPData = getJSONPHandler(onLoad);
  }

  function save(data, onLoad, onError) {
    var xhr = getRequestObject(onLoad, onError);
    xhr.open('POST', URL_UPLOAD);
    xhr.send(data);
  }

  function load(onLoad, onError) {
    switch (loadMethod) {
      case loadMethods.XHR:
        loadXHR(onLoad, onError);
        break;
      case loadMethods.JSONP:
        loadJSONP(onLoad);
        break;
      default:
        throw new Error('Неизвестный метод загрузки данных: "' + loadMethod + '"');
    }
  }

  window.backend = {
    save: save,
    load: load
  };
})();
