(function(window) {

  const isAndroid = function() {
    let userAgent = navigator.userAgent;
    let reg = /Android|Adr/;
    return reg.test(userAgent);
  };

  const isObject = function(obj) {
    return typeof obj === 'object' && obj !== null;
  };

  const copyObject = function(obj, target) {
    for(let key of Object.keys(target)) {
      obj[key] = target[key];
    }
    return obj;
  };

  let initialDpr = 0;
  let maximumDpr = 0;
  let maxWidth = 9999999;
  let baseFontSize = 12;

  function ambiguis(opts) {

    if (isObject(opts)) {
      initialDpr = parseFloat(opts.initialDpr) || 0;
      maximumDpr = parseFloat(opts.maximumDpr) || 0;
      baseFontSize = parseFloat(opts.fontSize) || baseFontSize;
      maxWidth = parseFloat(opts.maxWidth) || maxWidth;
    }


    let htmlFontChange = function() {
      let meta = document.getElementsByName('viewport')[0];
      let dpr = initialDpr ? (initialDpr > maximumDpr && maximumDpr !== 0 ? maximumDpr : initialDpr) : (isAndroid() ? 1 : (window.devicePixelRatio > maximumDpr && maximumDpr !==0 ? maximumDpr : window.devicePixelRatio));
      let scale = 1 / dpr;
      let bodyFontSize = baseFontSize * dpr;

      window['ele'] = isObject(window['ele']) ? copyObject(window['ele'], {dpr, scale, baseFontSize, maxWidth}) : {dpr, scale, baseFontSize, maxWidth};

      // 若 head 中已存在 viewport，则在此基础上修改，反之新建
      if (!meta) {
        meta = document.createElement('meta');
        document.head.appendChild(meta);
      }

      meta.setAttribute('name', 'viewport');
      meta.setAttribute('content', `initial-scale=${scale}, maximum-scale=${scale}, minimum-scale=${scale}, user-scalable=no`);

      let fontSize = window.innerWidth > maxWidth * dpr ? maxWidth * dpr / 10 : window.innerWidth / 10;

      // 设置 html 的 dpr（仅仅是一个标记）
      document.documentElement.dataset.dpr = dpr;
      // 设置 html 的 font-size 基准值
      document.documentElement.style.fontSize = `${fontSize}px`;
      // 防止在未设置 font-size 的元素继承 html 的 font-size 导致字体很大
      document.body.style.fontSize = `${bodyFontSize}px`;
    };


    document.addEventListener('DOMContentLoaded', () => {
      htmlFontChange.call(this);
    });

    let flag = 0;
    window.addEventListener('resize', () => {
      // 减少 reflow 次数
      clearTimeout(flag);
      flag = setTimeout(() => {
        htmlFontChange.call(this);
      }, 300);
    }, false);
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = exports = ambiguis;
  } else {
    window.ambiguis = ambiguis;
  }
})(window);
