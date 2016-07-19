'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

(function (window) {
  var _this = this;

  var isAndroid = function isAndroid() {
    var userAgent = navigator.userAgent;
    var reg = /Android|Adr/;
    return reg.test(userAgent);
  };

  var isObject = function isObject(obj) {
    return (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && obj !== null;
  };

  var copyObject = function copyObject(obj, target) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = Object.keys(target)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var key = _step.value;

        obj[key] = target[key];
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    return obj;
  };

  var script = document.querySelector('#responsive');
  var initialDpr = 0;
  var maximumDpr = 0;
  var baseFontSize = 12;

  if (!!script && script.nodeType === 1 && script.nodeName === 'SCRIPT') {
    var initial = parseFloat(script.dataset.initialDpr);
    var maximum = parseFloat(script.dataset.maximumDpr);
    var fontSize = parseFloat(script.dataset.fontSize);

    initialDpr = initial ? initial : 0;
    maximumDpr = maximum ? maximum : 0;
    baseFontSize = fontSize ? fontSize : baseFontSize;
  }

  var htmlFontChange = function htmlFontChange() {
    var meta = document.getElementsByName('viewport')[0];
    var dpr = initialDpr ? initialDpr > maximumDpr && maximumDpr !== 0 ? maximumDpr : initialDpr : isAndroid() ? 1 : window.devicePixelRatio > maximumDpr && maximumDpr !== 0 ? maximumDpr : window.devicePixelRatio;
    var scale = 1 / dpr;
    var bodyFontSize = baseFontSize * dpr;

    window['ele'] = isObject(window['ele']) ? copyObject(window['ele'], { dpr: dpr, scale: scale, bodyFontSize: bodyFontSize, baseFontSize: baseFontSize }) : { dpr: dpr, scale: scale, bodyFontSize: bodyFontSize, baseFontSize: baseFontSize };

    // 若 head 中已存在 viewport，则在此基础上修改，反之新建
    if (!meta) {
      meta = document.createElement('meta');
      document.head.appendChild(meta);
    }

    meta.setAttribute('name', 'viewport');
    meta.setAttribute('content', 'initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');

    var fontSize = window.innerWidth / 10;

    // 设置 html 的 dpr（仅仅是一个标记）
    document.documentElement.dataset.dpr = dpr;
    // 设置 html 的 font-size 基准值
    document.documentElement.style.fontSize = fontSize + 'px';
    // 防止在未设置 font-size 的元素继承 html 的 font-size 导致字体很大
    document.body.style.fontSize = bodyFontSize + 'px';
  };

  window.addEventListener('load', function () {
    htmlFontChange.call(_this);
  });

  var flag = 0;
  window.addEventListener('resize', function () {
    // 减少 reflow 次数
    if (flag) {
      clearTimeout(flag);
    }
    flag = setTimeout(function () {
      htmlFontChange.call(_this);
      flag = 0;
    }, 100);
  }, false);
})(window);