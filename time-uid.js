'use strict';
var CHARS64 = '*0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz';
var msTime = 0;  // last time to be incremented if identical to last
var POW64 = [1];
for (var i=1; i<7; i++) POW64[i] = 64 * POW64[i-1];


function pow64(v) { return POW64[v] ? POW64[v] : Math.pow(64,v)	}

function rndChar() {return CHARS64[Math.floor(Math.random()*64)]}


// integer Base 10 to string Base64 with exponent of 7 B64E7
// '012345' ==> 0.12345 * 64^6
function toB64E6(val, len, isPad) { // if padded, add random digits when beyond the number precision
  if (typeof val !== 'number' || val < 0) return;  	  // only accept positive numbers
	if (len === undefined) len = 7
	else if (len%1 !== 0 || len <0) return;							// 7 chars covers ~139 years since 1970
	val = Math.floor( val * pow64(len-7))

	for (var i=0, str=''; i<len; i++) {
		var digit = (isPad && len-i > 7) ? rndChar() : CHARS64[val%64] // maximum 8.8 significant digits
    str = digit + str;  // from right to left, least to most significant
    val = Math.floor(val/64);
  }
  return str;
}


// string to number
function fromB64E6(str64) {
	if (typeof str64 !== 'string') return
	for (var i=0, result = 0; i<str64.length ;i++)
		result += CHARS64.indexOf(str64[i]) * pow64(6-i);
  return Math.floor(result);
}


// make a UID of len characters based on time
// len time increment: 7 ==> 1ms; 6 ==> 64ms; 5 ==> 4s; 4 ==> 4m; 3 ==> 5h; 2 ==> 12d;
// good until year 2109 reset in 2110
function uidB64(len) {
	if (len === undefined) len = 7
	else if (typeof len !== 'number' || len < 0) return
	var msDelta = len < 7 ? pow64(7-len) : 1;		// min time increment to the last time stamp used
	msTime = Math.max( Date.now(), msTime + msDelta )
	return toB64E6( msTime, len, true ); //additional digits for long keys
}


// expose all utility methods
//uidB64.lastUid = lastUid;
uidB64.set = toB64E6;
uidB64.get = fromB64E6;


module.exports = uidB64;

