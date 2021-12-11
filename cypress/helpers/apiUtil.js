const getData = require('../fixtures/Dashboard/get.json');
const handlebars = require('handlebars');

function getHeaders(){
	return {
		'Content-Type': Cypress.env('contentType'),
		'Username': Cypress.env('username'),
		'Apikey': Cypress.env('apiKey')
	}
}
console.log(getHeaders())


/*
	Below function validates date format in YYYY-MM-DDDD , it returns true if the date format follows this pattern
*/

function isValidDate(dateString) {
	var regEx = /^\d{4}-\d{2}-\d{2}$/;
	if(!dateString.match(regEx)) return false;  // Invalid format
	var d = new Date(dateString);
	var dNum = d.getTime();
	if(!dNum && dNum !== 0) return false; // NaN value, Invalid date
	return d.toISOString().slice(0,10) === dateString;
  }

/* Below function returns a GET URl with required filter vallues */

function getUrlFilters(getApiCall){
	var values =[];
	var i=0;
	for (var key in getApiCall) {
		values[i] = getApiCall[key]
		i++;
	  }	  
	//Replace quotes, comma with slashes for generating parameters
	var filters = JSON.stringify(values);
	filters = filters.replace(/['"]+/g, '');
	filters = filters.replace(/,/g, '/');
	filters= '/' + filters.replace(/[\[\]']+/g,'')
	cy.log(filters);
	return {
		filters
	}
}

/* Below function returns a GET URl with required query parameters and values */
/*Example: searchIncidentTicket?datastage=raw&from_date=2019-01-01&to_date=2020-10-01&toolsource=ACMEICD*/

function getUrlQueryParameters(getApiCall){
	const values =[] , keys =[];
	var querystring = '?';
	var i=0;
	for (var key in getApiCall) {
		values[i] = JSON.stringify(getApiCall[key]).replace(/['"]+/g, '')
		keys[i] = JSON.stringify(key).replace(/['"]+/g, '');
		querystring = querystring + keys[i] + '=' + values[i] + '&'
	}
	querystring = querystring.slice(0, -1);
	cy.log(querystring);
	return querystring;
}

function selfServiceElasticSearchQuery(elasticSearch,bool=false){
	let date = new Date();
	let currentYear = new Date().toJSON().slice(0,10);
	let previousYear = (`${(date.getFullYear() - 1)}/${date.getMonth() + 1}/${date.getDate()}`).replace(/[/]/g,'-')
	const getData_Obj = JSON.parse(JSON.stringify(getData));
	const template = handlebars.compile(JSON.stringify(getData_Obj["selfservicesearch"]));

	if(previousYear.split('-')[2].length == 1){
		let previousYearArr = previousYear.split('-');
		previousYear = previousYearArr[0] + '-' + previousYearArr[1] + '-' + `0${previousYearArr[2]}`
	}
	const context = {
		from_date: currentYear,
		to_date: previousYear,
		elasticSearch:elasticSearch
	};
	if(bool){
		delete context.from_date;
		delete context.to_date
	}
	const selfservicesearch =  template(context);
	const getQueryString = (getUrlQueryParameters(JSON.parse(selfservicesearch)))
	return getQueryString;
}

module.exports = {
	getHeaders,getUrlFilters,isValidDate,getUrlQueryParameters,selfServiceElasticSearchQuery
}
