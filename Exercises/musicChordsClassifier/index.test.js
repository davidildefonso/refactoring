'use strict'
const assert = require('assert').strict
const classify = require('./index').classify
const train = require('./index').train
const addElementsToArrayAsSingleArray = require('./index').addElementsToArrayAsSingleArray
const updateChordsList = require('./index').updateChordsList
const countPropertyInObject = require('./index').countPropertyInObject
const setLabelProbabilities = require('./index').setLabelProbabilities
const isObjectNotArray = require('./index').isObjectNotArray
const setChordCountsInLabels = require('./index').setChordCountsInLabels
const setProbabilityOfChordsInLabels = require('./index').setProbabilityOfChordsInLabels
const getDifficultyAndScore = require('./index').getDifficultyAndScore



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



describe('function addElementsToArrayAsSingleArray ', () => {

  it("only accepts arrays as 1st parameter", () => {
		expect(addElementsToArrayAsSingleArray(["a", "b", "c", "d"], 2)).toBeDefined()
		expect(() => { addElementsToArrayAsSingleArray(1, 2) } ).toThrow(" 1st argument is not an array")
		expect(() => addElementsToArrayAsSingleArray("sd-123", 2)).toThrowError("error 1st argument is not an array")
		expect(() => addElementsToArrayAsSingleArray({1:1, 2: 2}, 2)).toThrowError("error 1st argument is not an array")
		expect(() => addElementsToArrayAsSingleArray(false, 2)).toThrowError("error 1st argument is not an array")
		expect(() => addElementsToArrayAsSingleArray(null)).toThrowError("error 1st argument is not an array")
		expect(() => addElementsToArrayAsSingleArray(undefined)).toThrowError("error 1st argument is not an array")
		expect(() => addElementsToArrayAsSingleArray("")).toThrowError("error 1st argument is not an array")
		expect(() => addElementsToArrayAsSingleArray(0)).toThrowError("error 1st argument is not an array")
		expect(() => addElementsToArrayAsSingleArray(1.23)).toThrowError("error 1st argument is not an array")
		expect(() => addElementsToArrayAsSingleArray(NaN)).toThrowError("error 1st argument is not an array")
	
	})

	it("it adds the other paramenters to the array as a single array ", () => {
		expect(addElementsToArrayAsSingleArray([], 2, 5)).toStrictEqual([[2, 5]])
		expect(addElementsToArrayAsSingleArray(["a", "b", "c", "d"], 2)).toStrictEqual(["a", "b", "c", "d", [2]])
		expect(addElementsToArrayAsSingleArray(["a", "b", "c", "d"], 2, 4, 3, 5 ,6)).toStrictEqual(["a", "b", "c", "d", [2, 4, 3, 5, 6]])
		expect(addElementsToArrayAsSingleArray(["a", "b", "c", "d"], [1 ,2 , 3])).toStrictEqual(["a", "b", "c", "d", [[1, 2, 3]]])
		expect(addElementsToArrayAsSingleArray(["a", "b", "c", "d"], "string", "also")).toStrictEqual(["a", "b", "c", "d", ["string", "also"]])
		expect(addElementsToArrayAsSingleArray(["a", "b", "c", "d"], [])).toStrictEqual(["a", "b", "c", "d", [[]]])
	})




})

describe("function updateChordList: ", () => {
  it("only accepts arrays as  parameters", () => {
		expect(updateChordsList(["a", "b", "c", "d"], [2])).toBeDefined()
		expect(updateChordsList([], [2])).toBeDefined()
		expect(updateChordsList([], [])).toBeDefined()
		expect(updateChordsList([2], [])).toBeDefined()
		expect(updateChordsList([[2, 3]], [2, 6 , 7])).toBeDefined()
		expect(() => { updateChordsList(1, 2) } ).toThrow("error arguments must be arrays")
		expect(() => updateChordsList("sd-123", 2)).toThrowError("error arguments must be arrays")
		expect(() => updateChordsList({1:1, 2: 2}, 2)).toThrowError("error arguments must be arrays")
		expect(() => updateChordsList(false, [2])).toThrowError("error arguments must be arrays")
		expect(() => updateChordsList([2, 3], null)).toThrowError("error arguments must be arrays")
		expect(() => updateChordsList([undefined], 3)).toThrowError("error arguments must be arrays")
		expect(() => updateChordsList("", ["sda"])).toThrowError("error arguments must be arrays")
		expect(() => updateChordsList(0, 0)).toThrowError("error arguments must be arrays")
		expect(() => updateChordsList(1.23, [1.3])).toThrowError("error arguments must be arrays")
		expect(() => updateChordsList(NaN, [NaN])).toThrowError("error arguments must be arrays")
	
	})

})

