var TUID = require('../time-uid'),
		t = require('cotest')

var set = new Set(),
		lasts = Array(10).fill(''),
		users = lasts.map(()=>TUID()),
		N = 10000

t('individually increasing and collectively unique', ()=>{
	for (var i=0; i<N; ++i) {
		for (var j=0; j<users.length; ++j) {
			var res = users[j]()
			if (res < lasts[j]) throw Error(`not strinctly increasing: ${res} vs ${lasts[j]}`)
			if (set.has(res)) throw Error(`not unique: ${res}`)
			lasts[j] = res
			set.add(res)
		}
	}
	t('===', true, true)
	console.log(lasts)
})

