var SECONDS_PER_YEAR = 31556926

var DEFAULTS = {
	chars: '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
	startDate: '2016-01-01',
	// default set at 6 char time id
	tMin: 17, // ~= 1000/62
	tMax: 29 * SECONDS_PER_YEAR * 1000, // ~= 62^5
	users: 20, //concurrent users making simultaneous edits
	odds: 1e12 //odds of a duplicate uid per second
}

module.exports = create

/**
 * Unique identifier generator
 * @param {Object} options - options
 * @returns {string} - unique id
 */
function create(options) {
	var cfg = Object.assign({}, DEFAULTS, options),
			base = cfg.chars.length,
			baseLN = Math.log(base),
			timeLen = Math.ceil(Math.log(cfg.tMax/cfg.tMin) / baseLN),
			padLen = cfg.users > 1 ? //birthday problem
				Math.ceil(Math.log(cfg.users * (cfg.users-1) * cfg.odds * cfg.tMin / 2000) / baseLN)
				: 0,
			t0 = Date.parse(cfg.startDate),
			last = 0
	return function tuid() {
		var res = '',
				time = last = Math.max(Math.floor((Date.now() - t0) / cfg.tMin), ++last)

		for (var i=0; i < padLen; ++i) { //initial random right-pading
			res += cfg.chars[Math.floor(Math.random() * base)]
		}
		for (var j=0; j < timeLen; ++j) {
			res = cfg.chars[time % base] + res
			time = Math.floor(time / base)
		}
		return res
	}
}
