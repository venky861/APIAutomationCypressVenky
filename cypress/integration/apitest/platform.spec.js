/// <reference types="Cypress" />

const apiUtil = require('../../helpers/apiUtil.js')
const apiRoutes = require('../../fixtures/Platform/apiRoutes.json')
const tenantId = Cypress.env('tenantId')
const user = Cypress.env('username')
const url = Cypress.env('url')
const getData = require('../../fixtures/Platform/get.json')
const randomTenantID = "6f90f66s73g21b67d01f50f4"
const TestFilters = require('../../support/filterTests.js')
const postData = require('../../fixtures/Platform/post.json')
const handlebars = require('handlebars')
const testData = require ('../../fixtures/Dashboard/testData.json')

TestFilters(['Integration'], () => { 
   describe('Platform functionality tests', () => {
    /**
	 * @route - api/get
	 * @description - Fetches info about analyticsEnabled and mcmsNotRequired
	 * @response - Validating 200 response
	 */

    it('Verify api is able to fetch Fetch onprem feature flag', () => {
        cy.request({
            method: 'GET',
            url: url + apiRoutes['onpremfeatureflag'] + tenantId,
            headers: apiUtil.getHeaders(),
        }).then((res) => {
            cy.log(JSON.stringify(res))
            expect(res.status).to.eq(200);
        })
	})

	/**
	 * @route - api/get
	 * @description - Fetches info on kibana report for all SM card's
	 * @response - Validating 200 response
	 */
	
	it('Verify api is able to fetch the kibana report url for a given tenant type', () => {
		let kibanaType = Object.values(getData.kibanaType)
		kibanaType.forEach((type)=>{
			cy.request({
				method: 'GET',
				url: url + apiRoutes['kibanaReport'] + tenantId + `/${getData.kibanaType[type]}`,
				headers: apiUtil.getHeaders(),
			}).then((res) => {
				cy.log(JSON.stringify(res))
				expect(res.status).to.eq(200);
			})
		})
	})

	/**
	 * @route - api/get
	 * @description - Incorporating random tenant ID to check whether received response is 401 - unauthorized for kibana report type
	 * @response - Validating 401 response
	 */
	
	it('verify that API throws 401 response on trying to fetch kibana report for random tenantID', () => {
		let kibanaType = Object.values(getData.kibanaType)
		kibanaType.forEach((type)=>{
			cy.request({
				method: 'GET',
				url: url + apiRoutes['kibanaReport'] + randomTenantID + `/${getData.kibanaType[type]}`,
				headers: apiUtil.getHeaders(),
				failOnStatusCode: false
			}).then((res) => {
				cy.log(JSON.stringify(res))
				expect(res.status).to.eq(401);
			})
		})
	})

	/**
	 * @route - api/get
	 * @description - Fetches default client details
	 * @response - Validating 200 response and tenantId
	 */
	it('verify that API is able to fetch default client details and validate tenantid', () => {
        cy.request({
            method: 'GET',
            url: url + apiRoutes['defaultClientDetails'],
            headers: apiUtil.getHeaders(),
        }).then((res) => {
            cy.log(`Response from GET API : ${JSON.stringify(res.body)}`); 
            expect(res.status).to.eq(200);
            expect(res.body.defaultClient.tenantId).to.eq(tenantId);
        })
    })

	/**
	 * @route - api/get
	 * @description - Fetches default client details
	 * @response - Validating 200 response and tenant URL
	 */
	 it('verify that API is able to fetch default client details and validate tenant URL', () => {
        cy.request({
            method: 'GET',
            url: url + apiRoutes['defaultClientDetails'],
            headers: apiUtil.getHeaders(),
        }).then((res) => {
            cy.log(`Response from GET API : ${JSON.stringify(res.body)}`); 
            expect(res.status).to.eq(200);
            expect(res.body.defaultClient.name.toLowerCase()).to.eq((url.split('//')[1].split('-api')[0]).toLowerCase());
        })
	})

	 /**
	 * @route - api/POST
	 * @description - create a user through a post request , and verify that user details matches for the created user
	 * @response - Validating 200 response and emailID
	 */
	
	it.only('Verify that api is able to create a user and verify the details of the created user', () => {	
		const template = handlebars.compile(JSON.stringify(postData[apiRoutes.userInfo]));
		const context = {
            firstName: getData.userInfo["firstName"],
			lastName: getData.userInfo["lastName"],
			emailID: getData.userInfo["emailID"]
		  }
		cy.request({
			method: 'POST',
			url: url + apiRoutes['userInfo'],
			headers: apiUtil.getHeaders(),
			body:template(context)
		}).then((res) => {
			cy.log(JSON.stringify(res))
			expect(res.status).to.eq(200);
			expect(res.body.emails[0]).to.eq(getData.userInfo["emailID"])
		})
	})

	 /**
	 * @route - api/GET and api/POST
	 * @description - fetch the user details from api call , and tag a team for the specified User. After tagging a team , verify team is tagged for the user.
	 * @response - Validating 200 response and validating userID and teamname after tagging user to the team
	 */

	it('Verify that api is able to tag a team for a specified Username and validate UserID', () => {
		let userID , teamName;
		const template = handlebars.compile(JSON.stringify(apiRoutes["getSpecificUserInfo"]));
		const context = {
			firstName: getData.userInfo["firstName"],
			lastName: ` ${getData.userInfo["lastName"]}`
		  }
		cy.request({
			method: 'get',
			url: url + template(context).replace(new RegExp('"','g'),""),
			headers: apiUtil.getHeaders(),
		}).then((res)=>{
			expect(res.status).to.eq(200);
			let response = res.body.response.filter((data)=>(data.firstname === getData.userInfo["firstName"] && data.lastname === getData.userInfo["lastName"]) )
			userID = response[0].userid;
			cy.log('userID --- ' , userID)
			cy.request({
				method: 'get',
				url: url + apiRoutes["getTeams"],
				headers: apiUtil.getHeaders(),
			}).then((res) => {
				expect(res.status).to.eq(200);
				teamName = res.body.response[0].name;
				cy.log('teamName --- ' , teamName);
				cy.request({
					method:'POST',
					url: url + apiRoutes["tagUserToTeams"],
					headers: apiUtil.getHeaders(),
					body: {"user_id_list":[userID],"team_code_list":[teamName]}
				}).then((res) => {
					expect(res.status).to.eq(200);
					let userResponse = JSON.parse(res.body[0]);
					expect(userResponse.translateParameters[0][0]).to.eq(userID);
				})
			})
		})
	})

	 /**
	 * @route - api/GET and api/POST
	 * @description - fetch the user details from api call , and tag a team for the specified User. After tagging a team , verify team is tagged for the user and validate respective team.
	 * @response - Validating 200 response and validating userID and teamname after tagging user to the team
	 */

	it('Verify that api is able to tag a team for a specified Username and validate team name', () => {
		let userID , teamName;
		const template = handlebars.compile(JSON.stringify(apiRoutes["getSpecificUserInfo"]));
		const context = {
			firstName: getData.userInfo["firstName"],
			lastName: ` ${getData.userInfo["lastName"]}`
		  }
		cy.request({
			method: 'get',
			url: url + template(context).replace(new RegExp('"','g'),""),
			headers: apiUtil.getHeaders(),
		}).then((res)=>{
			expect(res.status).to.eq(200);
			let response = res.body.response.filter((data)=>(data.firstname === getData.userInfo["firstName"] && data.lastname === getData.userInfo["lastName"]) )
			userID = response[0].userid;
			cy.log('userID --- ' , userID)
			cy.request({
				method: 'get',
				url: url + apiRoutes["getTeams"],
				headers: apiUtil.getHeaders(),
			}).then((res) => {
				expect(res.status).to.eq(200);
				teamName = res.body.response[0].name;
				cy.log('teamName --- ' , teamName);
				cy.request({
					method:'POST',
					url: url + apiRoutes["tagUserToTeams"],
					headers: apiUtil.getHeaders(),
					body: {"user_id_list":[userID],"team_code_list":[teamName]}
				}).then((res) => {
					expect(res.status).to.eq(200);
					let userResponse = JSON.parse(res.body[0]);
					expect(userResponse.translateParameters[1]).to.eq(teamName);
				})
			})
		})
	})



	 /**
	 * @route - api/GET and api/DELETE
	 * @description - fetch the user details from api call , and DELETE a user from the database
	 * @response - Validating 200 response
	 */

	it('Verify that api is able to delete a user based on the username', () => {
		let userID;
		const userInfotemplate = handlebars.compile(JSON.stringify(apiRoutes["getSpecificUserInfo"]));
		const userInfoContext = {
			firstName: getData.userInfo["firstName"],
			lastName: ` ${getData.userInfo["lastName"]}`
		  }
		
		const userIDTemplate = handlebars.compile(JSON.stringify(apiRoutes["getUserDataByID"]));
		cy.request({
			method: 'get',
			url: url + userInfotemplate(userInfoContext).replace(new RegExp('"','g'),""),
			headers: apiUtil.getHeaders(),
		}).then((res) => {
			expect(res.status).to.eq(200);
			let response = res.body.response.filter((data)=>(data.firstname === getData.userInfo["firstName"] && data.lastname === getData.userInfo["lastName"]) );
			userID = response[0].userid;
			cy.log('userID --- ' , userID);
			const userIDContext = {
				userID:userID
			}
			cy.request({
				method:'DELETE',
				url: url + userIDTemplate(userIDContext).replace(new RegExp('"','g'),""),
				headers: apiUtil.getHeaders(),
			}).then((res)=>{
				expect(res.status).to.eq(200);
				expect(res.body.translateParameters[0]).to.eq(userID);
			})
		})
	})

	/**
	 * @route - api/POST
	 * @description - verify api throws 400 response when user details were not specified on the URL
	 * @response - Validating 400 response
	 */

	it('Verify that api throws 400 response when user details were not specified', () => {
		cy.request({
			method: 'POST',
			url: url + apiRoutes["getSpecificUserInfo"],
			headers: apiUtil.getHeaders(),
			failOnStatusCode: false
		}).then((res) => {
			expect(res.status).to.eq(400)
		})
	})

	/**
	 * @route - api/POST
	 * @description - api call should throw 401 when userID is not passed in the URL as parameter
	 * @response - Validating 401 response
	 */

	it('Verify that api throws 401 response when the user ID is not passed as a parameter in api URL', () => {
		cy.request({
			method: 'POST',
			url: url + apiRoutes["getUserDataByID"],
			headers: apiUtil.getHeaders(),
			failOnStatusCode: false
		}).then((res) => {
			expect(res.status).to.eq(401)
		})
	})

		/**
	 * @route - api/POST
	 * @description - api call should throw 400 when body does not contain data
	 * @response - Validating 400 response
	 */

	it('Verify that api throws 400 response when no data passed on the request body for fetching the teams which are tagged to the user', () => {
		cy.request({
			method: 'POST',
			url: url + apiRoutes["tagUserToTeams"],
			headers: apiUtil.getHeaders(),
			failOnStatusCode: false
		}).then((res) => {
			expect(res.status).to.eq(400)
		})
	})

	/**
	 * @route - api/POST
	 * @description - api call should throw 401 when random Apikey is passed with correct username
	 * @response - Validating 401 response
	 */


	it('Verify that API throws 401 response on trying to create a user with random apiKey', () => {
		const template = handlebars.compile(JSON.stringify(postData[apiRoutes.userInfo]));
		const context = {
            firstName: getData.userInfo["firstName"],
			lastName: getData.userInfo["lastName"],
			emailID: getData.userInfo["emailID"]
		  }
		cy.request({
			method: 'POST',
			url: url + apiRoutes["userInfo"],
			headers: {...apiUtil.getHeaders(), 'Apikey': testData["randomApiKey"]},
			body:template(context),
			failOnStatusCode: false
		}).then((res) => {
			expect(res.status).to.eq(401)
		})
	})

	/**
	 * @route - api/GET
	 * @description - api call should throw 401 when random Apikey is passed with correct username on fetching user details
	 * @response - Validating 401 response
	 */

	it('Verify that API throws 401 response on trying to fetch user details with random apiKey', () => {
		const template = handlebars.compile(JSON.stringify(apiRoutes["getSpecificUserInfo"]));
		const context = {
			firstName: getData.userInfo["firstName"],
			lastName: ` ${getData.userInfo["lastName"]}`
		  }
		cy.request({
			method: 'GET',
			url: url + template(context).replace(new RegExp('"','g'),""),
			headers: {...apiUtil.getHeaders(), 'Apikey': testData["randomApiKey"]},
			failOnStatusCode: false
		}).then((res) => {
			expect(res.status).to.eq(401)
		})
	})

	/**
	 * @route - api/GET
	 * @description - api call should throw 401 when random Apikey is passed with correct username on fetching teams
	 * @response - Validating 401 response
	 */

	it('Verify that API throws 401 response on trying to fetch teams with random apiKey', () => {
		cy.request({
			method: 'get',
			url: url + apiRoutes["getTeams"],
			headers: {...apiUtil.getHeaders(), 'Apikey': testData["randomApiKey"]},
			failOnStatusCode: false
		}).then((res) => {
			expect(res.status).to.eq(401)
		})
	})

	/**
	 * @route - api/POST
	 * @description - api call should throw 401 when random Apikey is passed with correct username on tagging teams
	 * @response - Validating 401 response
	 */

	it('Verify that API throws 401 response on trying to tag teams to the user with random apiKey', () => {
		cy.request({
			method:'POST',
			url: url + apiRoutes["tagUserToTeams"],
			headers: {...apiUtil.getHeaders(), 'Apikey': testData["randomApiKey"]},
			failOnStatusCode: false
		}).then((res) => {
			expect(res.status).to.eq(401);
		})
	})


	/**
	 * @route - api/GET
	 * @description - api call should throw 401 when random Apikey is passed with correct username on trying to fetch details for specific User ID
	 * @response - Validating 401 response
	 */

	it('Verify that API throws 401 response on trying to fetch details for specific user with random apiKey', () => {
		const userInfotemplate = handlebars.compile(JSON.stringify(apiRoutes["getSpecificUserInfo"]));
		const userInfoContext = {
			firstName: getData.userInfo["firstName"],
			lastName: ` ${getData.userInfo["lastName"]}`
		  }
		cy.request({
			method: 'GET',
			url: url + userInfotemplate(userInfoContext).replace(new RegExp('"','g'),""),
			headers: {...apiUtil.getHeaders(), 'Apikey': testData["randomApiKey"]},
			failOnStatusCode: false
		}).then((res) => {
			expect(res.status).to.eq(401);
		})
	})

	/**
	 * @route - api/POST
	 * @description - api call should throw 401 when random Apikey is passed with correct username on trying to remove specific teams from the user
	 * @response - Validating 401 response
	 */

	it('Verify that API throws 401 response on trying to remove specific teams from the user with random apiKey', () => {
		cy.request({
			method:'POST',
			url: url + apiRoutes["removeTeams"],
			headers: {...apiUtil.getHeaders(), 'Apikey': testData["randomApiKey"]},
			body: {
				team_code_list:testData["ITOpsManager"],
				user_id_list:user
			},
			failOnStatusCode: false
		}).then((res) => {
			expect(res.status).to.eq(401);
		})
	})

	/**
	 * @route - api/POST
	 * @description - api call should throw 400 when body does not contain data for removing specific team from the user
	 * @response - Validating 400 response
	 */

	it('Verify that api throws 400 response when no data passed on the request body for removing the specific team from the user', () => {
		cy.request({
			method: 'POST',
			url: url + apiRoutes["removeTeams"],
			headers: apiUtil.getHeaders(),
			failOnStatusCode: false
		}).then((res) => {
			expect(res.status).to.eq(400)
		})
	})

  })
});

