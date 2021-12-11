
const fileData = require("./cypress/reports/output.json");
const fs = require('fs');

const { stats } = fileData;
const { tests: total , passes: passed , failures: failed , duration : duration} = stats;

//Print Pass/failed/total/duration details
console.log(`Total: ${total} , Passed: ${passed} , Failed: ${failed} , Duration(mins) : ${(duration/60000).toFixed(2)}`);

//Generate xml file with specified content
const template = `<?xml version="1.0" encoding="UTF-8" ?>
<testsuites disabled="0" errors="0" failures="${failed}" tests="${total}" time="${duration}"></testsuites>`

fs.writeFileSync('summary.xml', template);
