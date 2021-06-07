'use strict'

// THIS TESTS CAN BE RUN WITH JEST OR MOCHA

// MOCHA :: npm run mochatest ./Exercises/pokerHandChecker

const  getHandFromCards = require('./index').getHandFromCards
const allCardsHaveSameSuit= require('./index').allCardsHaveSameSuit
const  allCardsHaveDifferentValue = require('./index').allCardsHaveDifferentValue
const cardsHaveConsecutiveValues = require('./index').cardsHaveConsecutiveValues
const cardsAreValid = require('./index').cardsAreValid

const assert = require('assert').strict

describe('program', () => {  

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
		assert.equal(getHandFromCards(["7-S", "7-S", "3-S", "2-S", "3-S" ]), undefined)
		assert.equal(getHandFromCards(["J-D", "J-D", "J-D", "2-S", "3-S" ]), undefined)
		assert.equal(getHandFromCards(["A-S", "A-S", "A-S", "A-S", "A-S" ]), undefined)
		assert.equal(getHandFromCards(["K-C", "K-C", "3-S", "2-S", "K-C" ]), undefined)
	})

	it("must not accept 5 equal numbered cards", () => {
		assert.equal(getHandFromCards(["Q-S", "Q-H", "Q-C", "Q-D", "Q-D" ]), undefined)
		assert.equal(getHandFromCards(["A-S", "A-H", "A-C", "A-D", "A-C" ]), undefined)
		assert.equal(getHandFromCards(["K-S", "K-H", "K-C", "K-D", "K-H" ]), undefined)
		assert.equal(getHandFromCards(["J-S", "J-H", "J-C", "J-D", "J-S" ]), undefined)
		assert.equal(getHandFromCards(["10-S", "10-H", "10-C", "10-D", "10-D" ]), undefined)
		assert.equal(getHandFromCards(["4-S", "4-H", "4-C", "4-D", "4-C" ]), undefined)
	})

	it(`it recognizes a 'Royal Flush' ('A-S', 'K-S', 'Q-S', 'J-S', '10-S') set of cards
	 and returns it from the function`, () => {
		assert.equal(getHandFromCards(['A-S', 'K-S', 'Q-S', 'J-S', '10-S']), "Royal Flush")
		assert.equal(getHandFromCards(['A-D', 'K-D', 'Q-D', 'J-D', '10-D']), "Royal Flush")
		assert.equal(getHandFromCards(['A-C', 'K-C', 'Q-C', 'J-C', '10-C']), "Royal Flush")
		assert.equal(getHandFromCards(['A-H', 'K-H', 'Q-H', 'J-H', '10-H']), "Royal Flush")
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
			assert.equal(getHandFromCards(['10-S', '10-C', '10-D', '10-H', '6-H']), "Four of a kind")
			assert.equal(getHandFromCards(['A-D', 'A-C', 'A-H', '4-H', 'A-S']), "Four of a kind")
			assert.equal(getHandFromCards(['J-D', 'J-H', 'J-S', 'J-C', '7-D']), "Four of a kind")
			assert.equal(getHandFromCards(['3-C', '3-D', '3-H', '3-S', '9-S']), "Four of a kind")
	})

	it(`it recognizes a 'Full House' hand ('10-S', '10-C', '10-D', 'A-S', 'A-H') set of cards
	 and returns it from the function`, () => {
			assert.equal(getHandFromCards(['10-S', '10-C', '10-D', 'A-S', 'A-H']), "Full House")
			assert.equal(getHandFromCards(['A-D', 'A-C', 'A-H', '4-H', '4-S']), "Full House")
			assert.equal(getHandFromCards(['J-D', 'J-H', 'J-S', '7-C', '7-D']), "Full House")
			assert.equal(getHandFromCards(['3-C', '3-D', '3-H', '9-D', '9-S']), "Full House")
	})

	it(`it recognizes a 'Three of a kind' hand ('10-S', '10-C', '10-D', '2-S', 'A-H') set of cards
	 and returns it from the function`, () => {
			assert.equal(getHandFromCards(['10-S', '10-C', '10-D', '7-S', 'A-H']), "Three of a kind")
			assert.equal(getHandFromCards(['A-D', 'A-C', 'A-H', '9-H', '4-S']), "Three of a kind")
			assert.equal(getHandFromCards(['J-D', 'J-H', 'J-S', 'Q-C', '7-D']), "Three of a kind")
			assert.equal(getHandFromCards(['3-C', '3-D', '3-H', 'K-D', '9-S']), "Three of a kind")
	})

	it(`it recognizes a 'Two Pairs' hand ('10-S', '10-C', '2-D', '2-S', 'A-H') set of cards
	 and returns it from the function`, () => {
		assert.equal(getHandFromCards(['10-S', '10-C', '2-D', '2-S', 'A-H']), "Two Pairs")
		assert.equal(getHandFromCards(['A-D', 'A-C', '9-H', '9-S', '4-S']), "Two Pairs")
		assert.equal(getHandFromCards(['J-D', 'J-H', 'Q-S', 'Q-C', '7-D']), "Two Pairs")
		assert.equal(getHandFromCards(['3-C', '3-D', 'K-H', 'K-D', '9-S']), "Two Pairs")
	})

	it(`it recognizes a 'One Pair' hand ('10-S', '10-C', '8-D', '2-S', 'A-H') set of cards
	 and returns it from the function`, () => {
			assert.equal(getHandFromCards(['10-S', '10-C', '6-D', '7-S', 'A-H']), "One Pair")
			assert.equal(getHandFromCards(['A-D', 'A-C', '10-H', '9-H', '4-S']), "One Pair")
			assert.equal(getHandFromCards(['J-D', 'J-H', 'K-S', 'Q-C', '7-D']), "One Pair")
			assert.equal(getHandFromCards(['3-C', '3-D', '2-H', 'K-D', '9-S']), "One Pair")
	})

	it(`it recognizes a 'High Card' hand ('A-S', '4-C', '8-D', '2-S', 'A-H') set of cards
	 and returns it from the function`, () => {
			assert.equal(getHandFromCards(['4-S', '10-C', '6-D', '7-S', 'A-H']), "High Card")
			assert.equal(getHandFromCards(['K-D', '3-C', '10-H', '9-H', '4-S']), "High Card")
			assert.equal(getHandFromCards(['J-D', '9-H', '2-S', '10-C', '7-D']), "High Card")
			assert.equal(getHandFromCards(['10-C', '3-D', '2-H', 'A-D', '9-S']), "High Card")
	})

})


