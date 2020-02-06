'use strict';

(function () {
  var CLOUD_WIDTH = 420;
  var CLOUD_HEIGHT = 270;
  var CLOUD_X = 100;
  var CLOUD_Y = 10;
  var SHADOW_OFFSET = 10;
  var SHADOW_X = CLOUD_X + SHADOW_OFFSET;
  var SHADOW_Y = CLOUD_Y + SHADOW_OFFSET;
  var HISTOGRAM_FONT_SIZE = 16;
  var HISTOGRAM_FONT = HISTOGRAM_FONT_SIZE + 'px "PT Mono"';
  var HISTORGAM_PADDING = 20;
  var BAR_WIDTH = 40;
  var BAR_MAX_HEIGHT = 150;
  var BAR_GAP = 50;
  var BAR_MARGIN = 5;
  var PLAYERS_BAR_COLOR = 'rgba(255, 0, 0, 1)';

  function renderSurface(ctx, x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
  }

  function getMaxElement(arr) {
    return Math.max.apply(null, arr);
  }

  function getBarWidth(ctx, name, time) {
    return Math.max(ctx.measureText(name).width, ctx.measureText(time).width, BAR_WIDTH);
  }

  function getBarColor(name) {
    if (name === 'Вы') {
      return PLAYERS_BAR_COLOR;
    }
    return 'hsl(240, ' + Math.floor(Math.random() * 100) + '%, 50%)';
  }

  function renderHeader(ctx) {
    ctx.fillStyle = '#000000';
    ctx.fillText(
        'Ура, вы победили!',
        CLOUD_X + HISTORGAM_PADDING,
        CLOUD_Y + HISTORGAM_PADDING
    );
    ctx.fillText(
        'Список результатов:',
        CLOUD_X + HISTORGAM_PADDING,
        CLOUD_Y + HISTORGAM_PADDING + HISTOGRAM_FONT_SIZE
    );
  }

  function renderBar(ctx, name, time, x, height) {
    var y = CLOUD_Y + CLOUD_HEIGHT - HISTORGAM_PADDING - HISTOGRAM_FONT_SIZE;
    ctx.fillStyle = '#000000';
    ctx.fillText(name, x, y);
    y -= height + BAR_MARGIN;
    ctx.fillStyle = getBarColor(name);
    ctx.fillRect(x, y, BAR_WIDTH, height);
    y -= HISTOGRAM_FONT_SIZE + BAR_MARGIN;
    ctx.fillStyle = '#000000';
    ctx.fillText(time, x, y);
  }

  function renderData(ctx, names, times) {
    var dataX = CLOUD_X + HISTORGAM_PADDING;
    var maxTime = Math.floor(getMaxElement(times));
    for (var i = 0; i < names.length; i++) {
      var time = Math.floor(times[i]);
      var barWidth = getBarWidth(ctx, names[i], time);
      var barHeight = BAR_MAX_HEIGHT * time / maxTime;
      renderBar(ctx, names[i], time, dataX, barHeight);
      dataX += barWidth + BAR_GAP;
    }
  }

  function renderHistogram(ctx, names, times) {
    ctx.font = HISTOGRAM_FONT;
    ctx.textBaseline = 'top';
    renderHeader(ctx);
    renderData(ctx, names, times);
  }

  function renderStatistics(ctx, names, times) {
    renderSurface(ctx, SHADOW_X, SHADOW_Y, 'rgba(0, 0, 0, 0.7)');
    renderSurface(ctx, CLOUD_X, CLOUD_Y, '#ffffff');
    renderHistogram(ctx, names, times);
  }

  window.renderStatistics = renderStatistics;
})();
