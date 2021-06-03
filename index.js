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



module.exports = {getHandFromCards, identifyCard}