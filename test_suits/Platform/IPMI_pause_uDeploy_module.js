//智能平台管理页面
///////////zjw----------
var universe = require('../includes/universe.js');
var IPMI = require('../sources/ipmi_s_cfg.js');
var IPMI_server = mockData_global.IPMI_server;
var form_add_server_1 = IPMI_server.form_add_server_1;
var uninstall_module=IPMI_server.uninstall_module;

var caseName='IPMI_pause_Udeploy_module';

casper.test.begin('Platform management pause Udeploy module!', 10, function () {
    //打开主机地址
    casper.then(function () {
        universe.navigate_to_aLink_Path(caseName,'/server');
    });
    //停用Udeploy组件
    casper.then(function () {
        IPMI.pause_module(caseName, form_add_server_1.server_ip,uninstall_module.Udeploy,uninstall_module.Udeploy_data);
    });

    //启动测试案例
    casper.run(function () {
        this.test.done();
    });
})
