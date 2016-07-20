import ambiguis from './ambiguis.js';

ambiguis({
  initialDpr: 0,
  maximumDpr: 3,
  fontSize: 16
});
module.exports = function(opts) {
  return ambiguis(opts);
}
