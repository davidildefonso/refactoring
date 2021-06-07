'use strict';

// const delayReturn = () => {
// 	setTimeout(sayHello, 1000)
// }

// const sayHello = () => "Hello world"

// const getIndexPage = (callBack) => {
// //	callBack()
// 	setTimeout(callBack, 1000)
// 	//callBack("Hey")
// }

//getIndexPage(() => console.log("Hello"))


// timerGame.js


const  timerGame = (callback) => {
  console.log('Ready....go!');
  setTimeout(() => {
    console.log("Time's up -- stop!");
    callback && callback();
  }, 1000);
}


function sum(a, b) {
  return a + b;
}

const showGreetingFirstAndNameAfterOneSecond = (callback) => {
	console.log("Hello my name is")
	setTimeout(callback, 1000)
	
}

const returnName = () => {
	console.log('David')
}

const changeTextAfterOneSecond = (input, span) => {
	setTimeout(() => {	
		span.textContent = "David"
		input.value = "show greeting"
	}, 1000);
}

const changeValue = () => {	
	const input = document.querySelector('input')
	const span = document.querySelector('span')
	input.value = "stop"
	span.textContent = "Hello World I'm"
	changeTextAfterOneSecond(input, span)
}

module.exports = {
	sum,
  timerGame,
	showGreetingFirstAndNameAfterOneSecond,
	changeValue,
	changeTextAfterOneSecond
}