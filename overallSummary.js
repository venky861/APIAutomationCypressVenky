const report = require('./output.json');

console.log(`Feature-wise Summary:`);
report.results.forEach(result => {
    result.suites.forEach(suite => {
        const stats = {
            title: suite.title,
            passed: 0,
            failed: 0,
            duration: 0,
            total: suite.tests.length,
        };
        suite.tests.forEach(test => {
            if (test.state == 'passed') {
                stats.passed = stats.passed + 1;
            } else if (test.state == 'failed') {
                stats.failed = stats.failed + 1;
            }
            stats.duration = stats.duration + test.duration;
        });
        stats.duration = stats.duration / 60000;
        console.log(
            `${stats.title} - Passed: ${stats.passed} Failed: ${
                stats.failed
            } Duration: ${stats.duration.toFixed(2)} minutes`
        );
    });
});
