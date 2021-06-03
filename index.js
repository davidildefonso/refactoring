const getHandFromCards = (arr) => {
	if(Array.isArray(arr) && arr.length === 5){
		if(!arr.some(elem => 
			!(typeof(elem) === "string"
				&& /^([AJQK]|[2-9]|10)-[CSDH]$/.test(elem) ))){
					if(arr.filter(unique).length === arr.length){
						return true
					}
				}
	}

}

const unique = (value, index, self) => {
  return self.indexOf(value) === index
}

// const ages = [26, 27, 26, 26, 28, 28, 29, 29, 30]
// const uniqueAges = ages.filter(unique)
//console.log(uniqueAges)

const identifyCard = () => {

}

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
	const cardsValues = arrOfCards.map(card => {
		const cardStringValue = card.match(/.*(?=-)/)[0]
		if(cardStringValue === "K") return 13
		if(cardStringValue === "Q") return 12
		if(cardStringValue === "J") return 11
		if(cardStringValue === "A") return "A"
		return Number(cardStringValue)
	})
//	console.log(cardsValues)
	if(cardsValues.includes("A")){
	
	}else{
		const sortedCardsValues = cardsValues.sort((a,b) => b - a)
		console.log(sortedCardsValues)
		const sum = sortedCardsValues.reduce((acum, value) => acum + value, 0)
	
		const sumOfConsecutiveNumbersFromMinToMaxValuesOfSortedArr = (arr) =>
			((arr[arr.length - 1] + arr[0])*( -arr[arr.length - 1] + arr[0] + 1))/2

			console.log(sumOfConsecutiveNumbersFromMinToMaxValuesOfSortedArr(sortedCardsValues) === sum)
		if(sum === sumOfConsecutiveNumbersFromMinToMaxValuesOfSortedArr(sortedCardsValues)){
			return true
		}
		
		return false 
	}


}








module.exports = {getHandFromCards, allCardsHaveDifferentValue, allCardsHaveSameSuit,
	cardsHaveConsecutiveValues
}