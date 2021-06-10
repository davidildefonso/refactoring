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
let labelProbabilities = [] 
let chordCountsInLabels = {} 
let probabilityOfChordsInLabels = {} 


const addElementsToArrayAsSingleArray = (arr, ...params) => {
	if(Array.isArray(arr)){
		return	arr.concat([[...params]])
	}else{
		throw "error 1st argument is not an array"
	}
} 

	

const updateChordsList = (list, chords) => {
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


function train(chords, difficulty){
		songs = addElementsToArrayAsSingleArray(songs, difficulty, chords)
  	allChords = updateChordsList(allChords, chords)
		difficultyCounts = countPropertyInObject(difficultyCounts, difficulty)		
} 


const countPropertyInObject = (obj, element) => {
	if(!Array.isArray(obj) && typeof(obj) === "object"){
		if((Object.keys(obj).includes(element))){
			obj[element]++ 
		} else {
			obj[element] = 1 
		}
		return obj	
	}

}

function setLabelProbabilities(){
	Object.keys(difficultyCounts).forEach(function(label){
		labelProbabilities[label] = difficultyCounts[label] / songs.length 
	}) 
} 

function setChordCountsInLabels(){
	songs.forEach(song => {
		if(!chordCountsInLabels[song[0]]){
			chordCountsInLabels[song[0]] = {} 
		}
		song[1].forEach(chord => {
			if(chordCountsInLabels[song[0]][chord] > 0){
				chordCountsInLabels[song[0]][chord]++ 
			} else {
				chordCountsInLabels[song[0]][chord] = 1 
			}
		}) 
	}) 
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

setLabelProbabilities() 
setChordCountsInLabels() 
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


classify(['d', 'g', 'e', 'dm']) 
classify(['f#m7', 'a', 'dadd9', 'dmaj7', 'bm', 'bm7', 'd', 'f#m']) 


module.exports = {
	classify, train, addElementsToArrayAsSingleArray, updateChordsList, countPropertyInObject
}