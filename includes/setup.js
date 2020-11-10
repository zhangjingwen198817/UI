var universe = require('../includes/universe.js');

//Resource listener, store recently 10 request data for concurrency, 10 maybe not suit
function onResourceRequested(requestData, request) {
    requestDataHist.push(requestData);
    if (requestDataHist.length > requestHistLen) {
        requestDataHist.shift();
    }
    //requestData.postData += '&test_id='+test_id++;
    casper.log(JSON.stringify(requestData), 'debug');
}

function setUp() {
    universe.casper = casper;

    isTest = casper.cli.has('isTest');
    casper.options.viewportSize = {width: 1440, height: 1024};
    casper.options.verbose = true;
    casper.options.waitTimeout = 70000;

    casper.options.pageSettings = {
        javascriptEnabled: true,
        loadImages: true,        // The WebPage instance used by Casper will
        loadPlugins: true         // use these settings
    };
    casper.clientScripts= [
        './jquery.js'      // This script will be injected in remote
    ];

    var mockData_file = file = casper.cli.get("mockData") ? file : "mockData_global.js";
    casper.test.comment("mockdata to use:" + mockData_file);
    var mf = require('../configs/' + mockData_file);
    mockData_global = mf.data;

    var ssh_Command_file = file = casper.cli.get('ssh') ? file : 'ssh_Command.js';
    casper.test.comment('ssh to use:' + ssh_Command_file);
    var sc = require('../configs/' + ssh_Command_file);
    ssh_Command = sc.cmdData;

    requestDataHist = [];
    requestHistLen = 10;
    test_id = 0;
    capture_counter = 0;
    // casper.on('resource.requested', onResourceRequested);

}

function tearDown() {
    casper.test.assert(true, 'Initialize environment finished !');

}

///-zjw
casper.test.begin('Initialize the test environment.........', 0, function () {
    casper.start().then(function () {
        setUp();
        tearDown();
        universe.login_succeed();
    }).run(function () {
        this.test.done();
    });
});
