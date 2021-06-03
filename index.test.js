'use strict'

const  getHandFromCards = require('./index').getHandFromCards

const allCardsHaveSameSuit= require('./index').allCardsHaveSameSuit

const  allCardsHaveDifferentValue = require('./index').allCardsHaveDifferentValue

const cardsHaveConsecutiveValues = require('./index').cardsHaveConsecutiveValues

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


describe('helper function allCardsHaveDifferentValue', () => {

  it("it returns true if all cards have diferent numbers value ", () => {
		assert.equal(allCardsHaveDifferentValue(["Q-S", "A-C", "J-H", "K-D", "10-S" ]), true)
	
	})

	it("it returns false if any  cards have the same  numbers value ", () => {
		assert.equal(allCardsHaveDifferentValue(["A-S", "A-C", "J-H", "K-D", "10-S" ]), false)
	
	})



})





describe('helper function allCardsHaveSameSuit', () => {

	it("it returns true if all cards have  the same suit ", () => {
		assert.equal(allCardsHaveSameSuit(["Q-S", "A-S", "J-S", "K-S", "10-S" ]), true)
		assert.equal(allCardsHaveSameSuit(["2-C", "8-C", "10-C", "A-C", "Q-C" ]), true)
		assert.equal(allCardsHaveSameSuit(["4-D", "6-D", "J-D", "K-D", "8-D" ]), true)
	
	})

	it("it returns false if any cards have  different suits ", () => {
		assert.equal(allCardsHaveSameSuit(["Q-S", "A-S", "J-D", "K-D", "10-S" ]), false)
		assert.equal(allCardsHaveSameSuit(["2-C", "8-C", "10-D", "A-C", "Q-C" ]), false)
		assert.equal(allCardsHaveSameSuit(["4-D", "6-D", "J-D", "K-D", "8-H" ]), false)
	
	})



})


describe('helper function cardsHaveConsecutiveValues', () => {

	// it("it returns true if all cards have  consecutive values ", () => {
	// 	assert.equal(cardsHaveConsecutiveValues(["Q-S", "A-S", "J-S", "K-S", "10-S" ]), true)
	// 	assert.equal(cardsHaveConsecutiveValues(["4-C", "3-C", "A-C", "5-C", "2-C" ]), true)
	// 	assert.equal(cardsHaveConsecutiveValues(["J-D", "7-D", "10-D", "8-D", "9-D" ]), true)
	
	// })

	it("it returns false if cards  values are not consecutive ", () => {
		assert.equal(cardsHaveConsecutiveValues(["Q-S", "2-S", "J-D", "K-D", "10-S" ]), false)
	//	assert.equal(cardsHaveConsecutiveValues(["2-C", "8-C", "10-D", "A-C", "Q-C" ]), false)
	//	assert.equal(cardsHaveConsecutiveValues(["4-D", "6-D", "J-D", "K-D", "8-H" ]), false)
	
	})



})


