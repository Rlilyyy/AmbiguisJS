'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

(function (window) {

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

  var initialDpr = 0;
  var maximumDpr = 0;
  var maxWidth = 9999999;
  var baseFontSize = 12;

  function ambiguis(opts) {
    var _this = this;

    if (isObject(opts)) {
      initialDpr = parseFloat(opts.initialDpr) || 0;
      maximumDpr = parseFloat(opts.maximumDpr) || 0;
      baseFontSize = parseFloat(opts.fontSize) || baseFontSize;
      maxWidth = parseFloat(opts.maxWidth) || maxWidth;
    }

    var htmlFontChange = function htmlFontChange() {
      var meta = document.getElementsByName('viewport')[0];
      var dpr = initialDpr ? initialDpr > maximumDpr && maximumDpr !== 0 ? maximumDpr : initialDpr : isAndroid() ? 1 : window.devicePixelRatio > maximumDpr && maximumDpr !== 0 ? maximumDpr : window.devicePixelRatio;
      var scale = 1 / dpr;
      var bodyFontSize = baseFontSize * dpr;

      window['ele'] = isObject(window['ele']) ? copyObject(window['ele'], { dpr: dpr, scale: scale, baseFontSize: baseFontSize, maxWidth: maxWidth }) : { dpr: dpr, scale: scale, baseFontSize: baseFontSize, maxWidth: maxWidth };

      // 若 head 中已存在 viewport，则在此基础上修改，反之新建
      if (!meta) {
        meta = document.createElement('meta');
        document.head.appendChild(meta);
      }

      meta.setAttribute('name', 'viewport');
      meta.setAttribute('content', 'initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');

      var fontSize = window.innerWidth > maxWidth * dpr ? maxWidth * dpr / 10 : window.innerWidth / 10;

      // 设置 html 的 dpr（仅仅是一个标记）
      document.documentElement.dataset.dpr = dpr;
      // 设置 html 的 font-size 基准值
      document.documentElement.style.fontSize = fontSize + 'px';
      // 防止在未设置 font-size 的元素继承 html 的 font-size 导致字体很大
      document.body.style.fontSize = bodyFontSize + 'px';
    };

    document.addEventListener('DOMContentLoaded', function () {
      htmlFontChange.call(_this);
    });

    var flag = 0;
    window.addEventListener('resize', function () {
      // 减少 reflow 次数
      clearTimeout(flag);
      flag = setTimeout(function () {
        htmlFontChange.call(_this);
      }, 300);
    }, false);
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = exports = ambiguis;
  } else {
    window.ambiguis = ambiguis;
  }
})(window);
//# sourceMappingURL=data:application/json;base64,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QVQsQ0FBeUIsS0FBekIsQ0FBK0IsUUFBL0IsR0FBNkMsUUFBN0M7QUFDQTtBQUNBLGVBQVMsSUFBVCxDQUFjLEtBQWQsQ0FBb0IsUUFBcEIsR0FBa0MsWUFBbEM7QUFDRCxLQXpCRDs7QUE0QkEsYUFBUyxnQkFBVCxDQUEwQixrQkFBMUIsRUFBOEMsWUFBTTtBQUNsRCxxQkFBZSxJQUFmO0FBQ0QsS0FGRDs7QUFJQSxRQUFJLE9BQU8sQ0FBWDtBQUNBLFdBQU8sZ0JBQVAsQ0FBd0IsUUFBeEIsRUFBa0MsWUFBTTtBQUN0QztBQUNBLG1CQUFhLElBQWI7QUFDQSxhQUFPLFdBQVcsWUFBTTtBQUN0Qix1QkFBZSxJQUFmO0FBQ0QsT0FGTSxFQUVKLEdBRkksQ0FBUDtBQUdELEtBTkQsRUFNRyxLQU5IO0FBT0Q7O0FBRUQsTUFBSSxPQUFPLE1BQVAsS0FBa0IsV0FBbEIsSUFBaUMsT0FBTyxPQUE1QyxFQUFxRDtBQUNuRCxXQUFPLE9BQVAsR0FBaUIsVUFBVSxRQUEzQjtBQUNELEdBRkQsTUFFTztBQUNMLFdBQU8sUUFBUCxHQUFrQixRQUFsQjtBQUNEO0FBQ0YsQ0FqRkQsRUFpRkcsTUFqRkgiLCJmaWxlIjoiYW1iaWd1aXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24od2luZG93KSB7XG5cbiAgY29uc3QgaXNBbmRyb2lkID0gZnVuY3Rpb24oKSB7XG4gICAgbGV0IHVzZXJBZ2VudCA9IG5hdmlnYXRvci51c2VyQWdlbnQ7XG4gICAgbGV0IHJlZyA9IC9BbmRyb2lkfEFkci87XG4gICAgcmV0dXJuIHJlZy50ZXN0KHVzZXJBZ2VudCk7XG4gIH07XG5cbiAgY29uc3QgaXNPYmplY3QgPSBmdW5jdGlvbihvYmopIHtcbiAgICByZXR1cm4gdHlwZW9mIG9iaiA9PT0gJ29iamVjdCcgJiYgb2JqICE9PSBudWxsO1xuICB9O1xuXG4gIGNvbnN0IGNvcHlPYmplY3QgPSBmdW5jdGlvbihvYmosIHRhcmdldCkge1xuICAgIGZvcihsZXQga2V5IG9mIE9iamVjdC5rZXlzKHRhcmdldCkpIHtcbiAgICAgIG9ialtrZXldID0gdGFyZ2V0W2tleV07XG4gICAgfVxuICAgIHJldHVybiBvYmo7XG4gIH07XG5cbiAgbGV0IGluaXRpYWxEcHIgPSAwO1xuICBsZXQgbWF4aW11bURwciA9IDA7XG4gIGxldCBtYXhXaWR0aCA9IDk5OTk5OTk7XG4gIGxldCBiYXNlRm9udFNpemUgPSAxMjtcblxuICBmdW5jdGlvbiBhbWJpZ3VpcyhvcHRzKSB7XG5cbiAgICBpZiAoaXNPYmplY3Qob3B0cykpIHtcbiAgICAgIGluaXRpYWxEcHIgPSBwYXJzZUZsb2F0KG9wdHMuaW5pdGlhbERwcikgfHwgMDtcbiAgICAgIG1heGltdW1EcHIgPSBwYXJzZUZsb2F0KG9wdHMubWF4aW11bURwcikgfHwgMDtcbiAgICAgIGJhc2VGb250U2l6ZSA9IHBhcnNlRmxvYXQob3B0cy5mb250U2l6ZSkgfHwgYmFzZUZvbnRTaXplO1xuICAgICAgbWF4V2lkdGggPSBwYXJzZUZsb2F0KG9wdHMubWF4V2lkdGgpIHx8IG1heFdpZHRoO1xuICAgIH1cblxuXG4gICAgbGV0IGh0bWxGb250Q2hhbmdlID0gZnVuY3Rpb24oKSB7XG4gICAgICBsZXQgbWV0YSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlOYW1lKCd2aWV3cG9ydCcpWzBdO1xuICAgICAgbGV0IGRwciA9IGluaXRpYWxEcHIgPyAoaW5pdGlhbERwciA+IG1heGltdW1EcHIgJiYgbWF4aW11bURwciAhPT0gMCA/IG1heGltdW1EcHIgOiBpbml0aWFsRHByKSA6IChpc0FuZHJvaWQoKSA/IDEgOiAod2luZG93LmRldmljZVBpeGVsUmF0aW8gPiBtYXhpbXVtRHByICYmIG1heGltdW1EcHIgIT09MCA/IG1heGltdW1EcHIgOiB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbykpO1xuICAgICAgbGV0IHNjYWxlID0gMSAvIGRwcjtcbiAgICAgIGxldCBib2R5Rm9udFNpemUgPSBiYXNlRm9udFNpemUgKiBkcHI7XG5cbiAgICAgIHdpbmRvd1snZWxlJ10gPSBpc09iamVjdCh3aW5kb3dbJ2VsZSddKSA/IGNvcHlPYmplY3Qod2luZG93WydlbGUnXSwge2Rwciwgc2NhbGUsIGJhc2VGb250U2l6ZSwgbWF4V2lkdGh9KSA6IHtkcHIsIHNjYWxlLCBiYXNlRm9udFNpemUsIG1heFdpZHRofTtcblxuICAgICAgLy8g6IulIGhlYWQg5Lit5bey5a2Y5ZyoIHZpZXdwb3J077yM5YiZ5Zyo5q2k5Z+656GA5LiK5L+u5pS577yM5Y+N5LmL5paw5bu6XG4gICAgICBpZiAoIW1ldGEpIHtcbiAgICAgICAgbWV0YSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ21ldGEnKTtcbiAgICAgICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChtZXRhKTtcbiAgICAgIH1cblxuICAgICAgbWV0YS5zZXRBdHRyaWJ1dGUoJ25hbWUnLCAndmlld3BvcnQnKTtcbiAgICAgIG1ldGEuc2V0QXR0cmlidXRlKCdjb250ZW50JywgYGluaXRpYWwtc2NhbGU9JHtzY2FsZX0sIG1heGltdW0tc2NhbGU9JHtzY2FsZX0sIG1pbmltdW0tc2NhbGU9JHtzY2FsZX0sIHVzZXItc2NhbGFibGU9bm9gKTtcblxuICAgICAgbGV0IGZvbnRTaXplID0gd2luZG93LmlubmVyV2lkdGggPiBtYXhXaWR0aCAqIGRwciA/IG1heFdpZHRoICogZHByIC8gMTAgOiB3aW5kb3cuaW5uZXJXaWR0aCAvIDEwO1xuXG4gICAgICAvLyDorr7nva4gaHRtbCDnmoQgZHBy77yI5LuF5LuF5piv5LiA5Liq5qCH6K6w77yJXG4gICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuZGF0YXNldC5kcHIgPSBkcHI7XG4gICAgICAvLyDorr7nva4gaHRtbCDnmoQgZm9udC1zaXplIOWfuuWHhuWAvFxuICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLmZvbnRTaXplID0gYCR7Zm9udFNpemV9cHhgO1xuICAgICAgLy8g6Ziy5q2i5Zyo5pyq6K6+572uIGZvbnQtc2l6ZSDnmoTlhYPntKDnu6fmib8gaHRtbCDnmoQgZm9udC1zaXplIOWvvOiHtOWtl+S9k+W+iOWkp1xuICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5mb250U2l6ZSA9IGAke2JvZHlGb250U2l6ZX1weGA7XG4gICAgfTtcblxuXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcbiAgICAgIGh0bWxGb250Q2hhbmdlLmNhbGwodGhpcyk7XG4gICAgfSk7XG5cbiAgICBsZXQgZmxhZyA9IDA7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsICgpID0+IHtcbiAgICAgIC8vIOWHj+WwkSByZWZsb3cg5qyh5pWwXG4gICAgICBjbGVhclRpbWVvdXQoZmxhZyk7XG4gICAgICBmbGFnID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGh0bWxGb250Q2hhbmdlLmNhbGwodGhpcyk7XG4gICAgICB9LCAzMDApO1xuICAgIH0sIGZhbHNlKTtcbiAgfTtcblxuICBpZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgJiYgbW9kdWxlLmV4cG9ydHMpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHMgPSBhbWJpZ3VpcztcbiAgfSBlbHNlIHtcbiAgICB3aW5kb3cuYW1iaWd1aXMgPSBhbWJpZ3VpcztcbiAgfVxufSkod2luZG93KTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
