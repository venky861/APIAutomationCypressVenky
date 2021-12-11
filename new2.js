// function selfServiceElasticSearchQuery(){
// 	let date = new Date();
// 	let currentYear = new Date().toJSON().slice(0,10);
// 	let previousYear = (`${(date.getFullYear() - 1)}/${date.getMonth() + 1}/${date.getDate()}`).replace(/[/]/g,'-')
// 	previousYear = '2021-01-5'
// 	if(previousYear.split('-')[2].length == 1){
// 		previousYearArr = previousYear.split('-')
// 		previousYear = previousYearArr[0] + '-' + previousYearArr[1] + '-' + `0${previousYearArr[2]}`
// 	}
// 	const context = {
// 		from_date: currentYear,
// 		to_date: previousYear,
// 	}
// 	console.log(context.from_date)
// 	console.log(context.to_date)
// }

// selfServiceElasticSearchQuery()
var fs = require ('fs')

fs.readFile('./Self_ServiceFile_Inventory.csv',(err,data)=>{
	console.log(data)
})