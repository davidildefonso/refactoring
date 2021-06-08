'use strict'

const getRandomHand = require('./index').getRandomHand
const  getRandomCard = require('./index').getRandomCard
const getRandomSuit = require('./index').getRandomSuit
const validateFormat = require('./index').validateFormat
const numberToStr = require('./index').numberToStr
const allCardsAreDifferent = require('./index').allCardsAreDifferent
const unique = require('./index').unique
const generateDeck = require('./index').generateDeck

const assert = require('assert').strict

describe('function getRandomHand', () => {

  it("returns an array ", () => {
		const randomHand = getRandomHand()
		expect(Array.isArray(randomHand)).toBe(true)
	
	})

	it("returns an array of 5 elements ", () => {
		const randomHand = getRandomHand()
		expect(randomHand).toHaveLength(5)
	
	})

	it("all elements of the returned array are a valid cards", () => {
		const randomHand = getRandomHand()
		for(let i = 0; i <= 4; i++){
			expect(validateFormat(randomHand[i])).toBe(true)
		}	
	})

	it("all cards of the hand must be different", () => {		
		for(let i = 0; i <= 20; i++){
			const randomHand = getRandomHand()
			expect(allCardsAreDifferent(randomHand)).toBe(true)
		}	
	
	})


})


describe('function getRandomCard', () => {

  it("returns a string ", () => {
		const randomCard = getRandomCard()
		expect(typeof(randomCard)).toBe("string")
	
	})

	it("return a string with the correct format ex: 'Q-H, 10-D, A-S, 4-C' ", () => {
		for(let i = 0; i <= 20; i++){
			const randomCard = getRandomCard()
			expect(validateFormat(randomCard)).toBe(true)
		}	
	})


})


describe('function numberToStr', () => {

  it(" doesnt accept non-numbers ", () => {
		expect(numberToStr(false)).toBe(undefined)
		expect(numberToStr("A")).toBe(undefined)
		expect(numberToStr("10")).toBe(undefined)
		expect(numberToStr([2])).toBe(undefined)
		expect(numberToStr({s:2})).toBe(undefined)	
	})

	it(" only  accepts integer numbers ", () => {
	 	expect(numberToStr(Math.sqrt(2))).toBe(undefined)
		expect(numberToStr(Math.sin(Math.PI/5))).toBe(undefined)
    expect(numberToStr(5.65)).toBe(undefined)
		expect(numberToStr(Infinity)).toBe(undefined)
	})

	it("   doesnt accept out of range numbers [1-13] ", () => {
	 	expect(numberToStr(0)).toBe(undefined)
		expect(numberToStr(-1)).toBe(undefined)
    expect(numberToStr(15)).toBe(undefined)
		expect(numberToStr(Infinity)).toBe(undefined)
	})

	it(" if number is between 2 and 10 it return the same number as string ", () => {
	 	expect(numberToStr(2)).toBe("2")
		expect(numberToStr(10)).toBe("10")
    expect(numberToStr(5)).toBe("5")
		expect(numberToStr(7)).toBe("7")
	})

	it(" if number is 1, 11 ,12 or 13 it return the correct letter ", () => {
	 	expect(numberToStr(1)).toBe("A")
		expect(numberToStr(11)).toBe("J")
    expect(numberToStr(12)).toBe("Q")
		expect(numberToStr(13)).toBe("K")
	})

})

describe('function getRandomSuit', () => {

  it(" return a correct suit letter(H, C, D, S) ", () => {
		const suits = ["H", "S", "D", "C"]
		for(let i = 0; i <= 20; i++){
				const randomSuit = getRandomSuit()
				expect(suits.includes(randomSuit)).toBe(true)
			}		
		})
})

describe('function validateFormat', () => {

  it(" return false for incorrect format ", () => {
		expect(validateFormat("AA-H")).toBe(false)
		expect(validateFormat("1-H")).toBe(false)
		expect(validateFormat("14-D")).toBe(false)
		expect(validateFormat("2-HS")).toBe(false)
		expect(validateFormat("-")).toBe(false)
		expect(validateFormat("7--H")).toBe(false)
	})

	it(" return true for correct format ", () => {
		expect(validateFormat("3-H")).toBe(true)
		expect(validateFormat("A-C")).toBe(true)
		expect(validateFormat("10-D")).toBe(true)

	})
})

describe('function allCardsAreDifferent', () => {

  it(" returns true if cards are different ", () => {
		expect(allCardsAreDifferent(["A-H", "10-D", "5-C", "K-D", "Q-S"])).toBe(true)
			
	})

  it(" returns false if cards are repeated ", () => {
		expect(allCardsAreDifferent(["A-H", "7-H", "5-C", "5-C", "Q-S"])).toBe(false)
		expect(allCardsAreDifferent(["A-H", "A-H", "5-C", "K-D", "Q-S"])).toBe(false)
			
	})
})

describe('function unique', () => {

  it(" return true if card is unique in an array", () => {
		const arr = ["A-H", "7-H", "5-C", "9-C", "Q-S"]
		for(let i = 0; i < 5; i++){
				expect(unique(arr[i], i, arr)).toBe(true)
		}		
	})
	
	it(" return false if card is repeated  in an array", () => {
		const arr = ["A-H", "A-H", "5-C", "5-C", "Q-S"]
		expect(unique(arr[1], 1, arr)).toBe(false)
	})
})


describe('function generateDeck', () => {

  it("returns an array of 52 elements ", () => {
		const deck = generateDeck()
		expect(deck).toHaveLength(52)
	
	})

  it("all elements of the returned array are a valid cards", () => {
		const deck = generateDeck()
		for(let i = 0; i < 52; i++){
			expect(validateFormat(deck[i])).toBe(true)
		}	
	})

	it("all cards of the hand must be different", () => {		
		const deck = generateDeck()
		expect(allCardsAreDifferent(deck)).toBe(true)
	
	})


})