describe('helper function allCardsHaveDifferentValue', () => {

  it("it returns true if all cards have diferent numbers value ", () => {
		assert.equal(allCardsHaveDifferentValue(["Q-S", "A-C", "J-H", "K-D", "10-S" ]), true)
	
	})

	it("it returns false if any  cards have the same  numbers value ", () => {
		assert.equal(allCardsHaveDifferentValue(["A-S", "A-C", "J-H", "K-D", "10-S" ]), false)
		assert.equal(allCardsHaveDifferentValue(["A-S", "7-C", "K-H", "K-D", "10-S" ]), false)
		assert.equal(allCardsHaveDifferentValue(["2-S", "A-C", "J-H", "2-D", "10-S" ]), false)
		assert.equal(allCardsHaveDifferentValue(["Q-S", "A-C", "J-H", "Q-D", "Q-S" ]), false)
	
	})



})


describe("helper function cardsAreValid: ", () => {
	it("must accept an array of 5 different items with the correct card format (Q-S)", () => {
		assert.equal(cardsAreValid(["Q-S", "Q-C", "Q-H", "Q-D", "2-S" ]), true)
		assert.equal(cardsAreValid(["Q-S","Q-S", "Q-C", "Q-H", "Q-D", "2-S" ]), false)
		assert.equal(cardsAreValid(["Q-C", "Q-H", "Q-D", "2-S" ]), false)
		assert.equal(cardsAreValid([1, 2, 3, 54, 5 ]), false)
		assert.equal(cardsAreValid(["1", null,  false, undefined, 50 ]), false)
		assert.equal(cardsAreValid([1, 2, 3, 54, 5, false, undefined, false, undefined, "sad" ]), false)
		assert.equal(cardsAreValid([]), false)
		assert.equal(cardsAreValid({}), false)
	 	assert.equal(cardsAreValid(["A-S", "10-C", "4-H", "9-D", "J-S" ]), true)
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
		assert.equal(cardsHaveConsecutiveValues(["Q-S", "A-S", "J-S", "K-S", "10-S" ]), true)
		assert.equal(cardsHaveConsecutiveValues(["4-C", "3-C", "A-C", "5-C", "2-C" ]), true)
		assert.equal(cardsHaveConsecutiveValues(["J-D", "7-D", "10-D", "8-D", "9-D" ]), true)
	
	})

	it("it returns false if cards  values are not consecutive ", () => {
		assert.equal(cardsHaveConsecutiveValues(["Q-S", "2-S", "J-D", "K-D", "10-S" ]), false)
		assert.equal(cardsHaveConsecutiveValues(["2-C", "8-C", "10-D", "A-C", "Q-C" ]), false)
		assert.equal(cardsHaveConsecutiveValues(["4-D", "6-D", "J-D", "K-D", "8-H" ]), false)
		assert.equal(cardsHaveConsecutiveValues(["4-S", "6-H", "3-D", "A-D", "7-C" ]), false)
	
	})



})


