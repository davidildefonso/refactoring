imagine = ['c', 'cmaj7', 'f', 'am', 'dm', 'g', 'e7'] 
somewhere_over_the_rainbow = ['c', 'em', 'f', 'g', 'am'] 
tooManyCooks = ['c', 'g', 'f'] 
iWillFollowYouIntoTheDark = ['f', 'dm', 'bb', 'c', 'a', 'bbm'] 
babyOneMoreTime = ['cm', 'g', 'bb', 'eb', 'fm', 'ab'] 
creep = ['g', 'gsus4', 'b', 'bsus4', 'c', 'cmsus4', 'cm6'] 
army = ['ab', 'ebm7', 'dbadd9', 'fm7', 'bbm', 'abmaj7', 'ebm'] 
paperBag = ['bm7', 'e', 'c', 'g', 'b7', 'f', 'em', 'a', 'cmaj7',
 'em7', 'a7', 'f7', 'b'] 
toxic = ['cm', 'eb', 'g', 'cdim', 'eb7', 'd7', 'db7', 'ab', 'gmaj7',
 'g7'] 
bulletproof = ['d#m', 'g#', 'b', 'f#', 'g#m', 'c#'] 
song_11 = [] 

let songs = []
let allChords = [] 
let difficultyCounts = {}
let labelProbabilities = {} 
let chordCountsInLabels = {} 
let probabilityOfChordsInLabels = {} 


const  train = (chords, difficulty) => {
		songs = addElementsToArrayAsSingleArray(songs, difficulty, chords)
  	allChords = updateChordsList(allChords, chords)
		difficultyCounts = countPropertyInObject(difficultyCounts, difficulty)		
} 




const  setLabelProbabilities = (difficultyCountsList ) => {
	if(isObjectNotArray(difficultyCountsList)){
		let result = {} 
		Object.keys(difficultyCountsList).forEach(difficulty => {
			result[difficulty] = difficultyCountsList[difficulty] / songs.length 
		}) 
		return result
	}
} 


const isObjectNotArray = (obj) => {
	if(!Array.isArray(obj) && typeof(obj) === "object") return true
	return false
}
	


function setChordCountsInLabels(songsArr){
console.log(songs)
	let result = {} 
	songsArr.forEach(([difficulty, chords]) => {
		if(!result[difficulty]){
			result[difficulty] = {} 
		}
		chords.forEach(chord => {
			if(result[difficulty][chord] > 0){
				result[difficulty][chord]++ 
			} else {
				result[difficulty][chord] = 1 
			}
		}) 
	})
	return result 
}

function setProbabilityOfChordsInLabels(){
	probabilityOfChordsInLabels = chordCountsInLabels 
	Object.keys(probabilityOfChordsInLabels).forEach(difficulty =>  {
		Object.keys(probabilityOfChordsInLabels[difficulty]).forEach(chord => {
			probabilityOfChordsInLabels[difficulty][chord] /= songs.length 
		}) 
	}) 
}

train(imagine, 'easy') 
train(somewhere_over_the_rainbow, 'easy') 
train(tooManyCooks, 'easy') 
train(iWillFollowYouIntoTheDark, 'medium') 
train(babyOneMoreTime, 'medium') 
train(creep, 'medium') 
train(army, "medium")
train(paperBag, 'hard') 
train(toxic, 'hard') 
train(bulletproof, 'hard') 

labelProbabilities = setLabelProbabilities(difficultyCounts) 

chordCountsInLabels = setChordCountsInLabels(songs) 
console.log(chordCountsInLabels)

setProbabilityOfChordsInLabels() 

function classify(chords){
	if(Array.isArray(chords) && 
			!chords.some(chord => typeof(chord) !== 'string')){
		let classified = {} 
		Object.keys(labelProbabilities).forEach(difficulty => {
			let first = labelProbabilities[difficulty] + 1.01 
			chords.forEach(chord => {
				const probabilityOfChordInLabel =
					probabilityOfChordsInLabels[difficulty][chord] 
				if(!probabilityOfChordInLabel){
					first + 1.01 
				} else {
					first = first * (probabilityOfChordInLabel + 1.01) 
				}
			}) 
			classified[difficulty] = first 
		}) 
		const [difficulty, score] =  getDifficultyAndScore(classified) 
		return `difficulty: ${difficulty} score: ${score}`	
	}
	return 'chords format is invalid'
} 

const getDifficultyAndScore = (obj) => {
	const result = Object.entries(obj)
		.reduce((acum, [difficulty, value]) => {
			if(value > acum){
				acum = [difficulty, value]
			}
			return acum
		}, 0)
	return result 
}


console.log(classify(['d', 'g', 'e', 'dm']) )
console.log(classify(['f#m7', 'a', 'dadd9', 'dmaj7', 'bm', 'bm7', 'd', 'f#m']) )


function addElementsToArrayAsSingleArray(arr, ...params){
	if(Array.isArray(arr)){
		return	arr.concat([[...params]])
	}else{
		throw "error 1st argument is not an array"
	}
} 

	

function updateChordsList(list, chords){
	if(!Array.isArray(list) || !Array.isArray(chords)){
		throw "error arguments must be arrays"
	}
	chords.forEach(chord => {
		if(!list.includes(chord)){
			list.push(chord)
		}	
	})
	return list
}

function countPropertyInObject(obj, element){
	if(!Array.isArray(obj) && typeof(obj) === "object"){
		if((Object.keys(obj).includes(element))){
			obj[element]++ 
		} else {
			obj[element] = 1 
		}
		return obj	
	}

}



module.exports = {
	classify, train, addElementsToArrayAsSingleArray, updateChordsList, countPropertyInObject,
	setLabelProbabilities, isObjectNotArray, setChordCountsInLabels
}