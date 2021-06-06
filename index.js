'use strict'

const getHandFromCards = (cardsArr) => {				
	if(cardsAreValid(cardsArr)){
		if(cardsAreUniqueAndHaveSameSuit(cardsArr)){
				if(cardsHaveConsecutiveValues(cardsArr)){
					const sortedCardsValues = getSortedNumericCardValues(cardsArr)
					if(sortedCardsValues[0] === 14) return 'Royal Flush'
					return 'Straight Flush'
				}
				return 'Flush'				
		}
		if(allCardsHaveDifferentValue(cardsArr)){
			if(cardsHaveConsecutiveValues(cardsArr)){
				return 'Straight'
			}
			return 'High Card'
		}

		if(cardsHaveGivenRepeatedValuesCount(cardsArr,4)){
			return 'Four of a kind'
		}

		if(cardsHaveGivenRepeatedValuesCount(cardsArr,3)){
			if(cardsHaveGivenRepeatedValuesCount(cardsArr,3,2)){
				return "Full House"
			}
			return "Three of a kind"
		}

		if(cardsHaveGivenRepeatedValuesCount(cardsArr,2)){
			if(cardsHaveGivenRepeatedValuesCount(cardsArr,2,2)){
				return "Two Pairs"
			}
			return "One Pair"
		}		 
	}
}


const cardsAreValid = (arr) => {
	if(Array.isArray(arr) && arr.length === 5){
		if(!arr.some(elem => 
			!(typeof(elem) === "string"
				&& /^([AJQK]|[2-9]|10)-[CSDH]$/.test(elem) ))){
					if(arr.filter(unique).length === arr.length){
						return true
					}
					return false
		}return false
	}
	return false
}

const cardsAreUniqueAndHaveSameSuit = (arr) => 
	allCardsHaveDifferentValue(arr) && allCardsHaveSameSuit(arr)

const allCardsHaveDifferentValue = (arrOfCards) => {
	const cardsValues = arrOfCards.map(card => card.match(/.*(?=-)/)[0])
	if(cardsValues.filter(unique).length === cardsValues.length) {
		return true
	}
	return false
}

const allCardsHaveSameSuit = (arrOfCards) => {
	const cardsSuits = arrOfCards.map(card => card.substr(-1,1))
	if(cardsSuits.filter(unique).length === 1) return true
	return false
}



const cardsHaveConsecutiveValues = (arrOfCards) => {
	const sortedCardsValues = getSortedNumericCardValues(arrOfCards)
	if(sortedCardsValues) return checkIfCardsAreConsecutive(sortedCardsValues)
	return false // [checkIfCardsAreConsecutive(sortedCardsValues), sortedCardsValues]
}


const getSortedNumericCardValues = (arrOfCards) => {
	const cardsValues = getCardsValuesAsIntExceptIfValueIsA(arrOfCards)
	return sortCards(cardsValues)	
}


const cardsHaveGivenRepeatedValuesCount = (arr, n, m = 0) => {
	const valuesArr = convertCardsFromStringToNumbers(arr)
	const uniqueValues = uniqueValuesCounter(valuesArr)	

	if(m === 0)	return uniqueValues.some(elem => elem === n)
	
	const hasNEqualValues = uniqueValues.some(elem => elem === n)
	
	if(hasNEqualValues){		
		uniqueValues.splice(uniqueValues.indexOf(n), 1)			
		const hasAnotherMEqualValues = uniqueValues.some(elem => elem === m)
		if(hasAnotherMEqualValues) {
			return true
		}
		return false
	}

	return false	
}



const convertCardsFromStringToNumbers = (arrOfCards) => {
	const cardsValues = getCardsValuesAsIntExceptIfValueIsA(arrOfCards)
	return cardsValues
}



const checkIfCardsAreConsecutive = (arr) => {
	const sum = arr.reduce((acum, value) => acum + value, 0)
	if(sum === sumOfConsecutiveNumbersFromMinToMaxValuesOfSortedArr(arr)){
		return true
	}	
	return false 
}


const getCardsValuesAsIntExceptIfValueIsA = (arr) => {
	return  arr.map(card => {
		const cardStringValue = card.match(/.*(?=-)/)[0]
		if(cardStringValue === "K") return 13
		if(cardStringValue === "Q") return 12
		if(cardStringValue === "J") return 11
		if(cardStringValue === "A") return "A"
		return Number(cardStringValue)
	})
}

const sortCards = (arr) => {
	let sortedCardsValues = arr.sort((a,b) => b - a)
	if(sortedCardsValues.includes("A")){
		let cardsValuesWithoutA = sortedCardsValues.filter(elem => elem !== "A")
		cardsValuesWithoutA = cardsValuesWithoutA.sort((a,b) => b - a)
		if(cardsValuesWithoutA[0] === 13) {
			cardsValuesWithoutA.unshift(14)
		}else if(cardsValuesWithoutA[cardsValuesWithoutA.length - 1] === 2){
			cardsValuesWithoutA.push(1)
		}else{
			return false
		}
		sortedCardsValues = cardsValuesWithoutA
	}
	return sortedCardsValues
}



const uniqueValuesCounter = (arr) => {
	const uniqueValuesObj = arr.reduce((acum, value) => {
		if(acum.hasOwnProperty(value)) acum[value]++
		else  acum[value] = 1
		return acum
	},{})
	return Object.values(uniqueValuesObj)
}
	

const unique = (value, index, self) => {
  return self.indexOf(value) === index
}



const sumOfConsecutiveNumbersFromMinToMaxValuesOfSortedArr = (arr) =>
		((arr[arr.length - 1] + arr[0])*( -arr[arr.length - 1] + arr[0] + 1))/2


module.exports = {getHandFromCards, allCardsHaveDifferentValue, allCardsHaveSameSuit,
	cardsHaveConsecutiveValues, cardsAreValid
}