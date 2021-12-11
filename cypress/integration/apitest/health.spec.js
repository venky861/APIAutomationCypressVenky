/// <reference types="Cypress" />

const postData = require('../../fixtures/Health/post.json')
const handlebars = require('handlebars')
const apiUtil = require('../../helpers/apiUtil.js')
const apiRoutes = require('../../fixtures/Health/apiRoutes.json')
const tenantId = Cypress.env('tenantId')
const user = Cypress.env('username')
const url = Cypress.env('url')
const tenantEditionArray =  ["internal", "community", "platform", "essentials", "premium", "try_and_buy", "entry", "standard", "enterprise", "enterprise_plus"]
const pageSize = 50
const TestFilters = require('../../support/filterTests.js')
const testData = require('../../fixtures/Dashboard/testData.json')
const dashboardApiRoutes = require('../../fixtures/Dashboard/apiRoutes.json')

TestFilters(['Smoke'], () => { 
    describe('Health functionality tests', () => {
        
	/**
	 * @route - api/post
	 * @description - Fetches application with most incidents counts from top insights 
	 * @response - Validating 200 response 
     * 	 */
    it('Verify that API returns application with most incidents counts from top insights', () => {
        cy.request({
            method: 'POST',
            url: url + apiRoutes['appTopInsightMostIncidents'],
            headers: apiUtil.getHeaders(),
            body : postData[apiRoutes.appTopInsightMostIncidents]
        }).then((res) => {
            cy.log(`Response from GET API : ${JSON.stringify(res.body)}`); 
            expect(res.status).to.eq(200);
        })
    })

    /**
	 * @route - api/post
	 * @description - Fetches application with most incidents counts from top insights 
	 * @response - Validating 200 response and success message
     * 	 */
     it('Verify that API returns application with most incidents counts from top insights and validate success message', () => {
        cy.request({
            method: 'POST',
            url: url + apiRoutes['appTopInsightMostIncidents'],
            headers: apiUtil.getHeaders(),
            body : postData[apiRoutes.appTopInsightMostIncidents]
        }).then((res) => {
            cy.log(`Response from GET API : ${JSON.stringify(res.body)}`); 
            expect(res.body.summary.status_code).to.eq('200');
            expect(res.body.summary.status_message).to.eq("Success");
            var applications = res.body.applications;
            if(applications.length != 0){
                applications.forEach((index)=>{
                     expect(index.value > 0).to.be.true
                     expect(isNaN(index.value)).to.be.false
                  })
            }
        })
    })

    
    /**
	 * @route - api/post
	 * @description - Fetches application with most incidents counts from top insights 
	 * @response - Validating 200 response and application array values
     * 	 */
     it('Verify that API returns application with most incidents counts from top insights and validate application array values', () => {
        cy.request({
            method: 'POST',
            url: url + apiRoutes['appTopInsightMostIncidents'],
            headers: apiUtil.getHeaders(),
            body : postData[apiRoutes.appTopInsightMostIncidents]
        }).then((res) => {
            cy.log(`Response from GET API : ${JSON.stringify(res.body)}`); 
            expect(res.status).to.eq(200);
            var applications = res.body.applications;
            if(applications.length != 0){
                applications.forEach((index)=>{
                     expect(index.value > 0).to.be.true
                     expect(isNaN(index.value)).to.be.false
                  })
            }
        })
    })

    
    /**
	 * @route - api/post
	 * @description - Fetches application with high priority incidents count from top insights
	 * @response - Validating 200 response 
     **/
    it('Verify that API returns application with high priority incidents count from top insights', () => {
        cy.request({
            method: 'POST',
            url: url + apiRoutes['appTopInsightHighPriorityIncidents'],
            headers: apiUtil.getHeaders(),
            body : postData[apiRoutes.appTopInsightMostIncidents]
        }).then((res) => {
            cy.log(`Response from GET API : ${JSON.stringify(res.body)}`); 
            expect(res.status).to.eq(200);   
        })
    })

    /**
	 * @route - api/post
	 * @description - Fetches application with high priority incidents count from top insights
	 * @response - Validating 200 response and success message
     * 	 */
     it('Verify that API returns application with high priority incidents count from top insights and validate success message', () => {
        cy.request({
            method: 'POST',
            url: url + apiRoutes['appTopInsightHighPriorityIncidents'],
            headers: apiUtil.getHeaders(),
            body : postData[apiRoutes.appTopInsightMostIncidents]
        }).then((res) => {
            cy.log(`Response from GET API : ${JSON.stringify(res.body)}`); 
            expect(res.body.summary.status_code).to.eq('200');
            expect(res.body.summary.status_message).to.eq("Success");
        })
    })

     /**
	 * @route - api/post
	 * @description - Fetches application with high priority incidents count from top insights
	 * @response - Validating 200 response and application array values
     * 	 */
      it('Verify that API returns application with high priority incidents count from top insights and validate application values', () => {
        cy.request({
            method: 'POST',
            url: url + apiRoutes['appTopInsightHighPriorityIncidents'],
            headers: apiUtil.getHeaders(),
            body : postData[apiRoutes.appTopInsightMostIncidents]
        }).then((res) => {
            cy.log(`Response from GET API : ${JSON.stringify(res.body)}`); 
            expect(res.status).to.eq(200);
            var applications = res.body.applications;
            if(applications.length != 0){
                applications.forEach((index)=>{
                     expect(index.value > 0).to.be.true
                     expect(isNaN(index.value)).to.be.false
                  })
            }
        })
    })

    /**
	 * @route - api/post
	 * @description - Fetches resources which are least healthy count from top insights
	 * @response - Validating 200 response and application array values
     * 	 */
    it('Verify that API returns resources which are least healthy count from top insights and validate 200 response code', () => {
        cy.request({
            method: 'POST',
            url: url + apiRoutes['resTopInsightLeastHealthy'],
            headers: apiUtil.getHeaders(),
            body : postData[apiRoutes.appTopInsightMostIncidents]
        }).then((res) => {
            cy.log(`Response from GET API : ${JSON.stringify(res.body)}`); 
            expect(res.status).to.eq(200);
        })
    })

    /**
	 * @route - api/post
	 * @description - Fetches resources which are least healthy count from top insights
	 * @response - Validating 200 response and application array values
     * 	 */
     it('Verify that API returns resources which are least healthy count from top insights and validate success message', () => {
        cy.request({
            method: 'POST',
            url: url + apiRoutes['resTopInsightLeastHealthy'],
            headers: apiUtil.getHeaders(),
            body : postData[apiRoutes.appTopInsightMostIncidents]
        }).then((res) => {
            cy.log(`Response from GET API : ${JSON.stringify(res.body)}`); 
            expect(res.body.summary.status_code).to.eq('200');
            expect(res.body.summary.status_message).to.eq("Success");
        })
    })

    /**
	 * @route - api/post
	 * @description - Fetches resources which are least healthy count from top insights
	 * @response - Validating 200 response and resource array values
     * 	 */
    it('Verify that API returns resources which are least healthy count from top insights and validate resource array values', () => {
        cy.request({
            method: 'POST',
            url: url + apiRoutes['resTopInsightLeastHealthy'],
            headers: apiUtil.getHeaders(),
            body : postData[apiRoutes.appTopInsightMostIncidents]
        }).then((res) => {
            cy.log(`Response from GET API : ${JSON.stringify(res.body)}`); 
            expect(res.status).to.eq(200);
            var resources = res.body.resources;
            if(resources.length != 0){
                resources.forEach((index)=>{
                    expect(index.value > 0).to.be.true
                    expect(isNaN(index.value)).to.be.false
                })
            }
        })
    })


    /**
	 * @route - api/post
	 * @description - Fetches resources with most incidents count from top insights
	 * @response - Validating 200 response and resource array values
     * 	 */
    it('Verify that API returns resources with most incidents count from top insights', () => {
        cy.request({
            method: 'POST',
            url: url + apiRoutes['resTopInsightMostIncidents'],
            headers: apiUtil.getHeaders(),
            body : postData[apiRoutes.appTopInsightMostIncidents]
        }).then((res) => {
            cy.log(`Response from GET API : ${JSON.stringify(res.body)}`); 
            expect(res.status).to.eq(200);
            expect(res.body.summary.status_code).to.eq('200');
            expect(res.body.summary.status_message).to.eq("Success");
            var resources = res.body.resources;
            if(resources.length != 0){
                resources.forEach((index)=>{
                     expect(index.value > 0).to.be.true
                     expect(isNaN(index.value)).to.be.false
                  })
            }
        })
    })

    /**
	 * @route - api/post
	 * @description - Fetches resources with most incidents count from top insights
	 * @response - Validating 200 response
     * 	 */
     it('Verify that API returns resources with most incidents count from top insights', () => {
        cy.request({
            method: 'POST',
            url: url + apiRoutes['resTopInsightMostIncidents'],
            headers: apiUtil.getHeaders(),
            body : postData[apiRoutes.appTopInsightMostIncidents]
        }).then((res) => {
            cy.log(`Response from GET API : ${JSON.stringify(res.body)}`); 
            expect(res.status).to.eq(200);
        })
    })

    /**
	 * @route - api/post
	 * @description - Fetches resources with most incidents count from top insights
	 * @response - Validating 200 response and success message
     * 	 */
     it('Verify that API returns resources with most incidents count from top insights and validate success message', () => {
        cy.request({
            method: 'POST',
            url: url + apiRoutes['resTopInsightMostIncidents'],
            headers: apiUtil.getHeaders(),
            body : postData[apiRoutes.appTopInsightMostIncidents]
        }).then((res) => {
            cy.log(`Response from GET API : ${JSON.stringify(res.body)}`); 
            expect(res.body.summary.status_code).to.eq('200');
            expect(res.body.summary.status_message).to.eq("Success");
        })
    })

    /**
	 * @route - api/post
	 * @description - Fetches resources with most incidents count from top insights
	 * @response - Validating 200 response and validate resource array values
     * 	 */
     it('Verify that API returns resources with most incidents count from top insights and validate resource array values', () => {
        cy.request({
            method: 'POST',
            url: url + apiRoutes['resTopInsightMostIncidents'],
            headers: apiUtil.getHeaders(),
            body : postData[apiRoutes.appTopInsightMostIncidents]
        }).then((res) => {
            cy.log(`Response from GET API : ${JSON.stringify(res.body)}`); 
            expect(res.status).to.eq(200);
            var resources = res.body.resources;
            if(resources.length != 0){
                resources.forEach((index)=>{
                     expect(index.value > 0).to.be.true
                     expect(isNaN(index.value)).to.be.false
                  })
            }
        })
    })

    /**
	 * @route - api/get
	 * @description - Fetches  tenant edition details
	 * @response - Validating 200 response and tenant edition
     * 	 */
    it('Verify that API returns tenant edition details and validate the edition', () => {
        cy.request({
            method: 'GET',
            url : url + apiRoutes['getTenantEdition'],
            headers: apiUtil.getHeaders(),
        }).then((res) => {
            cy.log(JSON.stringify(res))
            expect(res.status).to.eq(200);
            expect(res.body.health_core_tenant.edition).to.be.oneOf(tenantEditionArray)
        })
    })  

    /**
	 * @route - api/post
	 * @description - Fetches deleted resource list
	 * @response - Validating 200 response
     * 	 */
    it('Verify that API returns deleted resource list and validate 200 response code', () => {
        cy.request({
            method: 'POST',
            url : url + apiRoutes['fetchDeletedResourceList'],
            headers: apiUtil.getHeaders(),
            body : postData[apiRoutes.fetchDeletedResourceList]
        }).then((res) => {
            cy.log(JSON.stringify(res))
            expect(res.status).to.eq(200);
        }) 
    })

    /**
	 * @route - api/post
	 * @description - Fetches deleted resource list
	 * @response - Validating success message and success code
     * 	 */
     it('Verify that API returns deleted resource list and validate success message', () => {
        cy.request({
            method: 'POST',
            url : url + apiRoutes['fetchDeletedResourceList'],
            headers: apiUtil.getHeaders(),
            body : postData[apiRoutes.fetchDeletedResourceList]
        }).then((res) => {
            cy.log(JSON.stringify(res))
            expect(res.body.summary.status_code).to.eq('200')
            expect(res.body.summary.status_message).to.eq('Success')
        })
    }) 

    /**
	 * @route - api/post
	 * @description - Fetches deleted resource list
	 * @response - Validating resource array size
     * 	 */
     it('Verify that API returns deleted resource list and validate resource array size', () => {
        cy.request({
            method: 'POST',
            url : url + apiRoutes['fetchDeletedResourceList'],
            headers: apiUtil.getHeaders(),
            body : postData[apiRoutes.fetchDeletedResourceList]
        }).then((res) => {
            cy.log(JSON.stringify(res))
            expect(res.status).to.eq(200);
            if(res.body.summary.total_count > pageSize){
                expect(res.body.resources.length).to.eq(pageSize)
            }
            else{
                expect(res.body.resources.length).to.eq(res.body.summary.total_count)
            }
        })
    })
    
     /**
	 * @route - api/post
	 * @description - Fetch application with most incidents counts from top insights API returns 401 with incorrect headers
	 * @response - Validating 401 response
     * 	 */
      it('AppTopInsightMostIncidents : Verify that API returns 401 when incorrect header is passed', () => {
        cy.request({
            method: 'POST',
            url: url + apiRoutes['appTopInsightMostIncidents'],
            headers: {...apiUtil.getHeaders(), 'Apikey': testData["randomApiKey"]},
            body : postData[apiRoutes.appTopInsightMostIncidents],
			failOnStatusCode: false
        }).then((res) => {
            expect(res.status).to.eq(401);
		  })
    })
	
	
	/**
	 * @route - api/post
	 * @description - Fetch application with high priority incidents count from top insights API returns 401 with incorrect headers
	 * @response - Validating 401 response
     * 	 */
     it('AppTopInsightHighPriorityIncidents : Verify that API returns 401 when incorrect headers are passed', () => {
        cy.request({
            method: 'POST',
            url: url + apiRoutes['appTopInsightHighPriorityIncidents'],
            headers:{...apiUtil.getHeaders(), 'Apikey': testData["randomApiKey"]},
            body : postData[apiRoutes.appTopInsightMostIncidents],
			failOnStatusCode: false
        }).then((res) => {
            expect(res.status).to.eq(401);
        })
    })
	
	/**
	 * @route - api/post
	 * @description - Fetch resources with most incidents count from top insights API returns 401 with incorrect headers
	 * @response - Validating 401 response 
     * 	 */
     it('ResTopInsightMostIncidents : Verify that API returns 401 when incorrect headers are passed', () => {
        cy.request({
            method: 'POST',
            url: url + apiRoutes['resTopInsightMostIncidents'],
            headers: {...apiUtil.getHeaders(), 'Apikey': testData["randomApiKey"]},
            body : postData[apiRoutes.appTopInsightMostIncidents],
			failOnStatusCode: false
        }).then((res) => {
            expect(res.status).to.eq(401);
        })
    })
	
    /**
	 * @route - api/post
	 * @description - Fetches deleted resource list APi fails with 401 when incorrect headers are passed
	 * @response - Validating 401 code
     * 	 */
     it('Verify that fetch deleted resource list API returns 401 when incorrect headeris passed', () => {
        cy.request({
            method: 'POST',
            url : url + apiRoutes['fetchDeletedResourceList'],
            headers: {...apiUtil.getHeaders(), 'Apikey': testData["randomApiKey"]},
            body : postData[apiRoutes.fetchDeletedResourceList],
            failOnStatusCode: false
        }).then((res) => {
            expect(res.status).to.eq(401);
        })
	}) 
	
	 /**
	 * @route - api/post
	 * @description - Fetches deleted resource list APi fails with 401 when incorrect headers are passed
	 * @response - Validating 401 code
     * 	 */
	it('Verify that health page application count matches with dashboard apps', () => {
        cy.request({
            method: 'POST',
            url : url + apiRoutes['fetchDeletedResourceList'],
            headers: {...apiUtil.getHeaders(), 'Apikey': testData["randomApiKey"]},
            body : postData[apiRoutes.fetchDeletedResourceList],
            failOnStatusCode: false
        }).then((res) => {
            expect(res.status).to.eq(401);
        })
	}) 
	
	 /**
	 * @route - api/post
	 * @description - Fetches deleted resource list APi fails with 401 when incorrect headers are passed
	 * @response - Validating 401 code
     * 	 */
	it('Verify that health status of the application', () => {
        cy.request({
            method: 'POST',
            url : url + apiRoutes['healthStatus'],
            headers: apiUtil.getHeaders(),
            body : postData[apiRoutes.healthStatus],
        }).then((res) => {
			expect(res.status).to.eq(200);
			cy.log(
				'critical',res.body.health_status.critical,
				'warning',res.body.health_status.warning,
				'health',res.body.health_status.healthy
			)
				cy.request({
					method: 'GET',
					url : url + dashboardApiRoutes['healthData'] + tenantId,
					headers: apiUtil.getHeaders(),
				}).then((res) => {
					cy.log('----------------------')
					cy.log('data',JSON.stringify(res.body.MESSAGE.convergedHealth.total))
					expect(res.status).to.eq(200);
					
				})
        })
	}) 
	
	it.only("Verify that fetch resource resource metrics list and verify success message", () => {
        const urlTemplate = handlebars.compile(
          JSON.stringify(apiRoutes["fetchResourceMetricsList"])
        );
        //Fetch resource list to fetch the correlation id
        cy.request({
          method: "POST",
          url: url + apiRoutes["fetchResourceList"],
          headers: {...apiUtil.getHeaders()},
          body: postData[apiRoutes.fetchDeletedResourceList],
        }).then((res) => {
          expect(res.status).to.eq(200);
          let resourceList = res.body.resources;
          let correlationID = resourceList[0].correlationId.replace(/\//g, "%2F" );
          const context = { correlationId: correlationID, };
          // Fetch the resource metrics list
          cy.request({
            method: "GET",
            url: url + urlTemplate(context).replace(new RegExp('"', "g"), ""),
            headers: {...apiUtil.getHeaders() },
          }).then((res) => {
            expect(res.status).to.eq(200);
            expect(res.body.summary.status_code).to.eq("200");
            expect(res.body.summary.status_message).to.eq("Success");
          });
        });
      });

      /**
       * @route - api/get
       * @description - To fetch resource metrics list
       * @response - Validating metrics array is empty or not
       *   */
      it.only("Verify that fetch resource resource metrics list and verify if list is empty or not", () => {
        const urlTemplate = handlebars.compile(JSON.stringify(apiRoutes["fetchResourceMetricsList"]));
        //Fetch resource list to fetch the correlation id
        cy.request({
          method: "POST",
          url: url + apiRoutes["fetchResourceList"],
          headers: {...apiUtil.getHeaders() },
          body: postData[apiRoutes.fetchDeletedResourceList],
        }).then((res) => {
          expect(res.status).to.eq(200);
          let resourceList = res.body.resources;
          let correlationID = resourceList[0].correlationId.replace( /\//g,"%2F");
          const context = { correlationId: correlationID,};
          // Fetch the resource metrics list
          cy.request({
            method: "GET",
            url: url + urlTemplate(context).replace(new RegExp('"', "g"), ""),
            headers: { ...apiUtil.getHeaders()},
          }).then((res) => {
            expect(res.status).to.eq(200);
            if (res.body.metrics.length != 0) {
              expect(res.body.metrics.length > 0).to.be.true;
              res.body.metrics.forEach((index) => {
                expect(isNaN(index.value)).to.be.true;
              });
            } else {
              cy.log("Metrics array is empty for correlation ID : " + resourceList[0].correlationId );
            }
          });
        });
      });

  })
});