let x = {
	"tenantId": "613ecc8d1502627c4e509e3a",
	"user": "613ee81b22c8d352c303b8fb",
	"groups": [
	  {
		"groupId": 1,
		"leftNavigation": false,
		"parentId": 1,
		"groupOrder": null,
		"groupShow": true,
		"cards": [
		  {
			"cardId": 1,
			"parentId": 1,
			"cardShow": true,
			"cardData": {
			  "title": "site.card.cssr.sunriseReport.title",
			  "subtitle": "",
			  "image": "",
			  "leftNavigation": true,
			  "leftNavigationUrl": "/client/daily-sunrise-report",
			  "leftNavigationOrder": 1,
			  "customizationLock": true,
			  "tooltip": {
				"enable": false,
				"text": ""
			  },
			  "data": {
				"change": {
				  "dataCenter": {
					"CRS_CREATED_EMERGENCY": 0,
					"CRS_CREATED_EXPEDITED": 0,
					"CRS_IMPL_EMERGENCY": 0,
					"CRS_IMPL_EXPEDITED": 0
				  },
				  "total": {
					"CRS_CREATED_EMERGENCY": 0,
					"CRS_CREATED_EXPEDITED": 0,
					"CRS_IMPL_EMERGENCY": 0,
					"CRS_IMPL_EXPEDITED": 0
				  }
				},
				"lastUpdatedFromTime": "2021-11-24T06:30:00.000Z",
				"lastUpdatedToTime": "2021-11-25T06:30:00.000Z",
				"snapshotDate": "2021-11-25",
				"elasticUserAuth": true
			  },
			  "titleSubText": ""
			}
		  }
		]
	  },
	  {
		"groupId": 2,
		"leftNavigation": false,
		"parentId": 2,
		"groupOrder": null,
		"groupShow": true,
		"cards": [
		  {
			"cardId": 2,
			"parentId": 2,
			"cardShow": true,
			"cardData": {
			  "title": "site.card.cssr.alert.title",
			  "subtitle": "",
			  "image": "assets/imgs/alert.svg",
			  "leftNavigation": true,
			  "leftNavigationUrl": "/client/cloud-health",
			  "leftNavigationOrder": 1,
			  "customizationLock": true,
			  "tooltip": {
				"enable": false,
				"text": ""
			  },
			  "data": {
				"convergedAlert": {
				  "dataCenter": [],
				  "multiCloud": []
				}
			  },
			  "titleSubText": "site.card.cssr.cloudHealth.dataCenter"
			}
		  }
		]
	  },
	  {
		"groupId": 21,
		"leftNavigation": false,
		"parentId": 21,
		"groupOrder": 3,
		"groupShow": true,
		"cards": [
		  {
			"cardId": 21,
			"parentId": 21,
			"cardShow": true,
			"cardData": {
			  "title": "site.card.cssr.cloudHealth.title",
			  "titleSubText": "site.card.cssr.cloudHealth.dataCenterCloud",
			  "subtitle": "site.card.cssr.cloudHealth.businessApplication",
			  "image": "assets/imgs/appHealth.svg",
			  "leftNavigation": true,
			  "leftNavigationUrl": "/client/health",
			  "leftNavigationOrder": 2,
			  "customizationLock": false,
			  "tooltip": {
				"enable": true,
				"text": "site.card.cssr.cloudHealth.tooltip"
			  },
			  "data": {
				"convergedHealth": {
				  "dataCenter": {
					"critical": 0,
					"warning": 0,
					"healthy": 0,
					"inMaintenance": 0,
					"total": 0
				  },
				  "multiCloud": {
					"critical": 0,
					"warning": 0,
					"healthy": 0,
					"inMaintenance": 0,
					"total": 0
				  },
				  "total": {
					"critical": 0,
					"warning": 0,
					"healthy": 78,
					"inMaintenance": 0,
					"total": 78
				  }
				},
				"convergedOpenTicket": {
				  "dataCenter": {
					"high": 187,
					"medium": 110,
					"low": 7,
					"total": 304
				  },
				  "multiCloud": {
					"high": 0,
					"medium": 0,
					"low": 0,
					"total": 0
				  },
				  "total": {
					"high": 187,
					"medium": 110,
					"low": 7,
					"total": 304
				  }
				}
			  }
			}
		  }
		]
	  },
	  {
		"groupId": 20,
		"leftNavigation": false,
		"parentId": 20,
		"groupOrder": 4,
		"groupShow": true,
		"cards": [
		  {
			"cardId": 20,
			"parentId": 20,
			"cardShow": true,
			"cardData": {
			  "title": "site.card.cssr.cloudInventory.title",
			  "subtitle": "site.card.cssr.cloudInventory.resourcesByProvider",
			  "image": "assets/imgs/appHealth.svg",
			  "leftNavigation": true,
			  "leftNavigationUrl": "/client/inventory",
			  "leftNavigationOrder": 3,
			  "customizationLock": false,
			  "tooltip": {
				"enable": false,
				"text": "site.card.cssr.incidentManagement.tooltip"
			  },
			  "data": {
				"convergedInventory": {
				  "dataCenter": [
					{
					  "key": "IBM DC",
					  "doc_count": 1
					}
				  ],
				  "multiCloud": [
					{
					  "key": "AWS",
					  "doc_count": 574
					},
					{
					  "key": "Azure",
					  "doc_count": 250
					},
					{
					  "key": "IBMCloud",
					  "doc_count": 130
					},
					{
					  "key": "DemoCloud",
					  "doc_count": 102
					}
				  ]
				}
			  },
			  "titleSubText": "site.card.cssr.cloudHealth.dataCenterCloud"
			}
		  }
		]
	  },
	  {
		"groupId": 22,
		"leftNavigation": false,
		"parentId": 22,
		"groupOrder": 5,
		"groupShow": true,
		"cards": [
		  {
			"cardId": 22,
			"parentId": 22,
			"cardShow": true,
			"cardData": {
			  "title": "site.card.cssr.actionableInsights.title",
			  "titleSubText": "site.card.cssr.cloudHealth.dataCenter",
			  "subtitle": "",
			  "image": "assets/imgs/alert.svg",
			  "leftNavigation": true,
			  "leftNavigationUrl": "/client/actionable-insights",
			  "leftNavigationOrder": 2,
			  "customizationLock": false,
			  "tooltip": {
				"enable": false,
				"text": ""
			  },
			  "data": {
				"actionableInsights": [
				  {
					"title": "Top devices, with the most incident tickets, account for 840 tickets.",
					"alertColor": "red",
					"snapshotDate": "2021-11-24T00:00:00.000Z",
					"insightId": 1,
					"insightTitle": "Devices with the most incident tickets",
					"timestamp": "2021-11-01T00:00:00.000Z"
				  },
				  {
					"title": "Top business applications, with the most incident tickets, account for 1222 tickets",
					"alertColor": "red",
					"snapshotDate": "2021-11-24T00:00:00.000Z",
					"insightId": 2,
					"insightTitle": "Top business applications with the most incident tickets",
					"timestamp": "2021-11-01T00:00:00.000Z"
				  },
				  {
					"title": "Top office locations of devices, with the most incidents, account for 1355 tickets",
					"alertColor": "red",
					"snapshotDate": "2021-11-24T00:00:00.000Z",
					"insightId": 3,
					"insightTitle": "Office locations of devices with the most incidents",
					"timestamp": "2021-11-01T00:00:00.000Z"
				  },
				  {
					"title": "Top devices, with the most disk or swap space related incident tickets, account for 314 tickets.",
					"alertColor": "red",
					"snapshotDate": "2021-11-24T00:00:00.000Z",
					"insightId": 4,
					"insightTitle": "Devices with the most disk or swap space related incident tickets",
					"timestamp": "2021-11-01T00:00:00.000Z"
				  },
				  {
					"title": "Top devices, with the most auto-resolved incident tickets, account for 760 tickets.",
					"alertColor": "red",
					"snapshotDate": "2021-11-24T00:00:00.000Z",
					"insightId": 9,
					"insightTitle": "Devices with the most auto-resolved incident tickets",
					"timestamp": "2021-11-01T00:00:00.000Z"
				  },
				  {
					"title": "Top change groups, with the most change tickets, account for 195 tickets",
					"alertColor": "red",
					"snapshotDate": "2021-11-24T00:00:00.000Z",
					"insightId": 10,
					"insightTitle": "Change groups with the most changes",
					"timestamp": "2021-11-01T00:00:00.000Z"
				  },
				  {
					"title": "122 tickets are not flowing into the automation engine",
					"alertColor": "red",
					"snapshotDate": "2021-11-24T00:00:00.000Z",
					"insightId": 14,
					"insightTitle": "Enable all events/tickets flow into the automation engine",
					"timestamp": "2021-11-01T00:00:00.000Z"
				  },
				  {
					"title": "37 tickets can be resolved by adjusting the automation matcher",
					"alertColor": "red",
					"snapshotDate": "2021-11-24T00:00:00.000Z",
					"insightId": 16,
					"insightTitle": "Reduce automated escalated tickets by updating matcher processes (adjust automation matcher)",
					"timestamp": "2021-11-01T00:00:00.000Z"
				  },
				  {
					"title": "75 tickets have diagnostics performed. Convert diagnostic tickets to auto resolved tickets",
					"alertColor": "red",
					"snapshotDate": "2021-11-24T00:00:00.000Z",
					"insightId": 17,
					"insightTitle": "Reduce diagnostic tickets",
					"timestamp": "2021-11-01T00:00:00.000Z"
				  },
				  {
					"title": "2 tickets have automation connection failures that needs to be fixed",
					"alertColor": "red",
					"snapshotDate": "2021-11-24T00:00:00.000Z",
					"insightId": 18,
					"insightTitle": "Reduce automation connection failures",
					"timestamp": "2021-11-01T00:00:00.000Z"
				  },
				  {
					"title": "1 tickets can be auto-resolved if Netcool Resolve on Clear(RoC) is enabled",
					"alertColor": "red",
					"snapshotDate": "2021-11-24T00:00:00.000Z",
					"insightId": 19,
					"insightTitle": "Enable Resolve on Clear (RoC) in Netcool",
					"timestamp": "2021-11-01T00:00:00.000Z"
				  },
				  {
					"title": "Top devices, with the most database issues, account for 173 tickets.",
					"alertColor": "red",
					"snapshotDate": "2021-11-24T00:00:00.000Z",
					"insightId": 23,
					"insightTitle": "Devices with the most database issues",
					"timestamp": "2021-11-01T00:00:00.000Z"
				  },
				  {
					"title": "Top event situations, that are not automated (Console only), account for 1813 events",
					"alertColor": "red",
					"snapshotDate": "2021-11-24T00:00:00.000Z",
					"insightId": 25,
					"insightTitle": "Events not automated (Console only)",
					"timestamp": "2021-11-01T00:00:00.000Z"
				  },
				  {
					"title": "Top event situations, that are ticketed without automation requests, account for 723 events",
					"alertColor": "red",
					"snapshotDate": "2021-11-24T00:00:00.000Z",
					"insightId": 26,
					"insightTitle": "Events ticketed without automation requests",
					"timestamp": "2021-11-01T00:00:00.000Z"
				  },
				  {
					"title": "Top automation playbooks resolving incident tickets account for 587 tickets",
					"alertColor": "red",
					"snapshotDate": "2021-11-24T00:00:00.000Z",
					"insightId": 30,
					"insightTitle": "Automata resolving incident tickets",
					"timestamp": "2021-11-01T00:00:00.000Z"
				  },
				  {
					"title": "Top automation playbooks with further opportunity in resolving tickets account for 660 tickets",
					"alertColor": "red",
					"snapshotDate": "2021-11-24T00:00:00.000Z",
					"insightId": 31,
					"insightTitle": "Automata with opportunity",
					"timestamp": "2021-11-01T00:00:00.000Z"
				  },
				  {
					"title": "Top devices with high probability of CPU related outages/failures",
					"alertColor": "red",
					"snapshotDate": "2021-11-24T00:00:00.000Z",
					"insightId": 32,
					"insightTitle": "Top devices with high probability of CPU related outages/failures",
					"timestamp": "2021-11-01T00:00:00.000Z"
				  },
				  {
					"title": "Top devices with high probability of MEMORY related outages/failures",
					"alertColor": "red",
					"snapshotDate": "2021-11-24T00:00:00.000Z",
					"insightId": 33,
					"insightTitle": "Top devices with high probability of MEMORY related outages/failures",
					"timestamp": "2021-11-01T00:00:00.000Z"
				  }
				],
				"lastUpdatedTime": "2021-11-24T00:00:00.000Z",
				"maxMonth": "2021-11-01T00:00:00.000Z",
				"elasticUserAuth": true
			  }
			}
		  }
		]
	  },
	  {
		"groupId": 23,
		"leftNavigation": false,
		"parentId": 23,
		"groupOrder": 6,
		"groupShow": true,
		"cards": [
		  {
			"cardId": 23,
			"parentId": 23,
			"cardShow": true,
			"cardData": {
			  "title": "site.card.cssr.deliveryInsights.title",
			  "titleSubText": "site.card.cssr.cloudHealth.dataCenter",
			  "subtitle": "",
			  "image": "",
			  "leftNavigation": true,
			  "leftNavigationUrl": "/client/delivery-insights",
			  "leftNavigationOrder": 2,
			  "customizationLock": false,
			  "pairedKeys": [],
			  "headers": [],
			  "params": [],
			  "tooltip": {
				"enable": false,
				"text": ""
			  },
			  "data": {
				"deliveryInsights": [
				  {
					"insightTitle": "Automation Baseline Reconciliation Analysis",
					"lastUpdatedTime": "",
					"maxMonth": ""
				  },
				  {
					"insightTitle": "Automation Engine Tickets Automata Analysis",
					"lastUpdatedTime": "",
					"maxMonth": ""
				  },
				  {
					"insightTitle": "Automation Summary Action Plans",
					"lastUpdatedTime": "",
					"maxMonth": ""
				  },
				  {
					"insightTitle": "Automation Transformation Metrics",
					"lastUpdatedTime": "",
					"maxMonth": ""
				  },
				  {
					"insightTitle": "Backup Analytics",
					"lastUpdatedTime": "",
					"maxMonth": ""
				  },
				  {
					"insightTitle": "Change Risk Analysis",
					"lastUpdatedTime": "",
					"maxMonth": ""
				  },
				  {
					"insightTitle": "Cloud Readiness",
					"lastUpdatedTime": "",
					"maxMonth": ""
				  },
				  {
					"insightTitle": "End of Life Server Analysis",
					"lastUpdatedTime": "",
					"maxMonth": ""
				  },
				  {
					"insightTitle": "Event Reduction Dashboard with Best Practices",
					"lastUpdatedTime": "",
					"maxMonth": ""
				  },
				  {
					"insightTitle": "Event Triage Analysis",
					"lastUpdatedTime": "",
					"maxMonth": ""
				  },
				  {
					"insightTitle": "Events Automation Opportunity",
					"lastUpdatedTime": "",
					"maxMonth": ""
				  },
				  {
					"insightTitle": "External Tickets Automata Analysis",
					"lastUpdatedTime": "",
					"maxMonth": ""
				  },
				  {
					"insightTitle": "IT Health Assessment",
					"lastUpdatedTime": "",
					"maxMonth": ""
				  },
				  {
					"insightTitle": "Incident Tickets Automation Opportunity",
					"lastUpdatedTime": "",
					"maxMonth": ""
				  },
				  {
					"insightTitle": "Inventory Analytics",
					"lastUpdatedTime": "",
					"maxMonth": ""
				  },
				  {
					"insightTitle": "Network Analytics",
					"lastUpdatedTime": "",
					"maxMonth": ""
				  },
				  {
					"insightTitle": "Non Actionable Ticket Analysis",
					"lastUpdatedTime": "",
					"maxMonth": ""
				  },
				  {
					"insightTitle": "Patch Advisory Dashboard",
					"lastUpdatedTime": "",
					"maxMonth": ""
				  },
				  {
					"insightTitle": "Process Behavior Analysis",
					"lastUpdatedTime": "",
					"maxMonth": ""
				  },
				  {
					"insightTitle": "Service Desk Ticket Analysis",
					"lastUpdatedTime": "",
					"maxMonth": ""
				  },
				  {
					"insightTitle": "Service Request Automation Opportunity",
					"lastUpdatedTime": "",
					"maxMonth": ""
				  }
				],
				"elasticUserAuth": true
			  }
			}
		  }
		]
	  },
	  {
		"groupId": 10,
		"leftNavigation": true,
		"parentId": 11,
		"groupOrder": 7,
		"groupShow": true,
		"cards": [
		  {
			"cardId": 15,
			"parentId": 11,
			"cardShow": true,
			"cardData": {
			  "title": "site.card.cssr.wppIncidentManagement.title",
			  "subtitle": "site.card.cssr.createdResolved.title",
			  "image": "assets/imgs/ServiceMgmt.svg",
			  "leftNavigation": true,
			  "leftNavigationUrl": "/client/operational-incident-report",
			  "leftNavigationOrder": 5,
			  "customizationLock": false,
			  "tooltip": {
				"enable": false,
				"text": "site.card.cssr.incidentManagement.tooltip"
			  },
			  "data": {
				"incident": [
				  {
					"created": [
					  {
						"dateTime": "Sep 21",
						"tickets": 5428
					  },
					  {
						"dateTime": "Oct 21",
						"tickets": 12322
					  },
					  {
						"dateTime": "Nov 21",
						"tickets": 4698
					  }
					]
				  },
				  {
					"resolved": [
					  {
						"dateTime": "Sep 21",
						"tickets": 5358
					  },
					  {
						"dateTime": "Oct 21",
						"tickets": 12195
					  },
					  {
						"dateTime": "Nov 21",
						"tickets": 4604
					  }
					]
				  }
				]
			  },
			  "titleSubText": ""
			}
		  }
		]
	  },
	  {
		"groupId": 5,
		"leftNavigation": false,
		"parentId": 5,
		"groupOrder": 8,
		"groupShow": true,
		"cards": [
		  {
			"cardId": 7,
			"parentId": 5,
			"cardShow": true,
			"cardData": {
			  "title": "site.card.cssr.problemManagement.title",
			  "subtitle": "site.card.cssr.problemManagement.openTicket",
			  "image": "assets/imgs/ServiceMgmt.svg",
			  "leftNavigation": true,
			  "leftNavigationUrl": "/client/problem-management",
			  "customizationLock": false,
			  "leftNavigationOrder": 6,
			  "tooltip": {
				"enable": false,
				"text": "site.card.cssr.incidentManagement.tooltip"
			  },
			  "data": {
				"problem": [
				  {
					"created": [
					  {
						"dateTime": "Sep 21",
						"tickets": 5
					  },
					  {
						"dateTime": "Oct 21",
						"tickets": 6
					  },
					  {
						"dateTime": "Nov 21",
						"tickets": 3
					  }
					]
				  },
				  {
					"resolved": [
					  {
						"dateTime": "Sep 21",
						"tickets": 0
					  },
					  {
						"dateTime": "Oct 21",
						"tickets": 0
					  },
					  {
						"dateTime": "Nov 21",
						"tickets": 0
					  }
					]
				  }
				]
			  },
			  "titleSubText": ""
			}
		  }
		]
	  },
	  {
		"groupId": 11,
		"leftNavigation": true,
		"parentId": 12,
		"groupOrder": 9,
		"groupShow": true,
		"cards": [
		  {
			"cardId": 16,
			"parentId": 12,
			"cardShow": true,
			"cardData": {
			  "title": "site.card.cssr.wppChangeManagement.title",
			  "subtitle": "site.card.cssr.createdImplemented.title",
			  "image": "assets/imgs/ServiceMgmt.svg",
			  "leftNavigation": true,
			  "leftNavigationUrl": "/client/operational-change-report",
			  "leftNavigationOrder": 7,
			  "customizationLock": false,
			  "tooltip": {
				"enable": false,
				"text": "site.card.cssr.incidentManagement.tooltip"
			  },
			  "data": {
				"change": [
				  {
					"created": [
					  {
						"dateTime": "Sep 21",
						"tickets": 259
					  },
					  {
						"dateTime": "Oct 21",
						"tickets": 238
					  },
					  {
						"dateTime": "Nov 21",
						"tickets": 199
					  }
					]
				  },
				  {
					"resolved": [
					  {
						"dateTime": "Sep 21",
						"tickets": 234
					  },
					  {
						"dateTime": "Oct 21",
						"tickets": 198
					  },
					  {
						"dateTime": "Nov 21",
						"tickets": 103
					  }
					]
				  }
				]
			  },
			  "titleSubText": ""
			}
		  }
		]
	  },
	  {
		"groupId": 12,
		"leftNavigation": true,
		"parentId": 13,
		"groupOrder": 10,
		"groupShow": true,
		"cards": [
		  {
			"cardId": 17,
			"parentId": 13,
			"cardShow": true,
			"cardData": {
			  "title": "site.card.cssr.wppPervasiveInsights.title",
			  "subtitle": "site.card.cssr.topFiveAffectedServersTrend.title",
			  "image": "assets/imgs/ServiceMgmt.svg",
			  "leftNavigation": true,
			  "leftNavigationUrl": "/client/operational-pervasive-insights",
			  "leftNavigationOrder": 4,
			  "customizationLock": false,
			  "tooltip": {
				"enable": false,
				"text": "site.card.cssr.incidentManagement.tooltip"
			  },
			  "data": {
				"pervasive": [
				  {
					"hostname": "conqt486rqg4r",
					"tickets": 219,
					"dateTime": "Last 30 days"
				  },
				  {
					"hostname": "conqt455gee4o",
					"tickets": 194,
					"dateTime": "Last 30 days"
				  },
				  {
					"hostname": "conqt489du4n",
					"tickets": 158,
					"dateTime": "Last 30 days"
				  },
				  {
					"hostname": "conqt467qqo4f",
					"tickets": 119,
					"dateTime": "Last 30 days"
				  },
				  {
					"hostname": "conqt453gee5n",
					"tickets": 118,
					"dateTime": "Last 30 days"
				  }
				]
			  },
			  "titleSubText": ""
			}
		  }
		]
	  },
	  {
		"groupId": 24,
		"leftNavigation": false,
		"parentId": 24,
		"groupOrder": 11,
		"groupShow": true,
		"cards": [
		  {
			"cardId": 24,
			"parentId": 24,
			"cardShow": true,
			"cardData": {
			  "title": "site.card.cssr.monitoring-and-visibility.title",
			  "titleSubText": "site.card.cssr.monitoring-and-visibility.titleSubText",
			  "subtitle": "",
			  "image": "",
			  "leftNavigation": true,
			  "leftNavigationUrl": "/client/monitoring-and-visibility",
			  "leftNavigationOrder": 2,
			  "customizationLock": false,
			  "pairedKeys": [],
			  "headers": [],
			  "params": [],
			  "tooltip": {
				"enable": false,
				"text": ""
			  },
			  "data": {
				"heading": "Aggregated Data Analysis",
				"monitoringAndVisibility": [
				  {
					"insightTitle": "Change",
					"lastUpdatedTime": "2021-11-25T03:40:00.476Z"
				  },
				  {
					"insightTitle": "Daily Sunrise",
					"lastUpdatedTime": "2021-11-25T00:00:00.000Z"
				  },
				  {
					"insightTitle": "Events",
					"lastUpdatedTime": "2021-11-25T01:01:40.244Z"
				  },
				  {
					"insightTitle": "Health",
					"lastUpdatedTime": "2021-11-25T11:23:59.335Z"
				  },
				  {
					"insightTitle": "Incident",
					"lastUpdatedTime": "2021-11-25T03:22:00.472Z"
				  },
				  {
					"insightTitle": "Inventory",
					"lastUpdatedTime": "2021-11-25T11:23:59.335Z"
				  },
				  {
					"insightTitle": "Problem",
					"lastUpdatedTime": "2021-11-23T03:50:01.067Z"
				  }
				],
				"elasticUserAuth": true
			  }
			}
		  }
		]
	  },
	  {
		"groupId": 25,
		"leftNavigation": false,
		"parentId": 25,
		"groupOrder": 12,
		"groupShow": true,
		"cards": [
		  {
			"cardId": 25,
			"parentId": 25,
			"cardShow": true,
			"cardData": {
			  "title": "site.card.cssr.aiops-admin-card.title",
			  "titleSubText": "site.card.cssr.aiops-admin-card.dataCenter",
			  "subtitle": "",
			  "image": "",
			  "leftNavigation": true,
			  "leftNavigationUrl": "/client/aiops-admin",
			  "leftNavigationOrder": 2,
			  "customizationLock": false,
			  "pairedKeys": [],
			  "headers": [],
			  "params": [],
			  "tooltip": {
				"enable": false,
				"text": ""
			  },
			  "data": {
				"adminCardData": [
				  {
					"insightTitle": "Bring Your Own Dashboards",
					"lastUpdatedTime": ""
				  },
				  {
					"insightTitle": "Client tool(s) mapping",
					"lastUpdatedTime": ""
				  },
				  {
					"insightTitle": "Resolver group - Inscope/ Out of scope",
					"lastUpdatedTime": ""
				  },
				  {
					"insightTitle": "Self Service",
					"lastUpdatedTime": ""
				  }
				],
				"elasticUserAuth": true,
				"heading": ""
			  }
			}
		  }
		]
	  },
	  {
		"groupId": 26,
		"leftNavigation": false,
		"parentId": 26,
		"groupOrder": 13,
		"groupShow": true,
		"cards": [
		  {
			"cardId": 26,
			"parentId": 26,
			"cardShow": true,
			"cardData": {
			  "title": "site.card.cssr.crossCard.title",
			  "titleSubText": "site.card.cssr.crossCard.datacenter.subtitle",
			  "subtitle": "",
			  "image": "",
			  "leftNavigation": true,
			  "leftNavigationUrl": "/client/cross-cards",
			  "leftNavigationOrder": 2,
			  "customizationLock": false,
			  "pairedKeys": [],
			  "headers": [],
			  "params": [],
			  "tooltip": {
				"enable": false,
				"text": ""
			  },
			  "data": {
				"heading": "",
				"crossCardData": [
				  {
					"insightTitle": "IT Health Assessment",
					"lastUpdatedTime": ""
				  }
				],
				"elasticUserAuth": true
			  }
			}
		  }
		]
	  },
	  {
		"groupId": 27,
		"leftNavigation": false,
		"parentId": 27,
		"groupOrder": 14,
		"groupShow": true,
		"cards": [
		  {
			"cardId": 27,
			"parentId": 27,
			"cardShow": true,
			"cardData": {
			  "title": "site.card.cssr.mainframeInsights.title",
			  "titleSubText": "site.card.cssr.mainframeInsights.datacenter.subtitle",
			  "subtitle": "",
			  "image": "",
			  "leftNavigation": true,
			  "leftNavigationUrl": "/client/mainframe-insights",
			  "leftNavigationOrder": 2,
			  "customizationLock": false,
			  "pairedKeys": [],
			  "headers": [],
			  "params": [],
			  "tooltip": {
				"enable": false,
				"text": ""
			  },
			  "data": {
				"mainframeInsights": []
			  }
			}
		  }
		]
	  }
	]
  }


  console.log(x.groups.length)