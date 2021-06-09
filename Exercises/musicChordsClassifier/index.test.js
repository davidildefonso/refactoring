'use strict'
const assert = require('assert').strict
const classify = require('./index').classify
const train = require('./index').train


describe('function classify ', () => {

  it("returns the given chords difficulty 'easy, medium, hard' ", () => {
		const chords = ["a", "b", "c", "d"]
		expect(classify(chords)).toBeDefined
		expect(classify(chords)).toMatch(/(easy|medium|hard)/)
	
	})

	it("only accepts an array of strings as a parameter ", () => {
		expect(classify(false)).toBe("chords format is invalid")
				expect(classify(null)).toBe("chords format is invalid")
				expect(classify(undefined)).toBe("chords format is invalid")
				expect(classify("")).toBe("chords format is invalid")
				expect(classify(0)).toBe("chords format is invalid")
				expect(classify(123)).toBe("chords format is invalid")
				expect(classify(NaN)).toBe("chords format is invalid")
				expect(classify([false, 2, 4,5 ,6])).toBe("chords format is invalid")
				expect(classify({a: 2, b: 2})).toBe("chords format is invalid")
				expect(classify([1.0, 2.0])).toBe("chords format is invalid")
		})

	it("returns the same response for the same chords", () => {
		const difficulty = classify(["ab", "#bm", "df", "#cma"])
		for(let i = 0; i <= 20; i++){
			expect(classify(["ab", "#bm", "df", "#cma"])).toBe(difficulty)		
		}	
	})


})



describe('function train ', () => {

  it("returns ''Done' if there are no errors ", () => {
		const chords = ["a", "b", "c", "d"]
		const difficulty = "easy"
		expect(train(chords, difficulty)).toBeDefined()
		expect(train(chords, difficulty)).toBe("Done")
	
	})

	it("returns 'error' if could not complete all functions ", () => {
		const chords = ["a", "b", "c", "d"]
		const difficulty = "stupid"
		expect(train(chords, difficulty)).toBeDefined()
		expect(train(chords, difficulty)).toBe("error")
	})




})