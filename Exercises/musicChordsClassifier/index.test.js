'use strict'
const assert = require('assert').strict
const classify = require('./index').classify
const train = require('./index').train
const addElementsToArrayAsSingleArray = require('./index').addElementsToArrayAsSingleArray
const updateChordsList = require('./index').updateChordsList
const countPropertyInObject = require('./index').countPropertyInObject

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