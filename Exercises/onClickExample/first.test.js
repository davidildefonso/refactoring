/**
 * @jest-environment jsdom
 */


'use strict'
require('@testing-library/jest-dom')
const sum = require('./first').sum;

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});




test('waits 1 second before ending the game', () => {
  jest.useFakeTimers();
 	const timerGame = require('./first').timerGame;
  const callback = jest.fn();

  timerGame(callback);

  // At this point in time, the callback should not have been called yet
  expect(callback).not.toBeCalled();

  // Fast-forward until all timers have been executed
  jest.advanceTimersByTime(1000);

  // Now our callback should have been called!
  expect(callback).toBeCalled();
  expect(callback).toHaveBeenCalledTimes(1);

	 jest.clearAllTimers()
});


describe("function showGreetingFirstAndNameAfterOneSecond: ", () => {
	test("calls callback function after one second ", () => {
		jest.useFakeTimers();
		const showGreetingFirstAndNameAfterOneSecond = require('./first').showGreetingFirstAndNameAfterOneSecond
		const callback = jest.fn();
		showGreetingFirstAndNameAfterOneSecond(callback)
		expect(callback).not.toBeCalled()
		jest.advanceTimersByTime(1000)
		expect(callback).toBeCalled()
		expect(callback).toHaveBeenCalledTimes(1)
	})



})

describe("program changeButtonLabelAndConsoleLogGreeting: ", () => {
	beforeEach(() => {
		document.body.innerHTML =
		'<div>' +
		'  <span id="username" />' +
		'  <input type="button" value="show greeting" ></input>' +
		'</div>'
	})

			
	test("on window load it renders label 'show greeting'", () => {	
		const button = document.querySelector('input')
		expect(button).toHaveValue('show greeting');
	})

	test("on button click, onclick function is called", () => {		
		const button = document.querySelector('input')
		const handleClick = jest.fn();
		button.addEventListener("click", handleClick)
		button.click()
		expect(handleClick).toBeCalled()
		expect(handleClick).toHaveBeenCalledTimes(1)
		//expect(button).toHaveValue('stop')
	})

	test("on button click it value is 'stop'", () => {		
		const button = document.querySelector('input')
		const changeValue = require('./first').changeValue
	//	const changeTextAfterOneSecond =  require('./first').changeTextAfterOneSecond
		button.addEventListener("click", changeValue)
		button.click()
		expect(button).toHaveValue('stop')
	})

	test("on button click span text  is 'Hello World I'm '", () => {
			
		const button = document.querySelector('input')
		const changeValue = require('./first').changeValue		
		const span = document.querySelector('span')
		button.addEventListener("click", changeValue)
		button.click()
		expect(span).toHaveTextContent("Hello World I'm")
	})

	test("after click button's value change to 'stop' after one second", () => {		
		jest.useFakeTimers();
		const button = document.querySelector('input')
		const span = document.querySelector('span')
		const changeValue = require('./first').changeValue		
		button.addEventListener("click", changeValue)
		button.click()		
		jest.advanceTimersByTime(1000)
		expect(button).toHaveValue('show greeting')
		expect(span).toHaveTextContent("David")
		jest.clearAllTimers()
	})


})


test('use jsdom in this test file', () => {
  const element = document.createElement('div');
  expect(element).not.toBeNull();
});
