'use strict'

const getRandomHand = () => {
	let result = []
	while(result.length < 5){
		result.push(getRandomCard())
		result = result.filter(unique)
	}
	return result
}

const getRandomCard = () => {
	let result = ""
	const randomNumber = Math.floor(Math.random()*13 + 1)
	result += numberToStr(randomNumber)
	const randomSuit = getRandomSuit()
	result += "-" + randomSuit
	return result
}

const getRandomSuit = () => {
	const suits = ["C", "H", "D", "S"]
	return suits[Math.floor(Math.random()*suits.length)]
}

const numberToStr = (num) => {
	if(typeof(num) === "number" && Number.isInteger(num) 
	&& num >=1 && num <= 13){
		if(num === 1) return 'A'
		if(num === 11) return 'J'
		if(num === 13) return 'K'
		if(num === 12) return 'Q'
		return num.toString()
	}
}

const validateFormat = (str) => {
	const regex = /^([AJQK]|10|[2-9])-[CHDS]$/
	return regex.test(str)
}

const allCardsAreDifferent = (arrOfCards) => {	
	if(arrOfCards.filter(unique).length === arrOfCards.length) {
		return true
	}
	return false
}

const unique = (value, index, self) => {
  return self.indexOf(value) === index
}

module.exports = {
	getRandomHand,
	getRandomCard,
	getRandomSuit,
	numberToStr,
	validateFormat,
	allCardsAreDifferent,
	unique
}