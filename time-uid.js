/*
(padding + ((timeMS - refMS)/divMS + inc)) + (padding + RandomID)

arg:
timeLength, timeRef, timeDiv
randomLength

(Duration, Frequency, Start, Random)

timeRef, Hz, years
number of milliseconds since 1 January, 1970 UTC
The Date.now() method returns the number of milliseconds elapsed since 1 January 1970 00:00:00 UTC
dateObj.getTime()
The date time string may be in ISO 8601 format. For example, "2011-10-10" (just date)

C = p(clash for U users) = U^2 / (2 * SIZE^LEN)
SIZE^LEN = U^2 / 2C
LEN*ln(SIZE) = 2*ln(U) - ln(2C)
LEN = (2ln(U) - ln(2C)) / ln(SIZE)


#number of events where 50% collision
LEN = (ln(U)-ln(U-1)-ln(2C)) / ln(SIZE)
LEN = (ln(U)+ln(U-1)) / ln(SIZE)


ex: 10000 simultaneous users, one collision every 2M ops:
users (2ln(10^4) - ln(2/2/10^6))/ln(62) = 14ln(10)/ln(62) = 7.8 chars

ex: 10 simultaneous project users, one collision every 200k ops:
users (2ln(10) - ln(2/2/10^5))/ln(62) = 7ln(10)/ln(62) = 3.90 chars

ex: 5 simultaneous project users, one collision every 2k simultaneous ops:
users (ln(5)+ln(4) - 3ln(10))/ln(62) = 7ln(10)/ln(62) = 2.4 chars

*/

var SECONDS_PER_YEAR = 31556926

var DEFAULTS = {
	chars: '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
	startDate: '2015-01-01',
	// default set at 6 char time id
	tMin: 17, // ~= 1000/62
	tMax: 29 * SECONDS_PER_YEAR * 1000, // ~= 62^5
	length: 10 // default set at 4 char random
	// example of odds of clash in 1 second for 5 concurrent users:
	// length: 10: 5(4) / (2 * 62^5) = 1:90M
	// length: 9: 5(4) / (2 * 62^4) = 1:1.5M
	// example of odds of clash in 1 second for 10 concurrent users:
	// length: 10: 10(9) / (2 * 62^5) = 1:2M
	// length: 9: 10(9) / (2 * 62^4) = 1:300K
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
			padLen = cfg.length - timeLen,
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
