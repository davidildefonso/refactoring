'use strict'

const  getHandFromCards = require('./index').getHandFromCards
const allCardsHaveSameSuit= require('./index').allCardsHaveSameSuit
const  allCardsHaveDifferentValue = require('./index').allCardsHaveDifferentValue
const cardsHaveConsecutiveValues = require('./index').cardsHaveConsecutiveValues

const assert = require('assert').strict

describe('program', () => {
  // it("must accept an array of 5 different items with the correct card format (Q-S)", () => {
	// 	assert.equal(getHandFromCards(["Q-S", "Q-C", "Q-H", "Q-D", "2-S" ]), true)
	// 	assert.equal(getHandFromCards(["A-S", "10-C", "4-H", "9-D", "J-S" ]), true)
	// })

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

	it(`it recognizes a 'Royal Flush' ('A-S', 'K-S', 'Q-S', 'J-S', '10-S') set of cards
	 and returns it from the function`, () => {
			assert.equal(getHandFromCards(['A-S', 'K-S', 'Q-S', 'J-S', '10-S']), "Royal Flush")
	})

	it(`it recognizes a 'Straight Flush' ('10-S', '9-S', '8-S', '7-S', '6-S') set of cards
	 and returns it from the function`, () => {
			assert.equal(getHandFromCards(['10-S', '9-S', '8-S', '7-S', '6-S']), "Straight Flush")
			assert.equal(getHandFromCards(['A-H', '2-H', '3-H', '4-H', '5-H']), "Straight Flush")
			assert.equal(getHandFromCards(['J-D', '10-D', '9-D', '8-D', '7-D']), "Straight Flush")
			assert.equal(getHandFromCards(['K-C', 'Q-C', 'J-C', '10-C', '9-C']), "Straight Flush")
	})

	it(`it recognizes a 'Flush' hand ('10-S', 'A-S', '3-S', '7-S', '5-S') set of cards
	 and returns it from the function`, () => {
			assert.equal(getHandFromCards(['10-S', 'A-S', '3-S', '7-S', '5-S']), "Flush")
			assert.equal(getHandFromCards(['A-H', '2-H', '4-H', '9-H', 'J-H']), "Flush")
			assert.equal(getHandFromCards(['J-D', 'A-D', '3-D', '2-D', '7-D']), "Flush")
			assert.equal(getHandFromCards(['2-C', '6-C', '3-C', '10-C', '4-C']), "Flush")
	})

	it(`it recognizes a 'Straight' hand ('10-S', '9-C', '8-D', '7-S', '6-H') set of cards
	 and returns it from the function`, () => {
			assert.equal(getHandFromCards(['10-S', '9-C', '8-D', '7-S', '6-H']), "Straight")
			assert.equal(getHandFromCards(['A-D', '2-C', '3-H', '4-H', '5-S']), "Straight")
			assert.equal(getHandFromCards(['J-D', '10-H', '9-S', '8-C', '7-D']), "Straight")
			assert.equal(getHandFromCards(['K-C', 'Q-D', 'J-H', '10-C', '9-S']), "Straight")
	})

	it(`it recognizes a 'High Card' hand ('10-S', 'A-C', '8-D', '3-S', '6-H') set of cards
	 and returns it from the function`, () => {
			assert.equal(getHandFromCards(['10-S', 'A-C', '8-D', '3-S', '6-H']), "High Card")
			assert.equal(getHandFromCards(['A-D', 'Q-C', '2-H', '8-H', '10-S']), "High Card")
		
	})

	it(`it recognizes a 'Four of a kind' hand ('10-S', '10-C', '10-D', '10-S', '6-H') set of cards
	 and returns it from the function`, () => {
			assert.equal(getHandFromCards(['10-S', '10-C', '10-D', '10-S', '6-H']), "Four of a kind")
			assert.equal(getHandFromCards(['A-D', 'A-C', 'A-H', '4-H', 'A-S']), "Four of a kind")
			assert.equal(getHandFromCards(['J-D', 'J-H', 'J-S', 'J-C', '7-D']), "Four of a kind")
			assert.equal(getHandFromCards(['3-C', '3-D', '3-H', '3-S', '9-S']), "Four of a kind")
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

	it("it returns true if all cards have  consecutive values ", () => {
		assert.equal(cardsHaveConsecutiveValues(["Q-S", "A-S", "J-S", "K-S", "10-S" ])[0], true)
		assert.equal(cardsHaveConsecutiveValues(["4-C", "3-C", "A-C", "5-C", "2-C" ])[0], true)
		assert.equal(cardsHaveConsecutiveValues(["J-D", "7-D", "10-D", "8-D", "9-D" ])[0], true)
	
	})

	it("it returns false if cards  values are not consecutive ", () => {
		assert.equal(cardsHaveConsecutiveValues(["Q-S", "2-S", "J-D", "K-D", "10-S" ])[0], false)
		assert.equal(cardsHaveConsecutiveValues(["2-C", "8-C", "10-D", "A-C", "Q-C" ])[0], false)
		assert.equal(cardsHaveConsecutiveValues(["4-D", "6-D", "J-D", "K-D", "8-H" ])[0], false)
		assert.equal(cardsHaveConsecutiveValues(["4-S", "6-H", "3-D", "A-D", "7-C" ])[0], false)
	
	})



})


