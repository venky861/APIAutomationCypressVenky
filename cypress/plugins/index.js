/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

const installLogsPrinter = require("cypress-terminal-report/src/installLogsPrinter");
const totalSpecs = require('../../cypress.json').specs;
// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars

module.exports = (on, config) => {
	
	config.env = process.env;
	let {url,username,apiKey,contentType,tenantId,esEnvironment,esUsername,esValidation,esPassword,esHostName,postToSlack,postSlackWebhookURL,specs,BUILD_URL} = config.env;

	if(url == null) config.env.url = "itoa0922-api"//"itoa0922-api"
    if(username == null) config.env.username = "613ee81b22c8d352c303b8fb"
    if(apiKey == null) config.env.apiKey = "80065136-ac27-59f1-b65c-5c1eaa29813e"
    if(contentType == null) config.env.contentType = "application/json"
    if(tenantId == null) config.env.tenantId = "613ecc8d1502627c4e509e3a"//"5f90166373c21b67d01f50f4"
    if(esEnvironment == null) config.env.esEnvironment = "" // stage-mcmp-elk-dal-elasticsearch-qa, dev2-fra-elk-elastic-qa
    if(esUsername == null) config.env.esUsername = "mcmpadmin" // mcmpadmin
    if(esPassword == null) config.env.esPassword = ""//
    if(esHostName == null) config.env.esHostName = "https://"+config.env.esUsername+":"+config.env.password+"@"+config.env.esEnvironment+".multicloud-ibm.com:9200"
    if(esValidation == null) config.env.esValidation = false;
    if(postToSlack == null) config.env.postToSlack = false;
    if(postSlackWebhookURL == null) config.env.postSlackWebhookURL = ""
    if(specs == null) config.env.specs = "health"//dashboard,health,platform,health
    if(BUILD_URL == null) config.env.BUILD_URL = "";
    config.env.tags = "" //Regression,Smoke,Integration
	config.ignoreTestFiles = []
	
	specs = (config.env.specs).split(',').map((spec)=>spec + '.spec.js').join(',')
	let specFiles = specs.split(',').map((spec)=>spec.trim()).map(spec=>`**/apitest/${spec}`)
	config.ignoreTestFiles = totalSpecs.filter(spec => !specFiles.includes(spec));
	config.env.url =`https://${config.env.url}.multicloud-ibm.com`

  installLogsPrinter(on, {
    outputRoot: config.projectRoot + "/logs/",
    outputTarget: {
      "out.txt": "txt",
      "out.json": "json",
    },
    printLogsToConsole: "always",
    printLogsToFile: "always",
    collectTestLogs: () => console.log("a"),
  });

  //index.js inside plugin folder

  const {
    beforeRunHook,
    afterRunHook,
  } = require("cypress-mochawesome-reporter/lib");
  const slack = require('../helpers/postToSlack');
  const spawn = require ('await-spawn');

  on("before:run", async (details) => {
	console.log("override before:run");
	await spawn('npm',['run','delete_reports_folder']);
  })

  on("after:run", async (details) => {
	console.log("override after:run");
	await spawn('npm',['run','merge-json']);
	await spawn('npm',['run','merge-xml']);
	await slack.postToSlack(config.env);
  })

return config;
};