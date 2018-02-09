'use strict';
var TABLE_WIDTH = 420;
var TABLE_HEIGHT = 270;
var SHADOW_OFFSET = 10;
var TABLE_X = 100;
var TABLE_Y = 10;
var TITLE_X = 120;
var TITLE_Y = 40;
var TITLE_Y_OFFSET = 20;
var BAR_MAX_HEIGHT = 150;
var BAR_WIDTH = 40;
var BAR_MARGIN = 50;
var GAP = 20;
var TITLE_BOTTOM_MARGIN = 100;
var RESULT_TEXT_MARGIN = 10;
var NAME_MARGIN = 15;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, TABLE_WIDTH, TABLE_HEIGHT);
};
var renderText = function (ctx, text, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillText(text, x, y);
};

window.renderStatistics = function (ctx, names, times) {
  var getMaxElement = function () {
    var maxElement = times[0];

    for (var i = 0; i < times.length; i++) {
      if (times[i] > maxElement) {
        maxElement = times[i];
      }
    }
    return Math.round(maxElement);
  };

  // Тень таблицы
  renderCloud(ctx, TABLE_X + SHADOW_OFFSET, TABLE_Y + SHADOW_OFFSET, 'rgba(0, 0, 0, 0.7)');

  // Таблица
  renderCloud(ctx, TABLE_X, TABLE_Y, '#fff');

  // Текст
  ctx.font = '16px PT Mono';
  renderText(ctx, 'Ура вы победили!', TITLE_X, TITLE_Y, '#000');
  renderText(ctx, 'Список результатов:', TITLE_X, TITLE_Y + TITLE_Y_OFFSET, '#000');

  var maxTime = getMaxElement(times);

  for (var i = 0; i < names.length; i++) {
    var playerResult = (BAR_MAX_HEIGHT * Math.round(times[i])) / maxTime;
    var topCoord = TITLE_BOTTOM_MARGIN + (BAR_MAX_HEIGHT - playerResult);

    renderText(ctx, names[i], TABLE_X + GAP + (BAR_WIDTH + BAR_MARGIN) * i, TITLE_BOTTOM_MARGIN + BAR_MAX_HEIGHT + NAME_MARGIN, '#000');
    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {

      // рандомный цвет результата для других игроков
      var randomColor = function () {
        return Math.random();
      };
      var correctRGBColor = randomColor();

      while (correctRGBColor < 0.1) {
        correctRGBColor = randomColor();
      }
      ctx.fillStyle = 'rgba(0, 0, 255, ' + correctRGBColor + ')';
    }
    ctx.fillRect(TABLE_X + GAP + (BAR_WIDTH + BAR_MARGIN) * i, topCoord, BAR_WIDTH, playerResult);
    renderText(ctx, Math.round(times[i]), TABLE_X + GAP + (BAR_WIDTH + BAR_MARGIN) * i, topCoord - RESULT_TEXT_MARGIN, '#000');
  }
};