describe("function countPropertyInObject", () => {
	it("first argument must be an object (not array)", () => {
		expect(countPropertyInObject({}, [2])).toBeDefined()
		expect(countPropertyInObject({}, {})).toBeDefined()
		expect(countPropertyInObject([], {})).not.toBeDefined()
		expect(countPropertyInObject(2, {})).not.toBeDefined()
		expect(countPropertyInObject(false, 1)).not.toBeDefined()
		expect(countPropertyInObject("string", 2)).not.toBeDefined()
		expect(countPropertyInObject(1.54, "sd")).not.toBeDefined()
	})
})


describe("function setLabelProbabilities", () => {
	it("receives 1 objects not an arrays as argument", () => {
		expect(setLabelProbabilities({})).toBeDefined()
		expect(setLabelProbabilities({1: 2, 2:2})).toBeDefined()
		expect(setLabelProbabilities([])).not.toBeDefined()
		expect(setLabelProbabilities(2)).not.toBeDefined()
		expect(setLabelProbabilities(false)).not.toBeDefined()
		expect(setLabelProbabilities("string")).not.toBeDefined()
		expect(setLabelProbabilities(1.54)).not.toBeDefined()
	})

	it("returns an object not an array", () => {
		const response1 = setLabelProbabilities({"easy": 14, "medium": 34, "hard": 2})
		expect(isObjectNotArray(response1)).toBe(true)
	
	})

	it("returning object only has 3 properties 'easy, medium, hard'", () => {
		const properties = "easymediumhard"
		const response1 = setLabelProbabilities({"easy": 14, "medium": 34, "hard": 2})
		expect(Object.keys(response1).join("")).toBe(properties)
	})

	it("returning object values are numbers '", () => {
		const response1 = setLabelProbabilities({"easy": 14, "medium": 34, "hard": 2})
		expect(Object.values(response1).some(elem => typeof(elem) !== "number" )).toBe(false)
	})
})

describe("function isObjectNotArray", () => {
	it("if argument is object but not an array returns true", () => {
		
		expect(isObjectNotArray({"sd": "sd"})).toBe(true)
		expect(isObjectNotArray({})).toBe(true)
		expect(isObjectNotArray({"false": "false"})).toBe(true)
		expect(isObjectNotArray({"sd": ""})).toBe(true)
		expect(isObjectNotArray({ 1: 1.464})).toBe(true)
	})

	it("returns false for any other argument", () => {
		expect(isObjectNotArray("")).toBe(false)
		expect(isObjectNotArray([])).toBe(false)
		expect(isObjectNotArray(false)).toBe(false)
		expect(isObjectNotArray()).toBe(false)
		expect(isObjectNotArray(1.45)).toBe(false)
		expect(isObjectNotArray([1, 3 ,4 ,5 ,6])).toBe(false)
		expect(isObjectNotArray(["asda", "sd", 1.23 ])).toBe(false)
	})
})


