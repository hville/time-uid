# time uid

Yet another unique id module, for use in distributed systems. Features and Requirements

* all uids from a given user must be in lexicographical order
* all uids from all concurrent users must be unique with a certain probability
* ability to change the uid length for nested groups

This module is for cases where a lighter UID can be used in sub-groups (project files, thread messages)

Example id1/id2: `/cIWr5hA4peMq6/h0ApXe3hZ`

For comparison, below are example of available alternatives:

* `npm timer-uid`, 20char, firebase, style
  * `/-IWr5h0A4pe3h_mjpZq6/_IWr5h0A4pe3hMmjpZq6`
* `npm cuid`
  * `/c-h72gsb32-0000-udoc-l363eofy/c-h72gsb32-0000-udoc-l363eofy`
* RFC-4122 style
  * `/f81d4fae-7dec-11d0-a765-00a0c91e6bf6/f81d4fae-7dec-11d0-a765-00a0c91e6bf6`

## API

```javascript
var TUID = require('tuid')
var tuid = TUID({users: 25, odds: 1e12, startDate: '2010-01-01'}),
    uid0 = tuid()
```

### Options and Defaults

* `chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'`, character set
* `startDate = '2016-01-01'`, the beginning of time
* `tMin = 17`, minimum time interval in ms (~= 1000/62)
* `tMax = 29 * SECONDS_PER_YEAR * 1000`, maximum time in ms (29 years ~= 62^5)
* `length = 10` // default set at 4 char random
* `users = 20`, minimum concurrent users making simultaneous edits
* `odds = 1e12` mininimum odds of a duplicate uid per second (1 in ...)


## others modules on npm

* (+) `cuid`, c-h72gsb32-0000-udoc-l363eofy, 29char
* (+) `puid`, 4 sections and has 24 chars
* (+) `timer-uid`, 20char, 8time + 12rnd, same as firebase
* `component-uid`, random only
* `gen-uid`
* `genuid`, random only
* `j-uid`
* `lite-id`, random only
* `micro-uid`
* `micro-uid`, random base 62 uid
* `nid`, random only
* `pure-uuid`, RFC-4122
* `random-bytes`, random only
* `random-id`, random only
* `rndm`, random only
* `scuid`, ciuwr5ekh00044pe13ruhsmjpq6, 27char, random
* `short-uid`, generates IDs of increasing length
* `short-uuid`, ??
* `simple-random-id`, random only
* `simple-uid`, node-oly, 24-bytes of chaos, Base64
* `smart-id`, random only
* `uid-safe`, crypto
* `uid-util`
* `uid`, variable length, random only
* `uid2`
* `uniqid`, Unique Hexatridecimal ID generator (base16)
* `unique-id-generator`, Date.now, prefix, numbers only (base10)
* `unique-id`
* `unique`
* `uuid-pure`, ???
* `uuid-token-generator`, ???
