/// <reference types="Cypress" />

const postData = require('../../fixtures/Dashboard/post.json')
const getData = require('../../fixtures/Dashboard/get.json')
const handlebars = require('handlebars')
const apiUtil = require('../../helpers/apiUtil.js')
const apiRoutes = require('../../fixtures/Dashboard/apiRoutes.json')
const tenantId = Cypress.env('tenantId')
const user = Cypress.env('username')
const url = Cypress.env('url')
const randomTenantID = "6f90f66s73g21b67d01f50f4"
const TestFilters = require('../../support/filterTests.js')
const apiRoutesForPlatform = require('../../fixtures/Platform/apiRoutes.json')
const testData = require('../../fixtures/Dashboard/testData.json')


TestFilters(['Regression'], () => { 
    describe('Landing functionality tests', () => {

	/**
	 * @route - api/Post
	 * @description - To customize dashboard cards, by either hiding or showing the card in dashboard
	 * @response - Validating 200 response
	 */
    it('Dashboard card customization for logged in user', () => {
		var cardCount = 0;
        const template = handlebars.compile(JSON.stringify(postData[apiRoutes.customization]));
        const context = {
			tenantId: tenantId,
			user: user
		}
		// Below request is to hide the health card and check the response
		cy.request({
			method: 'POST',
			url: url + apiRoutes['customization'],
			headers: apiUtil.getHeaders(),
			body : template({...context,show:false})
		}).then((res) => {
			cy.log(`Response from POST API : ${JSON.stringify(res.body)}`); 
			expect(res.status).to.eq(200);
			expect(res.body.MESSAGE).to.eq('Success');
			cy.request({
				method: 'GET',
				url: url + apiRoutes['fetchCardDetails'] + tenantId,
				headers: apiUtil.getHeaders(),
			}).then((res)=>{
				expect(res.status).to.eq(200);
				cardCount = res.body.groups.length;
			})
			// Below request is to unhide the health card and check the response
			cy.request({
				method: 'POST',
				url: url + apiRoutes['customization'],
				headers: apiUtil.getHeaders(),
				body : template({...context,show: true})
			}).then((res)=>{
				cy.log(`Response from POST API : ${JSON.stringify(res.body)}`); 
				expect(res.status).to.eq(200);
				expect(res.body.MESSAGE).to.eq('Success');
				cy.request({
					method: 'GET',
					url: url + apiRoutes['fetchCardDetails'] + tenantId,
					headers: apiUtil.getHeaders(),
				}).then((res)=>{
					expect(res.status).to.eq(200);
					var cardCount = res.body.groups.length;
					expect(res.body.groups.length).to.eq(cardCount);
				})
			})
		})
	})

	/**
	 * @route - api/get
	 * @description - Fetches DSR-Incident tickets count and checks whether timestamp is valid and should not be blank 
	 * @response - Validating 200 response and lastUpdatedFromTime
	 */
	
	it('Verify api is able to fetch tickets count and lastUpdatedFromTime for DSR-Incident', () => {
		cy.request({
            method: 'GET',
            url: url + apiRoutes['DSRIncident'] + `/${tenantId}`,
            headers: apiUtil.getHeaders('application/json'),
        }).then((res) => {
			cy.log(JSON.stringify(res))
			var lastUpdatedFromTime = res.body.MESSAGE.lastUpdatedFromTime
			expect(res.status).to.eq(200)
			expect(isNaN(Date.parse(lastUpdatedFromTime))).to.be.false
			expect(apiUtil.isValidDate(lastUpdatedFromTime.split('T')[0])).to.be.true
        })
    })
    
    /**
	 * @route - api/get
	 * @description - Fetches DSR-Incident tickets count and checks whether timestamp is valid and should not be blank 
	 * @response - Validating 200 response and lastUpdatedToTime
	 */
	
	it('Verify api is able to fetch tickets count and lastUpdatedToTime for DSR-Incident', () => {
		cy.request({
            method: 'GET',
            url: url + apiRoutes['DSRIncident'] + `/${tenantId}`,
            headers: apiUtil.getHeaders('application/json'),
        }).then((res) => {
			cy.log(JSON.stringify(res))
			var lastUpdatedToTime = res.body.MESSAGE.lastUpdatedToTime
			expect(res.status).to.eq(200)
			expect(isNaN(Date.parse(lastUpdatedToTime))).to.be.false
			expect(apiUtil.isValidDate(lastUpdatedToTime.split('T')[0])).to.be.true
        })
	})

	/**
	 * @route - api/get
	 * @description - Fetches DSR-Problem tickets count and checks whether timestamp is valid and should not be blank 
	 * @response - Validating 200 response and lastUpdatedFromTime
	 */

	it('Verify api is able to fetch ticket count and lastUpdatedFromTime for DSR-Problem', () => {
		cy.request({
            method: 'GET',
            url: url + apiRoutes['DSRProblem'] + `/${tenantId}`,
            headers: apiUtil.getHeaders('application/json'),
        }).then((res) => {
			cy.log(JSON.stringify(res))
			var lastUpdatedFromTime = res.body.MESSAGE.lastUpdatedFromTime
			expect(res.status).to.eq(200)
            expect(isNaN(Date.parse(lastUpdatedFromTime))).to.be.false
            expect(apiUtil.isValidDate(lastUpdatedFromTime.split('T')[0])).to.be.true
        })
    })
    
    /**
	 * @route - api/get
	 * @description - Fetches DSR-Problem tickets count and checks whether timestamp is valid and should not be blank 
	 * @response - Validating 200 response and lastUpdatedToTime
	 */

	it('Verify api is able to fetch ticket count and lastUpdatedToTime for DSR-Problem', () => {
		cy.request({
            method: 'GET',
            url: url + apiRoutes['DSRProblem'] + `/${tenantId}`,
            headers: apiUtil.getHeaders('application/json'),
        }).then((res) => {
			cy.log(JSON.stringify(res))
			var lastUpdatedToTime = res.body.MESSAGE.lastUpdatedToTime
			expect(res.status).to.eq(200)
            expect(isNaN(Date.parse(lastUpdatedToTime))).to.be.false
			expect(apiUtil.isValidDate(lastUpdatedToTime.split('T')[0])).to.be.true
        })
	})


	/**
	 * @route - api/get
	 * @description - Fetches DSR-SR tickets count and checks whether timestamp is valid and should not be blank 
	 * @response - Validating 200 response and lastUpdatedFromTime
	 */

	it('Verify api is able to fetch tickets count and lastUpdatedFromTime for DSR-Service Request', () => {
		cy.request({
            method: 'GET',
            url: url + apiRoutes['DSRServiceRequest'] + `/${tenantId}`,
            headers: apiUtil.getHeaders('application/json'),
        }).then((res) => {
			cy.log(JSON.stringify(res))
			var lastUpdatedFromTime = res.body.MESSAGE.lastUpdatedFromTime
			expect(res.status).to.eq(200)
            expect(isNaN(Date.parse(lastUpdatedFromTime))).to.be.false
            expect(apiUtil.isValidDate(lastUpdatedFromTime.split('T')[0])).to.be.true
        })
    })
    

	/**
	 * @route - api/get
	 * @description - Fetches DSR-SR tickets count and checks whether timestamp is valid and should not be blank 
	 * @response - Validating 200 response and lastUpdatedToTime
	 */

	it('Verify api is able to fetch tickets count and lastUpdatedToTime for DSR-Service Request', () => {
		cy.request({
            method: 'GET',
            url: url + apiRoutes['DSRServiceRequest'] + `/${tenantId}`,
            headers: apiUtil.getHeaders('application/json'),
        }).then((res) => {
			cy.log(JSON.stringify(res))
			var lastUpdatedToTime = res.body.MESSAGE.lastUpdatedToTime
            expect(res.status).to.eq(200)
            expect(isNaN(Date.parse(lastUpdatedToTime))).to.be.false
			expect(apiUtil.isValidDate(lastUpdatedToTime.split('T')[0])).to.be.true
        })
	})

	/**
	 * @route - api/get
	 * @description - Fetches DSR-CR tickets count and checks whether timestamp is valid and should not be blank 
	 * @response - Validating 200 response and lastUpdatedFromTime
	 */

	it('Verify api is able to fetch tickets count and lastUpdatedFromTime for DSR-Change Request', () => {
		cy.request({
            method: 'GET',
            url: url + apiRoutes['DSRChange'] + `/${tenantId}`,
            headers: apiUtil.getHeaders('application/json'),
        }).then((res) => {
			cy.log(JSON.stringify(res))
			var lastUpdatedFromTime = res.body.MESSAGE.lastUpdatedFromTime
			expect(res.status).to.eq(200)
			expect(isNaN(Date.parse(lastUpdatedFromTime))).to.be.false
			expect(apiUtil.isValidDate(lastUpdatedFromTime.split('T')[0])).to.be.true
        })
    })
    
    	/**
	 * @route - api/get
	 * @description - Fetches DSR-CR tickets count and checks whether timestamp is valid and should not be blank 
	 * @response - Validating 200 response and lastUpdatedToTime
	 */

	it('Verify api is able to fetch tickets count and lastUpdatedToTime for DSR-Change Request', () => {
		cy.request({
            method: 'GET',
            url: url + apiRoutes['DSRChange'] + `/${tenantId}`,
            headers: apiUtil.getHeaders('application/json'),
        }).then((res) => {
			cy.log(JSON.stringify(res))
			var lastUpdatedToTime = res.body.MESSAGE.lastUpdatedToTime
			expect(res.status).to.eq(200)
			expect(isNaN(Date.parse(lastUpdatedToTime))).to.be.false
			expect(apiUtil.isValidDate(lastUpdatedToTime.split('T')[0])).to.be.true
        })
	})

	/**
	 * @route - api/get
	 * @description - Fetches Sunrise card ticket count and checks whether request is response is 200
	 * @response - Validating 200 response
	 */

	it('Verify api is able to fetch tickets count and timestamp for Sunrise report card', () => {
		const snapShotDate = new Date().toISOString().split('T')[0]
		cy.request({
            method: 'GET',
            url: url + apiRoutes['sunriseReport'] + `/${tenantId}` + `/${snapShotDate}`,
            headers: apiUtil.getHeaders('application/json'),
        }).then((res) => {
			cy.log(JSON.stringify(res))
			expect(res.status).to.eq(200)
        })
	})

	/**
	 * @route - api/get
	 * @description - Incorporating random tenant ID to check whether received response is 401 - unauthorized
	 * @response - Validating 401 response
	 */

	it("verify that API throws 401 response on trying to fetch ticket count for DSR card", () => {
		let routes = [apiRoutes['sunriseReport'],apiRoutes['DSRChange'],apiRoutes['DSRProblem'],apiRoutes['DSRServiceRequest'],
		apiRoutes["DSRChange"],apiRoutes['sunriseReport']]

		routes.forEach((route)=>{
			cy.log('route',route)
			cy.request({
				method: 'GET',
				url: url + route + `/${randomTenantID}`,
				headers: apiUtil.getHeaders('application/json'),
				failOnStatusCode: false
			}).then((res) => {
				expect(res.status).to.eq(401)
			})
        })
    })	

    /**
	 * @route - api/get
	 * @description - Fetch mainframe insights
	 * @response - Validating 200 response
	 */

    it('Fetch mainframe insights', () => {
        cy.request({
            method: 'GET',
            url: url + apiRoutes['mainframeinsights'] + tenantId,
            headers: apiUtil.getHeaders(),
        }).then((res) => {
            cy.log(JSON.stringify(res))
            expect(res.status).to.eq(200);
        })
    })

     /**
	 * @route - api/get
	 * @description - Search uploaded self service file by from/To date,sort
	 * @response - Validating 200 response
	 */

    it('Fetch self service upload data details', () => {
        const getData_Obj = JSON.parse(JSON.stringify(getData));
        const selfserviceupload = getData_Obj.selfserviceupload;
        const getFilters = apiUtil.getUrlFilters(selfserviceupload);
        cy.log("getFilters" ,JSON.stringify(getFilters));
        cy.request({
            method: 'GET',
            url: url + apiRoutes['selfserviceupload'] + tenantId + getFilters['filters'],
            headers: apiUtil.getHeaders()
        }).then((res) => {
            cy.log(JSON.stringify(res))
            expect(res.status).to.eq(200);
        })
    })

    /**
	 * @route - api/get
	 * @description - Fetch list of card associated with the tenant
	 * @response - Validating 200 response and cards count
	 */

    it('verify that API is able to fetch list of card associated with the tenant', () => {
        cy.request({
            method: 'GET',
            url: url + apiRoutes['fetchCardDetails'] + tenantId,
            headers: apiUtil.getHeaders(),
        }).then((res) => {
            cy.log(`Response from GET API : ${JSON.stringify(res.body)}`); 
            expect(res.status).to.eq(200);
            expect(res.body.tenantId).to.eq(tenantId);
            expect(res.body.user).to.eq(user);
        }).then((res) => {
            var cardCount = res.body.groups.length;
            cy.request({
                method: 'GET',
                url: url + apiRoutes['getTenantAndCardDetails'],
                headers: apiUtil.getHeaders(),
            }).then((res) => {
                cy.log(`Response from GET API : ${JSON.stringify(res.body)}`); 
                expect(res.status).to.eq(200);
                expect((Object.keys(res.body.card).length)-3).to.eq(cardCount);
            })
        })
    })

    /**
	 * @route - api/get
	 * @description - API throws 401 on trying to access the card of other tenant
	 * @response - Validating 401 response 
	 */

    it('verify that API throws 401 on trying to access the card of other tenant', () => {
        cy.request({
            method: 'GET',
            url: url + apiRoutes['fetchCardDetails'] + randomTenantID,
            headers: apiUtil.getHeaders(),
            failOnStatusCode: false
        }).then((res) => {
            cy.log(`Response from GET API : ${JSON.stringify(res.body)}`); 
            expect(res.status).to.eq(401);
            expect(res.body.MESSAGE).to.eq("Unauthorized");
        })
    })

       /**
	 * @route - api/get
	 * @description - API fetches logged in user details
	 * @response - Validating 200 response and user email
	 */

    it('Verify that API is able to fetch logged in user details', () => {
        cy.request({
            method: 'GET',
            url: url + apiRoutes['userInfo'],
            headers: apiUtil.getHeaders(),
        }).then((res) => {
            cy.log(`Response from GET API : ${JSON.stringify(res.body)}`); 
            expect(res.status).to.eq(200);
            expect(res.body.email).to.eq(user);
        })
    })

    /**
	 * @route - api/get
	 * @description - Search Incident ticket count from elasticsearch raw indexes
	 * @response - Validating 200 response
	 */

    it('Verify that API is able to search Incident ticket count from elasticsearch raw indexes', () => {
        const getQueryString = apiUtil.selfServiceElasticSearchQuery(testData["raw"]);
        cy.request({
            method: 'GET',
            url: url + apiRoutes['searchIncidentTicket'] + getQueryString,
            headers: apiUtil.getHeaders(),
        }).then((res) => {
            cy.log(`Response from GET API : ${JSON.stringify(res.body)}`); 
            expect(res.status).to.eq(200);
        })
    })

    /**
	 * @route - api/get
	 * @description - Search Incident ticket API throwing 401 error when incorrect APIkey is passed
	 * @response - Validating 401 response
	 */

    it('Verify whether search Incident ticket API is throwing 401 error when incorrect APIkey is passed', () => {
        const getQueryString = apiUtil.selfServiceElasticSearchQuery(testData["raw"]);
        cy.request({
            method: 'GET',
            url: url + apiRoutes['searchIncidentTicket'] + getQueryString,
            headers: {...apiUtil.getHeaders(), 'Apikey': testData["randomApiKey"]},
            failOnStatusCode: false
        }).then((res) => {
            expect(res.status).to.eq(401);
            expect(res.body).to.eq("Unauthorized");
        })
    })

    /**
	 * @route - api/get
	 * @description -  Search problem ticket API throwing 401 error when incorrect APIkey is passed
	 * @response - Validating 401 response
	 */

    it('Verify that Search problem ticket API throwing 401 error when incorrect APIkey is passed', () => {
		const getQueryString = apiUtil.selfServiceElasticSearchQuery(testData["raw"]);
        cy.request({
            method: 'GET',
            url: url + apiRoutes['searchProblemTicket'] + getQueryString,
            headers: {...apiUtil.getHeaders(), 'Apikey': testData["randomApiKey"]},
			failOnStatusCode: false,
			headers1: {...apiUtil.getHeaders(), username:2123},
        }).then((res) => {
            cy.log(`Response from GET API : ${JSON.stringify(res.body)}`); 
            expect(res.status).to.eq(401);
            expect(res.body).to.eq("Unauthorized");
        })
    })

      /**
	 * @route - api/get
	 * @description - Search Problem ticket count from elasticsearch raw indexes
	 * @response - Validating 200 response
	 */

    it('Verify that API is able to search Problem ticket count from elasticsearch raw indexes', () => {
        const getQueryString = apiUtil.selfServiceElasticSearchQuery(testData["raw"]);
        cy.request({
            method: 'GET',
            url: url + apiRoutes['searchProblemTicket'] + getQueryString,
            headers: apiUtil.getHeaders(),
        }).then((res) => {
            cy.log(`Response from GET API : ${JSON.stringify(res.body)}`); 
            expect(res.status).to.eq(200);
        })
    })


    /**
	 * @route - api/get
	 * @description - Search Service Request count from elasticsearch raw indexes
	 * @response - Validating 200 response
	 */

    it('Verify that API is able to search Service Request count from elasticsearch raw indexes', () => {
        const getQueryString = apiUtil.selfServiceElasticSearchQuery(testData["raw"]);
        cy.request({
            method: 'GET',
            url: url + apiRoutes['searchServiceRequest'] + getQueryString,
            headers: apiUtil.getHeaders(),
        }).then((res) => {
            cy.log(`Response from GET API : ${JSON.stringify(res.body)}`); 
            expect(res.status).to.eq(200);
        })
    })

    /**
	 * @route - api/get
	 * @description -  Search service Request API throwing 401 error when incorrect APIkey is passed
	 * @response - Validating 401 response
	 */

    it('Verify that Search service Request API throwing 401 error when incorrect APIkey is passed', () => {
        const getQueryString = apiUtil.selfServiceElasticSearchQuery(testData["raw"]);
        cy.request({
            method: 'GET',
            url: url + apiRoutes['searchServiceRequest'] + getQueryString,
            headers: {...apiUtil.getHeaders(), 'Apikey': testData["randomApiKey"]},
            failOnStatusCode: false
        }).then((res) => {
            cy.log(`Response from GET API : ${JSON.stringify(res.body)}`); 
            expect(res.status).to.eq(401);
            expect(res.body).to.eq("Unauthorized");
        })
    })

       /**
	 * @route - api/get
	 * @description - Search Change Request from elasticsearch raw indexes
	 * @response - Validating 200 response
	 */

    it('Verify that API is able to search Change Request from elasticsearch raw indexes ', () => {
		const getQueryString = apiUtil.selfServiceElasticSearchQuery(testData["raw"]);
        cy.request({
            method: 'GET',
            url: url + apiRoutes['searchChangeRequest'] + getQueryString,
            headers: apiUtil.getHeaders(),
        }).then((res) => {
            cy.log(`Response from GET API : ${JSON.stringify(res.body)}`); 
            expect(res.status).to.eq(200);
        })
    })

     /**
	 * @route - api/get
	 * @description -  Search Change ticket API throwing 401 error when incorrect APIkey is passed
	 * @response - Validating 401 response
	 */

    it('Verify that Search Change ticket API throwing 401 error when incorrect APIkey is passed', () => {
		const getQueryString = apiUtil.selfServiceElasticSearchQuery(testData["raw"]);
        cy.request({
            method: 'GET',
            url: url + apiRoutes['searchChangeRequest'] + getQueryString,
            headers: {...apiUtil.getHeaders(), 'Apikey': testData["randomApiKey"]},
            failOnStatusCode: false
        }).then((res) => {
            cy.log(`Response from GET API : ${JSON.stringify(res.body)}`); 
            expect(res.status).to.eq(401);
            expect(res.body).to.eq("Unauthorized");
        })
    })

    /**
	 * @route - api/get
	 * @description - Search Event count from elasticsearch raw indexes
	 * @response - Validating 200 response
	 */

    it('Verify that API is able to search Event count from elasticsearch raw indexes', () => {
        const getQueryString = apiUtil.selfServiceElasticSearchQuery(testData["raw"]);
        cy.request({
            method: 'GET',
            url: url + apiRoutes['searchEvent'] + getQueryString,
            headers: apiUtil.getHeaders(),
        }).then((res) => {
            cy.log(`Response from GET API : ${JSON.stringify(res.body)}`); 
            expect(res.status).to.eq(200);
        })
    })

    /**
	 * @route - api/get
	 * @description -  Search Event API throwing 401 error when incorrect APIkey is passed
	 * @response - Validating 401 response
	 */

    it('Verify that Search Event API throwing 401 error when incorrect APIkey is passed', () => {
		const getQueryString = apiUtil.selfServiceElasticSearchQuery(testData["raw"]);
        cy.request({
            method: 'GET',
            url: url + apiRoutes['searchEvent'] + getQueryString,
            headers: {...apiUtil.getHeaders(), 'Apikey': testData["randomApiKey"]},
            failOnStatusCode: false
        }).then((res) => {
            cy.log(`Response from GET API : ${JSON.stringify(res.body)}`); 
            expect(res.status).to.eq(401);
            expect(res.body).to.eq("Unauthorized");
        })
    })

     /**
	 * @route - api/get
	 * @description - Search inventory count from elasticsearch raw indexes
	 * @response - Validating 200 response
	 */

    it('Verify that API is able to search inventory count from elasticsearch raw indexes', () => {
        const getQueryString = apiUtil.selfServiceElasticSearchQuery(testData["raw"]);
        cy.request({
            method: 'GET',
            url: url + apiRoutes['searchInventory'] + getQueryString,
            headers: apiUtil.getHeaders(),
        }).then((res) => {
            cy.log(`Response from GET API : ${JSON.stringify(res.body)}`); 
            expect(res.status).to.eq(200);
        })
    })

    /**
	 * @route - api/get
	 * @description -  Search inventory API throwing 401 error when incorrect APIkey is passed
	 * @response - Validating 401 response
	 */

    it('Verify that Search inventory API throwing 401 error when incorrect APIkey is passed', () => {
		const getQueryString = apiUtil.selfServiceElasticSearchQuery(testData["raw"]);
        cy.request({
            method: 'GET',
            url: url + apiRoutes['searchInventory'] + getQueryString,
            headers: {...apiUtil.getHeaders(), 'Apikey': testData["randomApiKey"]},
            failOnStatusCode: false
        }).then((res) => {
            cy.log(`Response from GET API : ${JSON.stringify(res.body)}`); 
            expect(res.status).to.eq(401);
            expect(res.body).to.eq("Unauthorized");
        })
    })

     /**
	 * @route - api/get
	 * @description - Search CacfTickets count from elasticsearch raw indexes
	 * @response - Validating 200 response
	 */

    it('Verify that API is able to search CacfTickets count from elasticsearch raw indexes', () => {
        const getQueryString = apiUtil.selfServiceElasticSearchQuery(testData["raw"]);
        cy.request({
            method: 'GET',
            url: url + apiRoutes['searchCacfTickets'] + getQueryString,
            headers: apiUtil.getHeaders(),
        }).then((res) => {
            cy.log(`Response from GET API : ${JSON.stringify(res.body)}`); 
            expect(res.status).to.eq(200);
        })
    })


    /**
	 * @route - api/get
	 * @description -  Search CacfTickets API throwing 401 error when incorrect APIkey is passed
	 * @response - Validating 401 response
	 */

    it('Verify that Search CacfTickets API throwing 401 error when incorrect APIkey is passed', () => {
		const getQueryString = apiUtil.selfServiceElasticSearchQuery(testData["raw"]);
        cy.request({
            method: 'GET',
            url: url + apiRoutes['searchCacfTickets'] + getQueryString,
            headers: {...apiUtil.getHeaders(), 'Apikey': testData["randomApiKey"]},
            failOnStatusCode: false
        }).then((res) => {
            cy.log(`Response from GET API : ${JSON.stringify(res.body)}`); 
            expect(res.status).to.eq(401);
            expect(res.body).to.eq("Unauthorized");
        })
    })


     /**
	 * @route - api/get
	 * @description - Search CacfServers count from elasticsearch raw indexes
	 * @response - Validating 200 response
	 */

    it('Verify that API is able to search CacfServers count from elasticsearch raw indexes', () => {
		const getQueryString = apiUtil.selfServiceElasticSearchQuery(testData["raw"],true);
        cy.request({
            method: 'GET',
            url: url + apiRoutes['searchCacfServers'] + getQueryString,
            headers: apiUtil.getHeaders(),
        }).then((res) => {
            cy.log(`Response from GET API : ${JSON.stringify(res.body)}`); 
            expect(res.status).to.eq(200);
        })
    })

    /**
	 * @route - api/get
	 * @description -  Search CacfServers API throwing 401 error when incorrect APIkey is passed
	 * @response - Validating 401 response
	 */

    it('Verify that Search CacfServers API throwing 401 error when incorrect APIkey is passed', () => {
		const getQueryString = apiUtil.selfServiceElasticSearchQuery(testData["raw"],true);
        cy.request({
            method: 'GET',
            url: url + apiRoutes['searchCacfServers'] + getQueryString,
            headers: {...apiUtil.getHeaders(), 'Apikey': testData["randomApiKey"]},
            failOnStatusCode: false
        }).then((res) => {
            cy.log(`Response from GET API : ${JSON.stringify(res.body)}`); 
            expect(res.status).to.eq(401);
            expect(res.body).to.eq("Unauthorized");
        })
    })

      /**
	 * @route - api/get
	 * @description - Search Lds count from elasticsearch raw indexes
	 * @response - Validating 200 response
	 */

    it('Verify that API is able to search Lds count from elasticsearch raw indexes', () => {
		const getQueryString = apiUtil.selfServiceElasticSearchQuery(testData["raw"],true);
        cy.request({
            method: 'GET',
            url: url + apiRoutes['searchLds'] + getQueryString,
            headers: apiUtil.getHeaders(),
        }).then((res) => {
            cy.log(`Response from GET API : ${JSON.stringify(res.body)}`); 
            expect(res.status).to.eq(200);
        })
    })

    /**
	 * @route - api/get
	 * @description -  Search Lds count API throwing 401 error when incorrect APIkey is passed
	 * @response - Validating 401 response
	 */

    it('Verify that Search Lds count API throwing 401 error when incorrect APIkey is passed', () => {
		const getQueryString = apiUtil.selfServiceElasticSearchQuery(testData["raw"],true);
        cy.request({
            method: 'GET',
            url: url + apiRoutes['searchLds'] + getQueryString,
            headers: {...apiUtil.getHeaders(), 'Apikey': testData["randomApiKey"]},
            failOnStatusCode: false
        }).then((res) => {
            cy.log(`Response from GET API : ${JSON.stringify(res.body)}`); 
            expect(res.status).to.eq(401);
            expect(res.body).to.eq("Unauthorized");
        })
    })

    /**
	 * @route - api/get
	 * @description - Search metrics count from elasticsearch raw indexes
	 * @response - Validating 200 response
	 */

    it('Verify that API is able to search metrics count from elasticsearch raw indexes', () => {
		const getQueryString = apiUtil.selfServiceElasticSearchQuery(testData["raw"]);
        cy.request({
            method: 'GET',
            url: url + apiRoutes['searchMetrics'] + getQueryString,
            headers: apiUtil.getHeaders(),
        }).then((res) => {
            cy.log(`Response from GET API : ${JSON.stringify(res.body)}`); 
            expect(res.status).to.eq(200);
        })
    })
    
    /**
	 * @route - api/get
	 * @description - Search metrics count API throwing 401 error when incorrect APIkey is passed
	 * @response - Validating 401 response
	 */

    it('Verify that Search metrics  count API throwing 401 error when incorrect APIkey is passed', () => {
		const getQueryString = apiUtil.selfServiceElasticSearchQuery(testData["raw"]);
        cy.request({
            method: 'GET',
            url: url + apiRoutes['searchMetrics'] + getQueryString,
            headers: {...apiUtil.getHeaders(), 'Apikey': testData["randomApiKey"]},
            failOnStatusCode: false
        }).then((res) => {
            cy.log(`Response from GET API : ${JSON.stringify(res.body)}`); 
            expect(res.status).to.eq(401);
            expect(res.body).to.eq("Unauthorized");
        })
    })

	
	/**
	 * @route - api/get , api/POST
	 * @description - api looks whether user has IT Ops manager role, if the user has IT ops role - card validation is performed on dashboard through API call,
	 * if the user doesn't have IT Manager role , then respective IT Ops manager team will be tagged to the user. After validation tagged team will be removed from the user
	 * @response - Validating 200 response
	 */

	it('verify api is able to fetch all respectives cards for the IT Ops manager role and cross check with cards on dashboard for the IT Ops manager role', () => {
		let dashboardGroupID = [];
		let ITOpsManagerRoleGroupID = testData["groupIDForITOps"];
		let roles = []
		let firstName, lastname , userID, ITManagerTeamName;
		// Below api route provides basic info like first name , last name etc
		cy.request({
			method: 'GET',
            url: url + apiRoutes['basicInfo'],
            headers: apiUtil.getHeaders(),
		}).then((res) => {
			expect(res.status).to.eq(200);
			firstName = res.body.firstname;
			lastname = res.body.lastname
			userID = res.body.userid
			const template = handlebars.compile(JSON.stringify(apiRoutesForPlatform["getSpecificUserInfo"]));
			const context = {
				firstName: firstName,
				lastName:` ${lastname}`
			}
			// Above retrieved firstname and lastName is passed to below api inorder to fetch the teams which are tagged to the loggedin user
			cy.request({
				method: 'GET',
				url: url + template(context).replace(new RegExp('"','g'),""),
				headers: apiUtil.getHeaders(),
			}).then((res) => {
				let teams = res.body.response[0].teams
				// Below api route provides the teams and roles created for the tenant
				cy.request({
					method: 'GET',
					url: url + apiRoutesForPlatform["getTeams"],
					headers: apiUtil.getHeaders(),
				}).then((res) => {
					res.body.response.forEach((data)=>{
						// Pushing the roles for the logged user
						if(teams.includes(data.name)){
							roles.push(data.roles[0].name)
						}
						data.roles.forEach((role)=>{
							if(role.name === testData["ITOpsManager"]){
								ITManagerTeamName = data.name;
							}
						})
					})
					cy.log('User has tagged to these roles ------- ' + roles)
					cy.log('For IT Ops manager role, team name is ', ITManagerTeamName)
					if(roles.includes(testData["ITOpsManager"])){
						cy.log('User has IT Ops manager role')
						cy.request({
							method: 'GET',
							url: url + apiRoutes['fetchCardDetails'] + tenantId,
							headers: apiUtil.getHeaders(),
						}).then((res)=>{
							expect(res.status).to.eq(200);
							res.body.groups.map((data)=>dashboardGroupID.push(data.groupId));
							cy.log('dashboardGroupID',dashboardGroupID);
							cy.log('ITOpsManagerRoleGroupID',ITOpsManagerRoleGroupID);
							// Dashboard card validation is performed below
							ITOpsManagerRoleGroupID.forEach((groupId)=>{
								expect(dashboardGroupID.includes(groupId)).to.be.true
							})
						})
					}else{
						// if the user does not have a IT Ops manager role, then respective IT ops manager team will be tagged to the user
						cy.request({
							method:'POST',
							url: url + apiRoutesForPlatform["tagUserToTeams"],
							headers: apiUtil.getHeaders(),
							body: {"user_id_list":[userID],"team_code_list":[ITManagerTeamName]}
						}).then((res) => {
							expect(res.status).to.eq(200);
							let userResponse = JSON.parse(res.body[0]);
							expect(userResponse.translateParameters[0][0]).to.eq(userID);
							cy.request({
								method: 'GET',
								url: url + apiRoutes['fetchCardDetails'] + tenantId,
								headers: apiUtil.getHeaders(),
							}).then((res)=>{
								expect(res.status).to.eq(200);
								res.body.groups.map((data)=>dashboardGroupID.push(data.groupId));
								cy.log('dashboardGroupID',dashboardGroupID);
								cy.log('ITOpsManagerRoleGroupID',ITOpsManagerRoleGroupID);
								ITOpsManagerRoleGroupID.forEach((groupId)=>{
									expect(dashboardGroupID.includes(groupId)).to.be.true
								})
								// after validation respective tagged team will be removed from the user
								cy.request({
									method:'POST',
									url: url + apiRoutesForPlatform["removeTeams"],
									headers: apiUtil.getHeaders(),
									body: {
										team_code_list:[ITManagerTeamName],
										user_id_list:[userID]
									}
								}).then((res)=>{
									expect(res.status).to.eq(200);
								})
							})
						})
					}
				})
			})
		})
	})

	/**
	 * @route - api/get , api/POST
	 * @description - api looks whether user has aiops admin role, if the user has aiops admin role then card validation is performed on dashboard through API call,
	 * if the user doesn't have aiops admin role , then respective aiops admin team will be tagged to the user. After validation tagged team will be removed from the user
	 * @response - Validating 200 response
	 */

	it('verify api is able to fetch all respectives cards for the Aiops admin role and cross check with cards on dashboard for Aiops admin role', () => {
		let dashboardGroupID = [];
		let AiopsAdminRoleGroupID = testData["groupIDforAiopsAdmin"];
		let roles = []
		let firstName, lastname , userID, aiopsAdminTeamName;
		// Below api route provides basic info like first name , last name etc
		cy.request({
			method: 'GET',
            url: url + apiRoutes['basicInfo'],
            headers: apiUtil.getHeaders(),
		}).then((res) => {
			expect(res.status).to.eq(200);
			firstName = res.body.firstname;
			lastname = res.body.lastname
			userID = res.body.userid
			const template = handlebars.compile(JSON.stringify(apiRoutesForPlatform["getSpecificUserInfo"]));
			const context = {
				firstName: firstName,
				lastName:` ${lastname}`
			}
			// Above retrieved firstname and lastName is passed to below api inorder to fetch the teams which are tagged to the loggedin user
			cy.request({
				method: 'GET',
				url: url + template(context).replace(new RegExp('"','g'),""),
				headers: apiUtil.getHeaders(),
			}).then((res) => {
				let teams = res.body.response[0].teams
				// Below api route provides the teams and roles created for the tenant
				cy.request({
					method: 'GET',
					url: url + apiRoutesForPlatform["getTeams"],
					headers: apiUtil.getHeaders(),
				}).then((res) => {
					res.body.response.forEach((data)=>{
						// Pushing the roles for the logged user
						if(teams.includes(data.name)){
							roles.push(data.roles[0].name)
						}
						data.roles.forEach((role)=>{
							if(role.name === testData["aiopsAdmin"]){
								aiopsAdminTeamName = data.name;
							}
						})
					})
					cy.log('User has tagged to these roles ------- ' + roles)
					cy.log('Aiops admin role team name is ', aiopsAdminTeamName)
					if(roles.includes(testData["aiopsAdmin"])){
						cy.log('User has Aiops admin role')
						cy.request({
							method: 'GET',
							url: url + apiRoutes['fetchCardDetails'] + tenantId,
							headers: apiUtil.getHeaders(),
						}).then((res)=>{
							expect(res.status).to.eq(200);
							res.body.groups.map((data)=>dashboardGroupID.push(data.groupId));
							cy.log('dashboardGroupID',dashboardGroupID);
							cy.log('AiopsAdminRoleGroupID',AiopsAdminRoleGroupID);
							// Dashboard card validation is performed below
							AiopsAdminRoleGroupID.forEach((groupId)=>{
								expect(dashboardGroupID.includes(groupId)).to.be.true
							})
						})
					}else{
						// if the user does not have a aiops admin role, then respective aiops admin team will be tagged to the user
						cy.request({
							method:'POST',
							url: url + apiRoutesForPlatform["tagUserToTeams"],
							headers: apiUtil.getHeaders(),
							body: {"user_id_list":[userID],"team_code_list":[aiopsAdminTeamName]}
						}).then((res) => {
							expect(res.status).to.eq(200);
							let userResponse = JSON.parse(res.body[0]);
							expect(userResponse.translateParameters[0][0]).to.eq(userID);
							cy.request({
								method: 'GET',
								url: url + apiRoutes['fetchCardDetails'] + tenantId,
								headers: apiUtil.getHeaders(),
							}).then((res)=>{
								expect(res.status).to.eq(200);
								res.body.groups.map((data)=>dashboardGroupID.push(data.groupId));
								cy.log('dashboardGroupID',dashboardGroupID);
								cy.log('AiopsAdminRoleGroupID',AiopsAdminRoleGroupID);
								AiopsAdminRoleGroupID.forEach((groupId)=>{
									expect(dashboardGroupID.includes(groupId)).to.be.true
								})
								// after validation respective tagged team will be removed from the user
								cy.request({
									method:'POST',
									url: url + apiRoutesForPlatform["removeTeams"],
									headers: apiUtil.getHeaders(),
									body: {
										team_code_list:[aiopsAdminTeamName],
										user_id_list:[userID]
									}
								}).then((res)=>{
									expect(res.status).to.eq(200);
								})
							})
						})
					}
				})
			})
		})
	})

	/**
	 * @route - api/get
	 * @description - api call should throw 401 when random Apikey is passed with correct username on trying to fetch details for user
	 * @response - Validating 401 response
	 */

	it('Verify that API throws 401 response on trying to fetch user details for the user with random apiKey ', () => {
		cy.request({
			method: 'GET',
            url: url + apiRoutes['basicInfo'],
            headers: {...apiUtil.getHeaders(), 'Apikey': testData["randomApiKey"]},
			failOnStatusCode: false
		}).then((res) => {
			expect(res.status).to.eq(401);
		})
	})

	/**
	 * @route - api/get
	 * @description - Search Incident ticket count from elasticsearch processed indexes
	 * @response - Validating 200 response
	 */

    it('Verify that API is able to search Incident ticket count from elasticsearch processed indexes', () => {
        const getQueryString = apiUtil.selfServiceElasticSearchQuery(testData["processed"]);
        cy.request({
            method: 'GET',
            url: url + apiRoutes['searchIncidentTicket'] + getQueryString,
            headers: apiUtil.getHeaders(),
        }).then((res) => {
            cy.log(`Response from GET API : ${JSON.stringify(res.body)}`); 
            expect(res.status).to.eq(200);
        })
	})
	
	  /**
	 * @route - api/get
	 * @description - Search Problem ticket count from elasticsearch processed indexes
	 * @response - Validating 200 response
	 */

    it('Verify that API is able to search Problem ticket count from elasticsearch processed indexes', () => {
        const getQueryString = apiUtil.selfServiceElasticSearchQuery(testData["processed"]);
        cy.request({
            method: 'GET',
            url: url + apiRoutes['searchProblemTicket'] + getQueryString,
            headers: apiUtil.getHeaders(),
        }).then((res) => {
            cy.log(`Response from GET API : ${JSON.stringify(res.body)}`); 
            expect(res.status).to.eq(200);
        })
	})
	
	/**
	 * @route - api/get
	 * @description - Search Service Request count from elasticsearch processed indexes
	 * @response - Validating 200 response
	 */

    it('Verify that API is able to search Service Request count from elasticsearch processed indexes', () => {
        const getQueryString = apiUtil.selfServiceElasticSearchQuery(testData["processed"]);
        cy.request({
            method: 'GET',
            url: url + apiRoutes['searchServiceRequest'] + getQueryString,
            headers: apiUtil.getHeaders(),
        }).then((res) => {
            cy.log(`Response from GET API : ${JSON.stringify(res.body)}`); 
            expect(res.status).to.eq(200);
        })
	})
	
	/**
	 * @route - api/get
	 * @description - Search Change Request from elasticsearch processed indexes
	 * @response - Validating 200 response
	 */

    it('Verify that API is able to search Change Request from elasticsearch processed indexes ', () => {
		const getQueryString = apiUtil.selfServiceElasticSearchQuery(testData["processed"]);
        cy.request({
            method: 'GET',
            url: url + apiRoutes['searchChangeRequest'] + getQueryString,
            headers: apiUtil.getHeaders(),
        }).then((res) => {
            cy.log(`Response from GET API : ${JSON.stringify(res.body)}`); 
            expect(res.status).to.eq(200);
        })
	})
	
	 /**
	 * @route - api/get
	 * @description - Search Event count from elasticsearch processed indexes
	 * @response - Validating 200 response
	 */

    it('Verify that API is able to search Event count from elasticsearch processed indexes', () => {
        const getQueryString = apiUtil.selfServiceElasticSearchQuery(testData["processed"]);
        cy.request({
            method: 'GET',
            url: url + apiRoutes['searchEvent'] + getQueryString,
            headers: apiUtil.getHeaders(),
        }).then((res) => {
            cy.log(`Response from GET API : ${JSON.stringify(res.body)}`); 
            expect(res.status).to.eq(200);
        })
	})
	
	 /**
	 * @route - api/get
	 * @description - Search inventory count from elasticsearch processed indexes
	 * @response - Validating 200 response
	 */

    it('Verify that API is able to search inventory count from elasticsearch processed indexes', () => {
        const getQueryString = apiUtil.selfServiceElasticSearchQuery(testData["processed"]);
        cy.request({
            method: 'GET',
            url: url + apiRoutes['searchInventory'] + getQueryString,
            headers: apiUtil.getHeaders(),
        }).then((res) => {
            cy.log(`Response from GET API : ${JSON.stringify(res.body)}`); 
            expect(res.status).to.eq(200);
        })
	})

	  /**
	 * @route - api/get
	 * @description - Search CacfTickets count from elasticsearch processed indexes
	 * @response - Validating 200 response
	 */

    it('Verify that API is able to search CacfTickets count from elasticsearch processed indexes', () => {
        const getQueryString = apiUtil.selfServiceElasticSearchQuery(testData["processed"]);
        cy.request({
            method: 'GET',
            url: url + apiRoutes['searchCacfTickets'] + getQueryString,
            headers: apiUtil.getHeaders(),
        }).then((res) => {
            cy.log(`Response from GET API : ${JSON.stringify(res.body)}`); 
            expect(res.status).to.eq(200);
        })
	})
	
	/**
	 * @route - api/get
	 * @description - Search CacfServers count from elasticsearch processed indexes
	 * @response - Validating 200 response
	 */

    it('Verify that API is able to search CacfServers count from elasticsearch processed indexes', () => {
		const getQueryString = apiUtil.selfServiceElasticSearchQuery(testData["processed"],true);
        cy.request({
            method: 'GET',
            url: url + apiRoutes['searchCacfServers'] + getQueryString,
            headers: apiUtil.getHeaders(),
        }).then((res) => {
            cy.log(`Response from GET API : ${JSON.stringify(res.body)}`); 
            expect(res.status).to.eq(200);
        })
	})
	
	 /**
	 * @route - api/get
	 * @description - Search Lds count from elasticsearch processed indexes
	 * @response - Validating 200 response
	 */

    it('Verify that API is able to search Lds count from elasticsearch processed indexes', () => {
		const getQueryString = apiUtil.selfServiceElasticSearchQuery(testData["processed"],true);
        cy.request({
            method: 'GET',
            url: url + apiRoutes['searchLds'] + getQueryString,
            headers: apiUtil.getHeaders(),
        }).then((res) => {
            cy.log(`Response from GET API : ${JSON.stringify(res.body)}`); 
            expect(res.status).to.eq(200);
        })
	})
	
	/**
	 * @route - api/get
	 * @description - Search metrics count from elasticsearch processed indexes
	 * @response - Validating 200 response
	 */

    it('Verify that API is able to search metrics count from elasticsearch processed indexes', () => {
		const getQueryString = apiUtil.selfServiceElasticSearchQuery(testData["processed"]);
        cy.request({
            method: 'GET',
            url: url + apiRoutes['searchMetrics'] + getQueryString,
            headers: apiUtil.getHeaders(),
        }).then((res) => {
            cy.log(`Response from GET API : ${JSON.stringify(res.body)}`); 
            expect(res.status).to.eq(200);
        })
	})
	
	/**
	 * @route - api/get
	 * @description - Search Incident ticket count from elasticsearch aggregate indexes
	 * @response - Validating 200 response
	 */

    it('Verify that API is able to search Incident ticket count from elasticsearch aggregate indexes', () => {
        const getQueryString = apiUtil.selfServiceElasticSearchQuery(testData["aggregate"]);
        cy.request({
            method: 'GET',
            url: url + apiRoutes['searchIncidentTicket'] + getQueryString,
            headers: apiUtil.getHeaders(),
        }).then((res) => {
            cy.log(`Response from GET API : ${JSON.stringify(res.body)}`); 
            expect(res.status).to.eq(200);
        })
	})
	
	  /**
	 * @route - api/get
	 * @description - Search Problem ticket count from elasticsearch aggregate indexes
	 * @response - Validating 200 response
	 */

    it('Verify that API is able to search Problem ticket count from elasticsearch aggregate indexes', () => {
        const getQueryString = apiUtil.selfServiceElasticSearchQuery(testData["aggregate"]);
        cy.request({
            method: 'GET',
            url: url + apiRoutes['searchProblemTicket'] + getQueryString,
            headers: apiUtil.getHeaders(),
        }).then((res) => {
            cy.log(`Response from GET API : ${JSON.stringify(res.body)}`); 
            expect(res.status).to.eq(200);
        })
	})
	
	/**
	 * @route - api/get
	 * @description - Search Service Request count from elasticsearch aggregate indexes
	 * @response - Validating 200 response
	 */

    it('Verify that API is able to search Service Request count from elasticsearch aggregate indexes', () => {
        const getQueryString = apiUtil.selfServiceElasticSearchQuery(testData["aggregate"]);
        cy.request({
            method: 'GET',
            url: url + apiRoutes['searchServiceRequest'] + getQueryString,
            headers: apiUtil.getHeaders(),
        }).then((res) => {
            cy.log(`Response from GET API : ${JSON.stringify(res.body)}`); 
            expect(res.status).to.eq(200);
        })
	})
	
	/**
	 * @route - api/get
	 * @description - Search Change Request from elasticsearch aggregate indexes
	 * @response - Validating 200 response
	 */

    it('Verify that API is able to search Change Request from elasticsearch aggregate indexes ', () => {
		const getQueryString = apiUtil.selfServiceElasticSearchQuery(testData["aggregate"]);
        cy.request({
            method: 'GET',
            url: url + apiRoutes['searchChangeRequest'] + getQueryString,
            headers: apiUtil.getHeaders(),
        }).then((res) => {
            cy.log(`Response from GET API : ${JSON.stringify(res.body)}`); 
            expect(res.status).to.eq(200);
        })
	})
	
	 /**
	 * @route - api/get
	 * @description - Search Event count from elasticsearch aggregate indexes
	 * @response - Validating 200 response
	 */

    it('Verify that API is able to search Event count from elasticsearch aggregate indexes', () => {
        const getQueryString = apiUtil.selfServiceElasticSearchQuery(testData["aggregate"]);
        cy.request({
            method: 'GET',
            url: url + apiRoutes['searchEvent'] + getQueryString,
            headers: apiUtil.getHeaders(),
        }).then((res) => {
            cy.log(`Response from GET API : ${JSON.stringify(res.body)}`); 
            expect(res.status).to.eq(200);
        })
	})
	
	 /**
	 * @route - api/get
	 * @description - Search inventory count from elasticsearch aggregate indexes
	 * @response - Validating 200 response
	 */

    it('Verify that API is able to search inventory count from elasticsearch aggregate indexes', () => {
        const getQueryString = apiUtil.selfServiceElasticSearchQuery(testData["aggregate"]);
        cy.request({
            method: 'GET',
            url: url + apiRoutes['searchInventory'] + getQueryString,
            headers: apiUtil.getHeaders(),
        }).then((res) => {
            cy.log(`Response from GET API : ${JSON.stringify(res.body)}`); 
            expect(res.status).to.eq(200);
        })
	})

	  /**
	 * @route - api/get
	 * @description - Search CacfTickets count from elasticsearch aggregate indexes
	 * @response - Validating 200 response
	 */

    it('Verify that API is able to search CacfTickets count from elasticsearch aggregate indexes', () => {
        const getQueryString = apiUtil.selfServiceElasticSearchQuery(testData["aggregate"]);
        cy.request({
            method: 'GET',
            url: url + apiRoutes['searchCacfTickets'] + getQueryString,
            headers: apiUtil.getHeaders(),
        }).then((res) => {
            cy.log(`Response from GET API : ${JSON.stringify(res.body)}`); 
            expect(res.status).to.eq(200);
        })
	})
	
	/**
	 * @route - api/get
	 * @description - Search CacfServers count from elasticsearch aggregate indexes
	 * @response - Validating 200 response
	 */

    it('Verify that API is able to search CacfServers count from elasticsearch aggregate indexes', () => {
		const getQueryString = apiUtil.selfServiceElasticSearchQuery(testData["aggregate"],true);
        cy.request({
            method: 'GET',
            url: url + apiRoutes['searchCacfServers'] + getQueryString,
            headers: apiUtil.getHeaders(),
        }).then((res) => {
            cy.log(`Response from GET API : ${JSON.stringify(res.body)}`); 
            expect(res.status).to.eq(200);
        })
	})
	
	 /**
	 * @route - api/get
	 * @description - Search Lds count from elasticsearch aggregate indexes
	 * @response - Validating 200 response
	 */

    it('Verify that API is able to search Lds count from elasticsearch aggregate indexes', () => {
		const getQueryString = apiUtil.selfServiceElasticSearchQuery(testData["aggregate"],true);
        cy.request({
            method: 'GET',
            url: url + apiRoutes['searchLds'] + getQueryString,
            headers: apiUtil.getHeaders(),
        }).then((res) => {
            cy.log(`Response from GET API : ${JSON.stringify(res.body)}`); 
            expect(res.status).to.eq(200);
        })
	})
	
	/**
	 * @route - api/get
	 * @description - Search metrics count from elasticsearch aggregate indexes
	 * @response - Validating 200 response
	 */

    it('Verify that API is able to search metrics count from elasticsearch aggregate indexes', () => {
		const getQueryString = apiUtil.selfServiceElasticSearchQuery(testData["aggregate"]);
        cy.request({
            method: 'GET',
            url: url + apiRoutes['searchMetrics'] + getQueryString,
            headers: apiUtil.getHeaders(),
        }).then((res) => {
            cy.log(`Response from GET API : ${JSON.stringify(res.body)}`); 
            expect(res.status).to.eq(200);
        })
	})
	
	/**
	 * @route - api/get
	 * @description - api call is made to drag and drop the cards for specific user
	 * @response - Validating 200 response
	 */

	it('Verify that api is able to customize drag and drop the cards for specific user', () => {
        const template = handlebars.compile(JSON.stringify(postData[apiRoutes.customization]));
        const context = {
			tenantId: tenantId,
			user: user,
			show: true,
			Alert: 3,
			Health: 2
		}
		// Below request is to hide the health card and check the response
		cy.request({
			method: 'POST',
			url: url + apiRoutes['customization'],
			headers: apiUtil.getHeaders(),
			body : template(context)
		}).then((res) => {
			cy.log(`Response from POST API : ${JSON.stringify(res.body)}`); 
			expect(res.status).to.eq(200);
			expect(res.body.MESSAGE).to.eq('Success');
			cy.request({
				method: 'GET',
				url: url + apiRoutes['fetchCardDetails'] + tenantId,
				headers: apiUtil.getHeaders(),
			}).then((res) => {
				cy.log(`Response from GET API : ${JSON.stringify(res.body)}`); 
				expect(res.status).to.eq(200);
				var alertGroupOrder = res.body.groups.find((data)=>data.groupId === 2).groupOrder;
				var healthGroupOrder = res.body.groups.find((data)=>data.groupId === 21).groupOrder;
				expect(alertGroupOrder).to.eq(3);
				expect(healthGroupOrder).to.eq(2);
				cy.request({
					method: 'POST',
					url: url + apiRoutes['customization'],
					headers: apiUtil.getHeaders(),
					body : template({...context,Alert:2 ,Health:3})
				}).then((res) => {
					expect(res.status).to.eq(200);
					cy.request({
						method: 'GET',
						url: url + apiRoutes['fetchCardDetails'] + tenantId,
						headers: apiUtil.getHeaders(),
					}).then((res) => {
						var alertGroupOrder = res.body.groups.find((data)=>data.groupId === 2).groupOrder;
						var healthGroupOrder = res.body.groups.find((data)=>data.groupId === 21).groupOrder;
						expect(alertGroupOrder).to.eq(2);
						expect(healthGroupOrder).to.eq(3);
					})
				})
			})
		})
	})

	/**
	 * @route - api/post
	 * @description - API should throw 401 on trying to modify the user customization with incorrect tenant ID
	 * @response - Validating 401 response 
	 */

    it('verify that API throws 401 on modifying the user customization with incorrect tenantID', () => {
		const template = handlebars.compile(JSON.stringify(postData[apiRoutes.customization]));
        const context = {
			tenantId: randomTenantID,
			user: user,
			show: true
		}
		cy.request({
			method: 'POST',
			url: url + apiRoutes['customization'],
			headers: apiUtil.getHeaders(),
			body : template(context),
			failOnStatusCode: false
		}).then((res) => {
			expect(res.status).to.eq(401);
		})
	})
	
	/**
	 * @route - api/post
	 * @description - api call should throw 400 when request body is not passed.
	 * @response - Validating 400 response 
	 */

    it('Verify that api throws 400 response when no data passed on the request body for user customization', () => {
		cy.request({
			method: 'POST',
			url: url + apiRoutes['customization'],
			headers: apiUtil.getHeaders(),
			failOnStatusCode: false
		}).then((res) => {
			expect(res.status).to.eq(400);
		})
	})
	
	it.only('Verify that Self service file download is working', () => {
		cy.request({
			method: 'POST',
			url: "https://itoa0922-api.multicloud-ibm.com/api/v1/aiops/selfservice/ingestData/inventory",
		//	headers: {...apiUtil.getHeaders(),"Content-Type": "multipart/form-data"},
			headers: {...apiUtil.getHeaders(),"Content-Type": "text/csv","Content-Disposition": "form-data"},
		//	filename="Self_ServiceFile_Event.csv"
			body:'./Self_ServiceFile_Inventory.csv'
		}).then((res) => {
			expect(res.status).to.eq(400);
		})
    })
	

  })  
});