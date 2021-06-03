'use strict'

const  getHandFromCards = require('./index').getHandFromCards

const  identifyCard = require('./index').identifyCard

const assert = require('assert').strict


describe('program', () => {

  it("must accept an array of 5 different items with the correct card format (Q-S)", () => {
		assert.equal(getHandFromCards(["Q-S", "Q-C", "Q-H", "Q-D", "2-S" ]), true)
		assert.equal(getHandFromCards(["A-S", "10-C", "4-H", "9-D", "J-S" ]), true)
	})

	it("must not accept incorrect formatted or invalid parameter", () => {
		assert.equal(getHandFromCards([]), undefined)
		assert.equal(getHandFromCards(12,23,2), undefined)
		assert.equal(getHandFromCards(), undefined)
		assert.equal(getHandFromCards("loco"), undefined)
		assert.equal(getHandFromCards(null), undefined)
		assert.equal(getHandFromCards([1,2,3,4,5]), undefined)
		assert.equal(getHandFromCards([false,undefined,".",-1,"string"]), undefined)
		assert.equal(getHandFromCards({2:"",32:"w",32:"s2"}), undefined)
	})

	it("must not accept repeating cards", () => {
		assert.equal(getHandFromCards(["Q-S", "Q-S", "Q-S", "Q-S", "Q-S" ]), undefined)
		assert.equal(getHandFromCards(["A-S", "2-S", "3-S", "2-S", "3-S" ]), undefined)
	})

})


describe('helper function identifyHand', () => {

  it("must accept an array of 5 different items with the correct card format (Q-S)", () => {
		assert.equal(getHandFromCards(["Q-S", "Q-C", "Q-H", "Q-D", "2-S" ]), true)
		assert.equal(getHandFromCards(["A-S", "10-C", "4-H", "9-D", "J-S" ]), true)
	})



})






