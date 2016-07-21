(function(window) {
  function ambiguis(opts) {
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

    let script = document.querySelector('#ambiguis');
    let initialDpr = 0;
    let maximumDpr = 0;
    let baseFontSize = 12;

    if (isObject(opts)) {
      let initial = parseFloat(opts.initialDpr);
      let maximum = parseFloat(opts.maximumDpr);
      let fontSize = parseFloat(opts.fontSize);
      initialDpr = initial ? initial : 0;

      maximumDpr = maximum ? maximum : 0;
      baseFontSize = fontSize ? fontSize : baseFontSize;
    }


    let htmlFontChange = function() {
      let meta = document.getElementsByName('viewport')[0];
      let dpr = initialDpr ? (initialDpr > maximumDpr && maximumDpr !== 0 ? maximumDpr : initialDpr) : (isAndroid() ? 1 : (window.devicePixelRatio > maximumDpr && maximumDpr !==0 ? maximumDpr : window.devicePixelRatio));
      let scale = 1 / dpr;
      let bodyFontSize = baseFontSize * dpr;

      window['ele'] = isObject(window['ele']) ? copyObject(window['ele'], {dpr, scale, bodyFontSize, baseFontSize}) : {dpr, scale, bodyFontSize, baseFontSize};

      // 若 head 中已存在 viewport，则在此基础上修改，反之新建
      if (!meta) {
        meta = document.createElement('meta');
        document.head.appendChild(meta);
      }

      meta.setAttribute('name', 'viewport');
      meta.setAttribute('content', `initial-scale=${scale}, maximum-scale=${scale}, minimum-scale=${scale}, user-scalable=no`);

      let fontSize = window.innerWidth / 10;

      // 设置 html 的 dpr（仅仅是一个标记）
      document.documentElement.dataset.dpr = dpr;
      // 设置 html 的 font-size 基准值
      document.documentElement.style.fontSize = `${fontSize}px`;
      // 防止在未设置 font-size 的元素继承 html 的 font-size 导致字体很大
      document.body.style.fontSize = `${bodyFontSize}px`;
    };

    window.addEventListener('load', () => {
      htmlFontChange.call(this);
    });

    let flag = 0;
    window.addEventListener('resize', () => {
      // 减少 reflow 次数
      if(flag) {
        clearTimeout(flag);
      }
      flag = setTimeout(() => {
        htmlFontChange.call(this);
        flag = 0;
      }, 100);
    }, false);
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = exports = ambiguis;
  } else {
    window.ambiguis = ambiguis;
  }
})(window);
