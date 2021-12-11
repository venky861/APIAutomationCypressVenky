/// <reference types="cypress" />
var httpRequest = require('request-promise');

const postToSlack = (config) =>{
	var combinedJsonReport = require('../reports/.jsons/combined-report.json')
	return new Promise((resolve,reject)=>{
	//	console.log("Initiating consolidation of test results....");
		var suites = combinedJsonReport.stats['suites'];
		var totalCount = combinedJsonReport.stats['tests'];
		var totalPassed = combinedJsonReport.stats['passes'];
		var totalFailed = combinedJsonReport.stats['failures'];
		var totalDuration = parseFloat((combinedJsonReport.stats['duration']/1000)/60).toFixed(2)
		var totalPassedPercentage = combinedJsonReport.stats['passPercent']
		var testSuiteSummary = ""
		var finalTestSuiteSummaryToPost = "Feature-wise Summary:\n";
		var testExecutiontitle = "AIOPs API Automation Test results:\nURL: " + config['url'] + "\n Build URL: " + config.BUILD_URL
		var totalSpecs = combinedJsonReport.results

		for(let i=0; i<totalSpecs.length;i++){
			var specName,passed,failed;
			specName = totalSpecs[i].suites[0].title;
			passed = totalSpecs[i].suites[0].passes.length
			failed = totalSpecs[i].suites[0].failures.length;
			testSuiteSummary = specName + " - " + " Passed: "+passed.toString() +" Failed: "+ failed.toString() + " "+ "\n";
			finalTestSuiteSummaryToPost = finalTestSuiteSummaryToPost + testSuiteSummary;
		}

		var body = "testExecutiontitle \ntotalCount \ntotalPassed \ntotalFailed \ntotalPassedPercentage \ntotalDuration \nfinalTestSuiteSummaryToPost ";
		
		body = body.replace("testExecutiontitle", testExecutiontitle.toString()+"\n");
		body = body.replace("totalCount", "Total TestCases Executed : " +totalCount.toString());
		body = body.replace("totalPassed", "Passed : " +totalPassed.toString());
		body = body.replace("totalFailed", "Failed : " +totalFailed.toString());
		body = body.replace("totalPassedPercentage", "Passed % : " +Math.floor(totalPassedPercentage).toString());
		body = body.replace("totalDuration", "Duration : " +totalDuration.toString()+" minutes"+"\n");
		body = body.replace("finalTestSuiteSummaryToPost", finalTestSuiteSummaryToPost.toString()+"\n");

		console.log("Test Summary: \n"+body)

		let postToSlack = config['postToSlack'] === "false" != Boolean(config['postToSlack'])
		if(postToSlack){
			var reqOptions={
				method: 'POST',
				url:config['postSlackWebhookURL'],
				body:{"text": body},
				json:true
			};
			httpRequest(reqOptions).then( function(httpResponse) {
				console.log('Response after posting to slack: \n' + httpResponse.toString());
				resolve(httpResponse.toString());
			}).catch(function (err) {
				console.error('Error during posting to slack: \n'+err.toString());
				reject(err);
				return;
			});
		}else{
			resolve(body)
		}
	})
}


module.exports = {
	postToSlack
}