describe("function setChordCountsInLabels", () => {

	let data

	beforeEach(() => {
		data  = [
      [ 'easy', [ 'c', 'cmaj7', 'f', 'am', 'dm', 'g', 'e7' ] ],
      [ 'easy', [ 'c', 'em', 'f', 'g', 'am' ] ],
      [ 'easy', [ 'c', 'g', 'f' ] ],
      [ 'medium', [ 'cm', 'g', 'bb', 'eb', 'fm', 'ab' ] ],
      [ 'medium', [ 'g', 'gsus4', 'b', 'bsus4', 'c', 'cmsus4', 'cm6' ] ],
      ['hard', ['bm7', 'e',  'c', 'g',   'b7', 'f', 'em',  'a',  'cmaj7','em7', 'a7', 'f7', 'b' ]      ]
		]

		
	})

	it("only accepts an array as argument", () => {
		
		expect(setChordCountsInLabels([])).toBeDefined()
		expect(setChordCountsInLabels({"false": "false"})).not.toBeDefined()
		expect(setChordCountsInLabels("ssdsd")).not.toBeDefined()
		expect(setChordCountsInLabels( 1.464)).not.toBeDefined()
	})

	it("returns an object", () => {

		expect(isObjectNotArray(setChordCountsInLabels([]))).toBe(true)
		expect(isObjectNotArray(setChordCountsInLabels(data))).toBe(true)
	})

	it("returning object only has 3 properties 'easy, medium, hard'", () => {
		const properties = "easymediumhard"
		const response1 = setChordCountsInLabels(data)
		expect(Object.keys(response1).join("")).toBe(properties)
	})

	it("returning object values are objects '", () => {
		const response1 = setChordCountsInLabels(data)
		expect(Object.values(response1).some(elem => !isObjectNotArray(elem) )).toBe(false)
	})

	it("each returning object value has properties type string'", () => {
		const response1 = setChordCountsInLabels(data)
		const values = Object.values(response1)
		expect(  Object.keys(values).some(elem => typeof(elem) !== "string" )).toBe(false)
	})

	it("each returning object value has keys of type integer (min 1)'", () => {
		const response1 = setChordCountsInLabels(data)
		const values = Object.values(response1)
		expect(Object.keys(values).some(elem => 
			Number.isInteger(elem) && elem >= 1 )).toBe(false)
	})
})



describe("function setProbabilityOfChordsInLabels", () => {

	let data
	let songsLenght = 10

	beforeEach(() => {
		data  = {
      "easy": { "c": 3, "cmaj7": 1, "f": 3, "am": 2, "dm": 1, "g": 3, "e7": 1, "em": 1 },
      "medium": {
        "f": 1,
        "dm": 1,
        "bb": 2,
        "c": 2,
        "a": 1,
        "bbm": 2,
        "cm": 1,
        "g": 2,
        "eb": 1,
        "fm": 1,
        "ab": 2,
        "gsus4": 1,
        "b": 1,
        "bsus4": 1,
        "cmsus4": 1,
        "cm6": 1,
        "ebm7": 1,
        "dbadd9": 1,
        "fm7": 1,
        "abmaj7": 1,
        "ebm": 1
      },
      "hard": {
        "bm7": 1,
        "e": 1,
        "c": 1,
        "g": 2,
        "b7": 1,
        "f": 1,
        "em": 1,
        "a": 1,
        "cmaj7": 1,
        "em7": 1,
        "a7": 1,
        "f7": 1,
        "b": 2,
        "cm": 1,
        "eb": 1,
        "cdim": 1,
        "eb7": 1,
        "d7": 1,
        "db7": 1,
        "ab": 1,
        "gmaj7": 1,
        "g7": 1,
        'd#m': 1,
        'g#': 1,
        'f#': 1,
        'g#m': 1,
        'c#': 1
      }
    }

		
	})

	it("returns and object showing the correct probability of each chord in label", () => {
		const result = setProbabilityOfChordsInLabels(data, songsLenght)
		expect(result["easy"]["c"]).toBe(3/10)
	
	})

})




describe("function getDifficultyAndScore", () => {

	let data


	beforeEach(() => {
		data  =    {
      'easy': 1.31 ,
      'medium': 1.7061000000000002 ,
      'hard': 1.4541000000000002 
		}

		
	})

	it("returns an array of the difficulty which has the max score of the data array", () => {
		const result = getDifficultyAndScore(data)
		expect(result[0]).toBe("medium")
		expect(result[1]).toEqual(1.7061000000000002)
	
	})

})